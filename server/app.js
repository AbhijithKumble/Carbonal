import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import User from './models/User.model.js';

import User from './models/User.model.js';

dotenv.config();

const app = express();
const PORT = 3001;

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
  const { email, password } = req.body;

  console.log('Request received:', req.body);

  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const oldUser = await User.findOne({ email });
    console.log('Existing user check:', oldUser);

    if (oldUser) {
      return res.send({ data: 'User already present' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const newUser = await User.create({ email, password: hashedPassword });
    console.log('New user created:', newUser);

    res.send({ status: 'ok', data: 'User created' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Error registering user.', error });
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

// Route: Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is a protected route.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://192.168.0.104:${PORT}`);
});
