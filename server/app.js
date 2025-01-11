import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ip from './ip.js';
import populateQuotes from './utils/quote.util.js';

import authRoutes from './routes/auth.route.js';
import challengeRoutes from './routes/challenge.route.js';
import usageRoutes from './routes/usage.route.js';
import userRoutes from './routes/user.route.js';
import footprintRoutes from './routes/footprint.route.js';
import quoteRoutes from './routes/quotes.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // console.log('Connected to MongoDB!')
    await populateQuotes(); // Populate quotes during startup
    return;
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/challenges', challengeRoutes);
app.use('/', usageRoutes);
app.use('/', userRoutes);
app.use('/', footprintRoutes);
app.use('/', quoteRoutes);


// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.listen(PORT, '0.0.0.0', () => {
  // console.log(`Server running on ${ip}`);
});
