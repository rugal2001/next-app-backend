import express, { Request, Response } from "express";
import { NastedCommentModel } from "../models/nastedComment";

export const insertNastedComment = async (req: Request, res: Response) => {
  try {
    const { contenue, user, comment } = req.body;
    const nastedComment = new NastedCommentModel({
      contenue,
      user,
      comment,
    });
    await nastedComment.save();
    return res
      .status(200)
      .json({ message: "nasted comment saved successfully" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const getAllNastedComment = async (req: Request, res: Response) => {
  try {
    console.log("after try before find");
    const nastedComments = await NastedCommentModel.find().populate(
      "user",
      "firstName lastName image"
    );
    console.log("nastedComments", nastedComments);
    return res.status(200).json({ data: nastedComments });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
