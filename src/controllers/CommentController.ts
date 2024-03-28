import express, { Request, Response } from "express";
import { CommentModel } from "../models/comment";
import { populate } from "dotenv";
import mongoose from "mongoose";

////////////GET ALL COMMENTS///////////
// Recursive function to populate nested replies

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await CommentModel.find({ post: postId })
      .populate({
        path: "user",
        select: "firstName lastName image",
      });

    return res.status(200).json({ data: comments });
  } catch (error) {
    console.log("error ", error);
    return res.status(400).json({ message: "error in finding comments !!" });
  }
};

//////////////////_///////////////////

////////////CREATE COMMENT///////////
export const createComment = async (req: Request, res: Response) => {
  try {
    const { post } = req.body;
    const { contenue } = req.body;
    let commentObj = {
      user: req.body.user,
      post,
      contenue: contenue,
    };

    const commentReply = await new CommentModel(commentObj).save();
    return res
      .status(200)
      .json({ message: "comment inserted successffully", data: commentReply });
  } catch (error) {
    return res.status(400);
  }
};
//////////////////_///////////////////

export const createNastedComment = async (req: Request, res: Response) => {
  try {
    const { commentId, postId } = req.params;
    const replyText = req.body.contenue;
    const replyObj = {
      user: req.body.user,
      post: postId,
      contenue: replyText,
      parentComment: commentId,
    };
    const newReply = await new CommentModel(replyObj).save();
    await CommentModel.findOneAndUpdate(
      { _id: commentId, post: postId },
      { $push: { replies: newReply._id } }
    );
    return res
      .status(200)
      .json({ message: "comment inserted successffully", data: newReply });
  } catch (error) {}
};

////////////UPDATE COMMENT///////////
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { contenue } = req.body;
    const comment = await CommentModel.findById(id);
    if (comment) {
      (comment.contenue = contenue), await comment.save();
    }

    return res
      .status(200)
      .json({ message: "comment updated successffully", data: comment });
  } catch (error) {
    return res.status(400);
  }
};
//////////////////_///////////////////

////////////DELETE COMMENT///////////
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await CommentModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error in deleting the comment" });
  }
};
//////////////////_///////////////////
