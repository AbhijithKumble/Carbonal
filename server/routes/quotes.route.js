import express from "express";
import Quote from "../models/Quotes.model.js";

const router = express.Router();

let cachedQuote = null;
let lastFetchedDay = null;

router.get('/quote', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  if (cachedQuote && lastFetchedDay === today) {
    return res.json({ text: cachedQuote });
  }

  try {
    const count = await Quote.countDocuments();
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const dailyIndex = dayOfYear % count;
    const dailyQuote = await Quote.findOne().skip(dailyIndex);

    cachedQuote = dailyQuote.quote;
    lastFetchedDay = today;

    res.json({ text: cachedQuote });
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    res.status(500).json({ message: 'Error fetching quote.' });
  }
});

export default router;
