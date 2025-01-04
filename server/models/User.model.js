import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: true,
      default: "user",
    },
    image: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    footprint: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('UserInfo', userSchema);

export default User;

