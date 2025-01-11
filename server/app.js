import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ip from './ip.js';

import authRoutes from './routes/auth.route.js';
import challengeRoutes from './routes/challenge.route.js';
import usageRoutes from './routes/usage.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/challenges', challengeRoutes);
app.use('/usage', usageRoutes);
app.use('/user', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${ip}`);
});

