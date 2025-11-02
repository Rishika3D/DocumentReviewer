import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const HF_TOKEN = process.env.HF_TOKEN

const HF_HEADERS = {
  Authorization: `Bearer ${HF_TOKEN}`,
  'Content-Type': 'application/json'
}

export async function queryModel(modelUrl, inputs, parameters = {}) {
  try {
    const response = await axios.post(
      modelUrl,
      { inputs, parameters },
      { headers: HF_HEADERS }
    )
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message)
  }
}
