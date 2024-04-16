import express, { Request, Response } from "express";
import { ActivityModel } from "../models/activity";

export const createActivity = async (req: Request, res: Response) => {
  console.log("im here");
  try {
    const { eventType, functionId, user, pageUrl, submitTime } = req.body;

    let activityObj = {
      functionId,
      submitTime,
      eventType,
      user,
      pageUrl,
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
        const {userId} = req.params;
        const activities = await ActivityModel.find({user:userId});
        console.log({activities});
        return res.status(200).json({data:activities})
    } catch (error) {
        console.log("error ", error);
    return res.status(400).json({ message: "error in finding activities !!" });
    }
};

