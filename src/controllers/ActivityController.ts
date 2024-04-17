import express, { Request, Response } from "express";
import { ActivityModel } from "../models/activity";

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { eventType, post, user, submitTime } = req.body;

    let activityObj = {
      post,
      submitTime,
      eventType,
      user,
    };
    const activity = await new ActivityModel(activityObj).save();

    return res
      .status(200)
      .json({ message: "Activity saved successffully", data: activity });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const activities = await ActivityModel.find({ post: postId }).populate({
      path: "user",
      select: "firstName lastName image",
    });
    console.log({ activities });
    return res.status(200).json({ data: activities });
  } catch (error) {
    console.log("error ", error);
    return res.status(400).json({ message: "error in finding activities !!" });
  }
};
