import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image:{type: String},
  score:{type: Number},
  datejoined:{type: String},
  name:{type:String},
  footprint:{type:Number},
  
  dateJoined: { type: Date, required: true ,default: Date.now },
  
});

const User = mongoose.model('UserInfo', userSchema);

export default User;

