import mongoose from 'mongoose';

// Challenge Schema
const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  points: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false }, 
  completionDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true }, 
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;
