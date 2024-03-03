import express, { request } from "express";
import { PostModel } from "../db/post";
import {User} from '../db/user'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const getAllPosts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const posts = await PostModel.find();
    return response.status(200).json({ data: posts });
  } catch (error) {
    return response.status(400);
  }
};

export const getPost = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const post = await PostModel.findById(id);
    return response.status(200).json({ data: post });
  } catch (error) {
    return response.status(400);
  }
};
////////////////////////////////////////////////////
export const createPost = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { name, contenue, image } = request.body;
    console.log("this is name ============> ",name)
    console.log("this is contenue ============> ",contenue)
    console.log("this is image ============> ",image)
    const post = new PostModel({
      name,
      contenue,
      image,
    });
    await post.save();
    return response.status(200).json({ message: "Post Created", data: post });
  } catch (error) {
    return response.status(400);
  }
};
/////////////////////////////////////////////////////////////////

export const uploadImg = (req: express.Request, res: express.Response) => {
  if (req.file) {
    console.log({ r: req.file });
    res.status(200).json( req.file.path );
  } else {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
};

////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
 export const register = async (req : express.Request, res : express.Response) => {
  const { firstname, lastname, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password,12);
  const user = await User.create({
    firstname,
    lastname,
    email,
    password : hashedPassword,
    role,
  });
  const token = jwt.sign(
    {user_id: user._id},
    process.env.JWT_SECRET,
    {
      expiresIn : "5h",
    }
  );
  res.status(200).json({
    status : 'success',
    token,
    user,
  })
}


/////////////////////////////////////////////////////////////////////////
// export const updatePost = async (
//   request: express.Request,
//   response: express.Response
// ) => {
//   console.log("im in update function");
//   try {
//     const { id } = request.params;
//     const { name, contenue } = request.body;

//     const result = await cloudinary.uploader.upload(request.file?.path);
//     const post = await PostModel.findById(id);
//     if (post) {
//       post.name = name;
//       post.contenue = contenue;
//       post.image = result.secure_url;
//       console.log("this is result.secure_url", result.secure_url);
//       await post.save();
//     }

//     return response.status(200).json({ message: "Post Updated", data: post });
//   } catch (error) {
//     return response.status(400);
//   }
// };

export const deletePost = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    await PostModel.findByIdAndDelete({ _id: id });
    return response.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return response.status(400);
  }
};
