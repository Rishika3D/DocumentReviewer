import express from 'express';
import multer from 'multer';
import * as pdfParse from "pdf-parse";
import mammoth from 'mammoth';
import fs from 'fs';

const router = express.Router();

// Set up Multer storage in a temporary uploads folder
const upload = multer({ dest: 'uploads/' });

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();
    let extractedText = '';

    if (fileExt === 'pdf') {
      // Extract text from PDF
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } 
    else if (fileExt === 'docx') {
      // Extract text from DOCX
      const docxData = await mammoth.extractRawText({ path: filePath });
      extractedText = docxData.value;
    } 
    else {
      fs.unlinkSync(filePath); // delete uploaded file
      return res.status(400).json({ error: 'Unsupported file format. Only PDF and DOCX are allowed.' });
    }

    // Delete uploaded file after processing to save space
    fs.unlinkSync(filePath);

    res.json({ text: extractedText.trim() });
  } catch (error) {
    console.error('File processing error:', error);
    res.status(500).json({ error: 'Failed to process file.' });
  }
});

export default router;
