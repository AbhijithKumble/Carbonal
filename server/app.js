import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import User from './models/User.model.js';


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
    res.json({ token });
    // Send the token in the response
    

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Improved Login Route
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

    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.0.100:${PORT}`);
});
