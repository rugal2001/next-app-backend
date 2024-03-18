import express, { Request, Response } from "express";
import { CommentModel } from "../models/comment";

////////////GET ALL COMMENTS///////////
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await CommentModel.find({ post: postId }).populate(
      "user",
      "firstName lastName image"
    );
    return res.status(200).json({ data: comments });
  } catch (error) {
    return res.status(400).json({ message: "error in finding comments !!" });
  }
};
//////////////////_///////////////////

////////////CREATE COMMENT///////////
export const createComment = async (req: Request, res: Response) => {
  try {
    const { contenue, user, post } = req.body;
    const comment = new CommentModel({
      contenue,
      user,
      post,
    });

    await comment.save();
    return res
      .status(200)
      .json({ message: "comment inserted successffully", data: comment });
  } catch (error) {
    return res.status(400);
  }
};
//////////////////_///////////////////

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
