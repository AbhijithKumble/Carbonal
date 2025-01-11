import express from 'express';
import { authenticateToken } from '../routes/auth.route.js';
import Challenge from '../models/Challenge.model.js';
import UserChallenge from '../models/UserChallenge.model.js';
import DailyChallenge from '../models/DailyChallenge.model.js';
import { getTodayDate } from '../utils/dateutil.js';

const router = express.Router();

// Route to add challenges (No admin auth required)
router.post('/addchallenges', async (req, res) => {
  console.log(req.body)
  try {
    const { description, type } = req.body; // Only description and type are required

    // Validate challenge type
    if (type !== 'daily' && type !== 'weekly') {
      return res.status(400).json({ error: 'Invalid challenge type. It should be either daily or weekly.' });
    }

    // Create new challenge
    const newChallenge = new Challenge({
      description,
      type,
      completed: false, // Challenges are not completed when added
      createdAt: new Date(),
    });

    await newChallenge.save();
    res.status(201).json({ message: 'Challenge added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Get today's challenge for the user
router.get('/today', authenticateToken, async (req, res) => {
  try {
    const { date } = req.query; // Get the date from query params
    const userId = req.user.userId; // Get the user ID from the authenticated token
    const today = date ? date.split('T')[0] : getTodayDate(); // Use the given date or fallback to today's date

    // Check if a DailyChallenge exists for the specific date
    let dailyChallenge = await DailyChallenge.findOne({ date: today });

    // If no DailyChallenge exists for today, create one
    if (!dailyChallenge) {
      const randomDailyChallenge = await Challenge.aggregate([
        { $match: { type: 'daily' } }, // Filter challenges by type
        { $sample: { size: 1 } }, // Get a random daily challenge
      ]);

      if (randomDailyChallenge.length > 0) {
        const challengeId = randomDailyChallenge[0]._id;

        // Save the new DailyChallenge for today
        dailyChallenge = new DailyChallenge({
          date: today,
          challenges: [challengeId], // Save the random challenge ID
        });

        await dailyChallenge.save();
      } else {
        return res.status(404).json({ error: 'No daily challenges available' });
      }
    }

    // Check if the user has already been assigned today's challenge
    let userChallenge = await UserChallenge.findOne({
      userId,
      challengeId: dailyChallenge.challenges[0],
      date: today,
    });

    // If no assignment exists, create one
    if (!userChallenge) {
      userChallenge = new UserChallenge({
        userId,
        challengeId: dailyChallenge.challenges[0], // Assign the challenge ID from DailyChallenge
        date: today,
        completed: false, // Mark as not completed
      });

      await userChallenge.save();
    }

    // Fetch the challenge details
    const challenge = await Challenge.findById(dailyChallenge.challenges[0]);

    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Return the challenge details, including its completion status
    res.status(200).json({
      challenge: {
        challengeId: challenge.id,
        description: challenge.description,
        type: challenge.type,
        completed: userChallenge.completed, // Include completion status
        // Include additional challenge fields here if needed
      },
    });
  } catch (error) {
    console.error('Error fetching today\'s challenge:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/complete", authenticateToken, async (req, res) => {
  try {
    const { date } = req.query; // Date from the query parameter
    const { challengeId } = req.body; // Challenge ID from the request body
    const userId = req.user.userId;
    // Find the UserChallenge for the specific user, challenge, and date
    const userChallenge = await UserChallenge.findOne({
      userId: userId,
      challengeId: challengeId,
      date: date.split('T')[0],
    });
    //console.log(userId,challengeId,date)
    //const today = date.split('T')[0]
    console.log(userId, challengeId, date.split('T')[0]);
    console.log(userChallenge); 

    if (!userChallenge) {
      return res.status(404).json({ message: "UserChallenge not found" });
    }
    
    // Mark the UserChallenge as complete
    userChallenge.completed = true;
    await userChallenge.save();

    return res.status(200).json({
      message: "Challenge marked as complete",
      userChallenge,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

