import express, { request } from "express";
import cloudinary from "cloudinary";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getAllMyPosts,
} from "../controllers/PostController";

import {
  register,
  login,
  getUser,
  updateUser,
  getUserById,
} from "../controllers/UserController";
import { uploadImg } from "../controllers/ImageController";
import multer, { Multer } from "multer";
const storage = multer.memoryStorage();
import upload from "../middleware/multer";
import authorizeAdmin from "../middleware/authorizeAdmin";

cloudinary.v2.config({
  cloud_name: "dbwjras14",
  api_key: "888776656743184",
  api_secret: "9xHPdwFBvMuh-2QhHEVnC2gUvLM",
});

const router = express.Router();

import { authenticateUser } from "../middleware/auth";
import {
  createComment,
  createNastedComment,
  getAllComments,
  updateComment,
  deleteComment,
} from "../controllers/CommentController";

import {
  insertNastedComment,
  getAllNastedComment,
  deleteNastedComment,
  updateNastedComment,
} from "../controllers/NastedCommentController";

import {
  EditPostAuth,
  DeletePostAuth,
  EditUserAuth,
} from "../middleware/authorization";

import { LikePost, UnlikePost } from "../controllers/LikeController";
import { createActivity, getAllActivities } from "../controllers/ActivityController";

router.get(`/posts`, getAllPosts);
router.get("/user/:userId/posts", getAllMyPosts);

router.get("/posts/:id", authenticateUser, getPost);
router.post(
  "/upload-img",
  [authenticateUser, upload.single("image")],
  uploadImg
);
router.post("/posts", authenticateUser, createPost);
router.put("/posts/:id", authenticateUser, EditPostAuth, updatePost);
router.delete("/posts/:id", authenticateUser, DeletePostAuth, deletePost);

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateUser, getUser);
router.get("/user/:id", authenticateUser, getUserById);
// router.put("/user/:id", authenticateUser, EditUserAuth, updateUser);
router.put("/user/:id", updateUser);

router.post("/comments", authenticateUser, createComment);
router.post("/:commentId/reply/:postId", authenticateUser, createNastedComment);
router.get("/posts/:postId/comments", authenticateUser, getAllComments);

router.put("/comments/:id", authenticateUser, updateComment);
router.delete("/comments/:id", deleteComment);

router.post("/nasted-comments", authenticateUser, insertNastedComment);
router.get(
  "/comments/:commentsId/nasted-comments",
  authenticateUser,
  getAllNastedComment
);
router.put("/nasted-comments/:id", authenticateUser, updateNastedComment);
router.delete("/nasted-comments/:id", authenticateUser, deleteNastedComment);

router.post("/:type/:id/like", authenticateUser, LikePost);
router.delete("/:type/:id/like", UnlikePost);

router.post("/activity",authenticateUser,createActivity);
router.get("/activity/:id",authenticateUser,getAllActivities);

export default router;
