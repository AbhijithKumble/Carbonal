import mongoose from "mongoose";

// Define the challenge schema
const Schema = mongoose.Schema;

// Define the Challenge schema
const challengeSchema = new Schema(
  {
    description: { type: String, required: true },
    type: { type: String, required: true }, // 'daily', 'weekly', etc.
  },
  { timestamps: true }
);

// Create the Challenge model
const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;

