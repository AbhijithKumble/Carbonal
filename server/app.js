import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ip from './ip.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import User from './models/User.model.js';

import Usages from './models/Usages.model.js'; // Adjust the path to the Usages model file

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use(cors());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(mongoUri, clientOptions)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Improved Signup Route

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password. User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password. Password mismatch.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key', // Fallback for debugging
      { expiresIn: '1h' }
    );

    res.json({ userId: user._id, token });
  } catch (error) {
    console.error('Signin error:', error); // Log error details
    res.status(500).json({ message: 'Internal Server Error.', error: error.message });
  }
});



app.post('/signin', async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Set this in your environment variables
      { expiresIn: '1h' }
    );
    
    res.json({
      userId: user._id, // Send userId
      token: token,      // Send JWT token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error });
  }
});

// Middleware: Verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required.' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};  

app.post('/footprint', async (req, res) => {
  const { email, image, score, datejoined, name, footprint } = req.body;
  try {
    await User.updateOne(
      { email: email },
      { $set: { footprint } }
    );
    res.send({ status: 'ok', data: 'Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', data: 'Internal Server Error' });
  }
});

app.post('/update-user',async(req,res)=>{
  const {email,image,score,datejoined,name,footprint}=req.body;
  try {
    await User.updateOne(
      {email:email},
      {
        $set:{
          image,
          score,
          datejoined,
          name,
          footprint,
        }
      }
    );
    res.send({ status: 'ok', data: 'Updated' });

  } catch (error) {
    console.log(error)
  }
})
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await User.find().sort({ footprint:-1 }); // Ensure 'Leaderboard' is correctly defined
    res.json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Route: Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is a protected route.` });
});

app.put('/usage/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the URL
    const { electricityUnits, fossilFuelCost,meatFishKg,petrolLitres,dieselLitres,phones,laptopsDesktops,otherGadgets } = req.body; // Get data from the request body

    // if (!electricityUnits && !fossilFuelCost&&!meatFishKg&&!petrolLitres&&!dieselLitres) {
    //   return res.status(400).json({ error: 'At least one field must be provided for update.' });
    // }

    // Prepare the update object dynamically
    const updateData = {};
    if (electricityUnits) updateData.electricityUnits = electricityUnits;
    if (fossilFuelCost) updateData.fossilFuelCost = fossilFuelCost;
    if(meatFishKg) updateData.meatFishKg = meatFishKg;
    if(petrolLitres) updateData.petrolLitres=petrolLitres;
    if(dieselLitres) updateData.dieselLitres=dieselLitres;
    if(phones) updateData.phones=phones;
    if(laptopsDesktops) updateData.laptopsDesktops=laptopsDesktops;
    if(otherGadgets) updateData.otherGadgets=otherGadgets;
    
    // Update the Usages document in the database
    const updatedUsage = await Usages.findOneAndUpdate(
      { userId }, // Filter by userId
      { $set: updateData }, // Update fields
      { new: true, upsert: true } // Return updated document, create new if not found
    );

    if (!updatedUsage) {
      return res.status(404).json({ error: 'No usage record found for the given userId.' });
    }

    res.status(200).json({ message: 'Usage data updated successfully', data: updatedUsage });
  } catch (error) {
    console.error('Error updating usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/usage/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const usage = await Usages.findOne({ userId });

    if (!usage) {
      return res.status(404).json({ error: 'No usage data found for the given userId.' });
    }

    res.status(200).json(usage);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${ip}`);
});
