import express, { Request, Response } from "express";
import { LikeModel } from "../models/like";
import { PostModel } from "../models/post";

export const LikePost = async (req: Request, res: Response) => {
  const { id, type } = req.params;
  const allowedTypes = ["posts", "comments", "nastedComments"];
  if (!allowedTypes.includes(type)) {
    res.status(400).json({ message: "Invalid type" });
  }
  try {
    const newLike = new LikeModel({
      user: req.user._id,
      [type]: id,
    });
    await newLike.save();
    await PostModel.findByIdAndUpdate(req.params.id, { $inc: { likeCount: 1 } });
    res.status(200).json({ newLike });
  } catch (error) {
    console.log('im in catch')
    res.status(500).json({ error });
  }
};

export const UnlikePost = async (req: Request, res: Response) => {
  const { id, type } = req.params;
  const allowedTypes = ["post", "comment", "nastedComment"];
  if (!allowedTypes.includes(type)) {
    res.status(400).json({ message: "Invalid type" });
  }
  try {
    await LikeModel.findOneAndDelete({
      user: req.user._id,
      [type]: id,
    });
    await PostModel.findByIdAndUpdate(req.params.postId, { $inc: { likeCount: -1 } });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
};


export const getNumberOfLikes = async (req:Request,res:Response)=>{
    try {
        const likeCount = await LikeModel.countDocuments({post : req.params.postId});
        res.json({count : likeCount});
    } catch (error) {
        res.status(500).json({message : error})
    }
}
