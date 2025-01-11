import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the UserChallenge schema
const userChallengeSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
    completed: { type: Boolean, default: false }, // Indicates if the challenge is completed
    date: { type: String, required: true }, // Add the date field (e.g., '2025-01-10')
  },
  { timestamps: true }
);

// Create the UserChallenge model
const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

export default UserChallenge;

