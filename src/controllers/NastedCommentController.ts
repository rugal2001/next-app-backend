import express, { Request, Response } from "express";
import { NastedCommentModel } from "../models/nastedComment";

export const insertNastedComment = async (req: Request, res: Response) => {
  try {
    const {
      distinataire_firstName,
      distinataire_lastName,
      contenue,
      user,
      comment,
    } = req.body;
    const nastedComment = new NastedCommentModel({
      distinataire_firstName,
      distinataire_lastName,
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
    const { commentsId } = req.params;
    const nastedComments = await NastedCommentModel.find({comment:commentsId}).populate(
      "user",
      "firstName lastName image"
    );

    return res.status(200).json({ data: nastedComments });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

//////////////////////////////////////////////

export const updateNastedComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { contenue } = req.body;
    const nastedComment = await NastedCommentModel.findById(id);
    if (nastedComment) {
      nastedComment.contenue = contenue;
      await nastedComment.save();
    }
    return res
      .status(200)
      .json({ message: "comment updated successffully", data: nastedComment });
  } catch (error) {
    return res.status(400);
  }
};
///////////////////////////////////////////////////

export const deleteNastedComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await NastedCommentModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error in deleting the comment", error: error });
  }
};
