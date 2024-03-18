import express, { request } from "express";
import { PostModel } from "../models/post";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

////////////////////////////////////////////////////

export const getAllMyPosts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { userId } = request.params;
    const posts = await PostModel.find({ user: userId }).populate(
      "user",
      "firstName lastName image"
    );
    return response.status(200).json({ data: posts });
  } catch (error) {
    return response.status(400);
  }
};

//////////////////////////////////////////////////////
export const getAllPosts = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    
    const posts = await PostModel.find().populate(
      "user",
      "firstName lastName image"
    );
    return response.status(200).json({ data: posts });
  } catch (error) {
    return response.status(400);
  }
};
////////////////////////////////////////////////////////

export const getPost = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const post = await PostModel.findById(id).populate(
      "user",
      "firstName lastName image"
    );
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
    const { name, contenue, image, user } = request.body;
    const post = new PostModel({
      name,
      contenue,
      image,
      user,
    });
    await post.save();
    return response.status(200).json({ message: "Post Created", data: post });
  } catch (error) {
    return response.status(400);
  }
};

/////////////////////////////////////////////////////////////////////////
export const updatePost = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const { contenue } = request.body;

    const post = await PostModel.findById(id);
    if (post) {
      post.contenue = contenue;
      await post.save();
    }

    return response.status(200).json({ message: "Post Updated", data: post });
  } catch (error) {
    return response.status(400);
  }
};
/////////////////////////////////////////////////////////////////////////////
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
