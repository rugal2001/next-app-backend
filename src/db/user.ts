import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    Required: true,
  },
  lastname: {
    type: String,
    Required: true,
  },
  email: {
    type: String,
    Required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    Required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},{timestamps : true});


export const User = mongoose.model('User',userSchema);
module.exports = User;
