import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ip from './ip.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Quote from './models/Quotes.model.js'; // Import Quotes model

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

const populateQuotes = async () => {
  const quotes = [
    { "quote": "We cannot solve our problems with the same thinking we used when we created them." },
    { "quote": "Saving our planet, lifting people out of poverty, advancing economic growth... these are one and the same fight." },
    { "quote": "The future of humanity and indeed all life on Earth depends on us." },
    { "quote": "What you do makes a difference, and you have to decide what kind of difference you want to make." },
    { "quote": "Mother Nature has been abused, the powers have been abused, this is the abuse. And we all stand accountable." },
    { "quote": "We are the first generation to feel the effect of climate change and the last generation who can do something about it." },
    { "quote": "The best way to predict the future is to invent it." },
    { "quote": "You are never too small to make a difference." },
    { "quote": "In nature, nothing exists alone." },
    { "quote": "Destroying rainforest for economic gain is like burning a Renaissance painting to cook a meal." },
    { "quote": "We do not inherit the Earth from our ancestors, we borrow it from our children." },
    { "quote": "Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it's the only thing that ever has." },
    { "quote": "Climate change is real. It is happening right now. It is the most urgent threat facing our entire species." },
    { "quote": "The creation of a thousand forests is in one acorn." },
    { "quote": "What is the use of a house if you haven't got a tolerable planet to put it on?" },
    { "quote": "The Earth, our home, is beginning to look more and more like an immense pile of filth." },
    { "quote": "The climate crisis is not a political issue; it is a moral and spiritual challenge to all of humanity." },
    { "quote": "Sustainability is the motherlode of innovation." },
    { "quote": "Water and air, the two essential fluids on which all life depends, have become global garbage cans." },
    { "quote": "Alone we can do so little; together we can do so much." }
  ];

  try {
    const count = await Quote.countDocuments();
    if (count === 0) {
      console.log('Populating database with quotes...');
      await Quote.insertMany(quotes);
      console.log('Database population complete.');
    } else {
      console.log('Database already populated.');
    }
  } catch (error) {
    console.error('Error populating quotes:', error);
  }
};

// Connect to MongoDB and populate quotes if needed
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB!');
    await populateQuotes(); // Populate quotes during startup
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Improved Signup Route

app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      dateJoined: new Date(), // Set dateJoined as the current date
    });

    // Save the new user
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email }, 
      'your_jwt_secret_key', // Replace with a secret key
      { expiresIn: '1h' } // Token expiration time
    );
    

    res.json({
      token: token, 
      userId: newUser._id, // Send userId
          // Send JWT token
    });
    // Send the token in the response
    

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Improved Login Route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ 
      token, 
      userId: user._id // Include the userId in the response
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
    const leaderboardData = await User.find().sort({ footprint:-1 }); 
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
    const { userId } = req.params;
    const { 
      electricityUnits, fossilFuelCost, meatFishKg, 
      petrolLitres, dieselLitres, phones, laptopsDesktops, 
      otherGadgets, footprint 
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
        { new: true ,upsert: true }
      );
      return res.status(200).json({ message: 'Usage data updated successfully', data: updatedUsage });
    } else {
      // Insert new document
    
      const newUsage = new Usages({
        userId:userId,
        currentYear:currentYear,
        currentMonth:currentMonth,
        electricityUnits,
        fossilFuelCost,
        meatFishKg,
        petrolLitres,
        dieselLitres,
        phones,
        laptopsDesktops,
        otherGadgets,
        footprint,
        
      }  
      
      );
      console.log(newUsage);
      const savedUsage = await newUsage.save(); // Save the new document
      return res.status(200).json({ message: 'Usage data inserted successfully', data: savedUsage });
    }
  } catch (error) {
    console.error('Error updating usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.get('/usage/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const usageData = await Usages.find({ userId: userId }).sort({ currentYear: -1, currentMonth: -1 });
    res.json(usageData);
    if (!usageData) {
      return res.status(404).json({ error: 'No usage data found for the given userId.' });
    }

    res.status(200).json(usageData);
  } catch (error) {
    console.error('Error fetching usage data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
let cachedQuote = null;
let lastFetchedDay = null;

app.get('/quote', async (req, res) => {
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



app.listen(PORT, () => {
  console.log(`Server running on ${ip}`);
});
