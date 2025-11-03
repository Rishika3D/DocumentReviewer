import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const HF_TOKEN = process.env.HF_TOKEN

if (!HF_TOKEN) {
  console.error("❌ Missing HF_TOKEN in .env file")
  process.exit(1)
}

export async function queryModel(modelUrl, input, params = {}) {
  try {
    const response = await axios.post(
      modelUrl,
      {
        inputs: input,
        parameters: params
      },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (err) {
    console.error("🔥 HF Error:", err.response?.data || err.message)
    throw new Error(err.response?.data?.error || "Inference failed")
  }
}
