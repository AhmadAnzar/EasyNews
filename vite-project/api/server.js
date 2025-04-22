import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Allow only your front‑end origin or * for testing:
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))

app.get('/news', async (req, res) => {
  try {
    const { country = 'us', category = 'general', q = '' } = req.query
    let url = `https://newsapi.org/v2/top-headlines?country=${country}`
    if (category) url += `&category=${category}`
    if (q)        url += `&q=${encodeURIComponent(q)}`
    url += `&apiKey=${process.env.NEWS_API_KEY}`

    const apiRes = await fetch(url)
    const data   = await apiRes.json()
    res.json(data)
  } catch (err) {
    console.error('News proxy error:', err)
    res.status(500).json({ error: 'Failed to fetch news' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🥞 News proxy listening on http://localhost:${PORT}`)
})
