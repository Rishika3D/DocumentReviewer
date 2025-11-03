import express from 'express'
import { queryModel } from '../services/huggingFaceServices.js'
import { buildRewritePrompt } from '../utils/promptBuilder.js'

const router = express.Router()

// UPDATED: The base URL has been changed to match the error message
const MODELS = {
  SUMMARISE: 'https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn',
  GRAMMAR: 'https://router.huggingface.co/hf-inference/models/hassaanik/grammar-correction-model',
  REWRITE: 'https://router.huggingface.co/hf-inference/models/tuner007/pegasus_paraphrase'
}

// ✅ Summarization
router.post('/summarise', async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'Text is required.' })

  try {
    const response = await queryModel(MODELS.SUMMARISE, text)
    res.json({ summary: response[0]?.summary_text || 'No summary returned.' })
  } catch (err) {
    res.status(500).json({ error: 'Summarisation failed.', details: err.message })
  }
})

// ✅ English Grammar Correction
router.post('/grammar', async (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'Text is required.' })

  try {
    const response = await queryModel(MODELS.GRAMMAR, text)
    res.json({ correctedText: response[0]?.generated_text || 'No corrections made.' })
  } catch (err) {
    res.status(500).json({ error: 'Grammar correction failed.', details: err.message })
  }
})

// ✅ Rewrite / Paraphrase
router.post('/rewrite', async (req, res) => {
  const { text, target } = req.body
  if (!text?.trim() || !target?.trim()) {
    return res.status(400).json({ error: 'Text and target are required.' })
  }

  const prompt = buildRewritePrompt(target, text)

  try {
    const response = await queryModel(MODELS.REWRITE, prompt, {
      temperature: 0.7,
      top_p: 0.9,
      max_new_tokens: 250,
      return_full_text: false
    })
    res.json({ rewritten: response[0]?.generated_text?.trim() || 'No rewrite returned.' })
  } catch (err) {
    // This 'err.message' is what you saw in your console
    res.status(500).json({ error: 'Rewriting failed.', details: err.message })
  }
})

// ✅ Analyze Endpoint
router.post('/analyze', (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'Text is required.' })

  const wordCount = text.trim().split(/\s+/).length
  const letterCount = text.replace(/\s+/g, '').length
  res.json({ wordCount, letterCount })
})

export default router