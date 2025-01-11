import express from 'express';
import Usages from '../models/Usages.model.js';

const router = express.Router();

router.put('/usage/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      electricityUnits,
      fossilFuelCost,
      meatFishKg,
      petrolLitres,
      dieselLitres,
      phones,
      laptopsDesktops,
      otherGadgets,
      footprint
    } = req.body;

    // If footprint is not provided, it will default to 0 as per the schema
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const updateData = {
      electricityUnits,
      fossilFuelCost,
      meatFishKg,
      petrolLitres,
      dieselLitres,
      phones,
      laptopsDesktops,
      otherGadgets,
      footprint,
    };

    const existingUsage = await Usages.findOne({
      userId,
      currentYear,
      currentMonth
    });

    if (existingUsage) {
      // Update existing document
      const updatedUsage = await Usages.findOneAndUpdate(
        { userId, currentYear, currentMonth },
        { $set: updateData },
        { new: true, upsert: true }
      );
      return res.status(200).json(
        {
          message: 'Usage data updated successfully',
          data: updatedUsage
        }
      );
    } else {
      // Insert new document
      const newUsage = new Usages({
        userId: userId,
        currentYear: currentYear,
        currentMonth: currentMonth,
        electricityUnits,
        fossilFuelCost,
        meatFishKg,
        petrolLitres,
        dieselLitres,
        phones,
        laptopsDesktops,
        otherGadgets,
        footprint,
      });
      const savedUsage = await newUsage.save(); // Save the new document
      return res.status(200).json({
        message: 'Usage data inserted successfully',
        data: savedUsage
      });
    }
  } catch (error) {
    console.error('Error updating usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/usage/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const usageData = await Usages.find({ userId: userId }).sort({ currentYear: 1, currentMonth: 1 });
    if (!usageData) {
      return res.status(404).json({ error: 'No usage data found for the given userId.' });
    }

    res.status(200).json(usageData);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

