import express, { request } from "express";
import cloudinary from "cloudinary";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/PostController";

import {
  register,
  login,
  getUser,
  updateUser,
  getUserById
} from "../controllers/UserController";
import { uploadImg } from "../controllers/ImageController";
import multer, { Multer } from "multer";
const storage = multer.memoryStorage();
import upload from "../middleware/multer";

cloudinary.v2.config({
  cloud_name: "dbwjras14",
  api_key: "888776656743184",
  api_secret: "9xHPdwFBvMuh-2QhHEVnC2gUvLM",
});

const router = express.Router();

import { authenticateUser } from "../middleware/auth";
import { createComment, getAllComments,updateComment,deleteComment } from "../controllers/CommentController";

import { insertNastedComment,getAllNastedComment } from "../controllers/NastedCommentController";

router.get("/posts", authenticateUser, getAllPosts);
router.get("/posts/:id", authenticateUser, getPost);
router.post(
  "/upload-img",
  [authenticateUser, upload.single("image")],
  uploadImg
);
router.post("/posts", authenticateUser, createPost);
router.put("/posts/:id",authenticateUser, updatePost);
router.delete("/posts/:id", authenticateUser, deletePost);

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateUser, getUser);
router.get("/user/:id", authenticateUser, getUserById);
router.put("/user/:id", authenticateUser, updateUser);


router.post("/comments",authenticateUser,createComment)
router.get("/comments",authenticateUser,getAllComments)
router.put("/comments/:id",authenticateUser,updateComment)
router.delete("/comments/:id",deleteComment)

router.post("/nasted-comments",authenticateUser,insertNastedComment)
router.get("/nasted-comments",authenticateUser,getAllNastedComment)

export default router;
