import mongoose from 'mongoose';

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: String, unique: true }, // e.g., '2025-01-10'
  challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
});

const DailyChallenge = mongoose.model('DailyChallenge', dailyChallengeSchema);
export default DailyChallenge;

