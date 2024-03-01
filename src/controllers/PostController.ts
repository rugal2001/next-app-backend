import express, { request } from "express";
import { PostModel } from "../db/post";
// import { upload } from "../middleware/multer";
//import uploadToCloudinary from "../utils/cloudinary";

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
    const { name, contenue } = request.body;
    const post = new PostModel({
      name,
      contenue,
    });
    await post.save();
    return response.status(200).json({ message: "Post Created", data: post });
  } catch (error) {
    return response.status(400);
  }
};

////////////////////////////////////////////////////////////////////////////

// export const uploadImage = async (
//   request: express.Request,
//   response: express.Response
// ) => {
//   try {
//     if (!request.file) {
//       return response.status(400).json({ message: "error to upload image" });
//     }
//     const imageURL = await uploadToCloudinary(request.file);
//     response.status(200).json({ imageURL });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     response.status(500).json({ message: "Internal server error" });
//   }
// };

////////////////////////////////////////////////////////////////////////////
// export const addPost = async (
//   request: express.Request,
//   response: express.Response
// ) => {
//   try {
//     const { name, contenue } = request.body;
//     console.log("this is name ==========> ", name);
//     console.log("this is contenue ==========> ", contenue);
//     const result = await cloudinary.v2.uploader.upload(request.file?.path);

//     console.log("error here");
//     console.log("this is result ", result);
//     const post = new PostModel({
//       name: name,
//       contenue: contenue,
//       image: result.secure_url,
//     });
//     console.log("this is the secure url : ", result.secure_url);
//     await post.save();
//     response
//       .status(201)
//       .json({ message: "Post created successfully", post: post });
//   } catch (error) {
//     console.log(error);
//     response.status(400).json({
//       message: "failed to upload the post uuuuuuuuuuuuuuuuuuuuuuuu!!",
//     });
//   }
// };

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
