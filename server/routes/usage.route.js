import express from 'express';
import Usages from '../models/Usages.model.js';

const router = express.Router();

// Update usage data
router.put('/usage/:userId', async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const updatedUsage = await Usages.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    if (!updatedUsage) {
      return res.status(404).json({ error: 'No usage record found.' });
    }

    res.status(200).json({ data: updatedUsage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get usage data
router.get('/usage/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const usage = await Usages.findOne({ userId });
    if (!usage) {
      return res.status(404).json({ error: 'No usage data found.' });
    }
    res.status(200).json(usage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

