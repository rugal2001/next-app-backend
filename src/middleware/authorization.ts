import express, { Request, Response, NextFunction } from "express";
import { PostModel } from "../models/post";
import { UserModel } from "src/models/user";
const jwt = require("jsonwebtoken");

export const EditPostAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.decode(token);
    console.log("decodedToken => ", decodedToken.id);
    if (
      post?.user.toString() === decodedToken.id ||
      decodedToken.role === "admin"
    ) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "sorry you are not alowed to update this post" });
    }
  } catch (error) {
    console.log("there is an error : ", error);
  }
};

export const DeletePostAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (post?.user.toString() === req.user.id || req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "sorry you are not alowed to delete this post" });
    }
  } catch (error) {
    console.log("there is an error : ", error);
  }
};

///////////////////////////////////////////////
export const EditUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log("req.params => ", req.params);
    console.log("req.user.id => ", req.user.id);
    console.log("id", id);
    if (id === req.user.id || req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .json({ message: "sorry you are not alowed to update this user" });
    }
  } catch (error) {
    console.log("there is an error : ", error);
  }
};
///////////////////////////////////////////////
