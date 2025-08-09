import express from 'express'
import { queryModel } from '../services/huggingFaceService.js'
import { buildRewritePrompt } from '../utils/promptBuilder.js'

const router = express.Router()

const MODELS = {
  SUMMARISE: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
  GRAMMAR: 'https://api-inference.huggingface.co/models/oliverguhr/german-grammar-check',
  REWRITE: 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1'
}

// 🔹 1. Summarise
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

// 🔹 2. Grammar Correction
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

// 🔹 3. Rewrite
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
    res.status(500).json({ error: 'Rewriting failed.', details: err.message })
  }
})

// 🔹 4. Analyze Text
router.post('/analyze', (req, res) => {
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ error: 'Text is required.' })

  const wordCount = text.trim().split(/\s+/).length
  const letterCount = text.replace(/\s+/g, '').length
  res.json({ wordCount, letterCount })
})

export default router
