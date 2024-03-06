import express from "express";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { UserModel } from "../db/user";
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
    res.status(201).json({message : 'user created successfully'})
  } catch (error) {
    res.status(500).send(error);
  }
};

interface UserType {
  email: string;
  password: string;
  // Add other properties as needed
}

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const users: UserType[] = await UserModel.find();
  const user = await users.find((u) => u.email === email);
  

  if (!user) {
      return res.status(401).send("No User Found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
      return res.status(401).send("Invalid data");
  }

  const token = jwt.sign({ userId: user.email }, secretKey, {
      expiresIn: "1h",
  });
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;
  UserModel.findById(userId)
  .then((user :any)=>{
    if (!user) {
      console.error('User not found');
      return;
    }
    const userName: string = user.name;
    console.log('User name:', userName);
  })
  .catch((err:Error)=>{
    console.error('Error querying user:', err);
  })

  
  res.status(200).json({access_token:token} );
};

