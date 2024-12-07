import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String, 
  password: String, 
  created_at: String,
  updated_at: String,

}); 
