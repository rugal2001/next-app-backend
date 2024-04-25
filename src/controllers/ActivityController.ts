import express, { Request, Response } from "express";
import { ActivityModel } from "../models/activity";

export const createActivity = async (req: Request, res: Response) => {
  console.log("im here");
  try {
    const { eventType, user ,oldData,post,comment} = req.body;

    let activityObj = {
      eventType: eventType,
      user,
      oldData,
      post,
      comment
    };
    console.log({ eventType, user,oldData,post,comment });
    const activity = await new ActivityModel(activityObj).save();
    console.log({ activity });
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
    const activities = await ActivityModel.find({ post: postId })
      .populate({
        path: "user",
        select: "firstName lastName image",
      })
      .populate({
        path: "comment",
        select: "contenue",
      })
      .populate({
        path: "post",
        select: "contenue",
      });

    // console.log((date)-(activities.submitTime))
    return res.status(200).json({ data: activities.reverse() });
  } catch (error) {
    console.log("error ", error);
    return res.status(400).json({ message: "error in finding activities !!" });
  }
};
