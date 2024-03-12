import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    Required: true,
  },
  lastName: {
    type: String,
    Required: true,
  },
  email: {
    type: String,
    ref:'user',
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
  },
  image:{
    type: String,
    require:true,
  }
},{timestamps : true});

export const UserModel = mongoose.model('user',userSchema);

//export const PostModel = mongoose.model('post' , PostSchema);