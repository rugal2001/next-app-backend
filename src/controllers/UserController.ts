import express from "express";
import bcrypt from "bcryptjs";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user";
const secretKey = "123456";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const users: UserType[] = await UserModel.find();
    const userCheck = await users.find((u) => u.email === email);
    if (userCheck) {
      res.status(400).json({ message: "this email is already used" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

interface UserType {
  _id: string;
  role: string;
  email: string;
  password: string;
  firstname: string;
  // Add other properties as needed
}

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const users: UserType[] = await UserModel.find();
  const user = await users.find((u) => u.email === email);

  const existedUser = await UserModel.findOne({email});

  if (!user) {
    return res.status(401).send("No User Found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).send("Invalid data");
  }

  const token = jwt.sign(
    { userId: user.email, role: user.role, id: user._id },
    secretKey,
    {
      expiresIn: "24h",
    }
  );
  // const decodedToken = jwt.decode(token);


  res.status(200).json({ access_token: token, user: existedUser });
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const profile = await UserModel.findOne({
      email: req.user.userId,
    });

    if (!profile) {
      return res.status(400).send("there is no profile for this user");
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(401).json({ message: "error message !" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const { image } = req.body;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { role } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user Not found" });
    }
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.role = role;
      user.image = image;
      await user.save();
      return res.status(201).json({ message: "user updated succeffully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "There is an issue in update user method" });
  }
};

export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).send(`there is no user with the id=${id}`);
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "error message !" });
  }
};
