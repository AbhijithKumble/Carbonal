import express from 'express';
import User from '../models/User.model.js';

const router = express.Router();

// Update user data
router.post('/update-user', async (req, res) => {
  const { email, image, score, datejoined, name, footprint } = req.body;
  try {
    await User.updateOne({ email }, { $set: { image, score, datejoined, name, footprint } });
    res.send({ status: 'ok', data: 'Updated' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await User.find().sort({ footprint: -1 });
    res.json(leaderboardData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

