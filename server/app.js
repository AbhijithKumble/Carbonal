import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const getUri = () => {
  let mongoUri = "";
  try {
    mongoUri = process.env.MONGODB_URI; 
    if (mongoUri == "" || mongoUri == undefined) {
      throw Error("env is empty");
    }
    return mongoUri;
  } catch (error) {
    throw error;
  }
};

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
  let uri = "";
  try {
    uri = getUri();
  } catch (error) {
    console.log(error);
    throw Error("Unable to get the env of mongo");
  }

  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
    throw Error("Unable to connect to the database", error);
  }
};

connectDB();

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Route: Register a new user
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error });
  }
});

// Route: Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' }); // Generate JWT
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

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};

// Route: Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! This is a protected route.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

