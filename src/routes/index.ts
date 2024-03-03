import express, { request } from "express";
import cloudinary from "cloudinary";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  uploadImg,
  register
} from "../controllers/PostController";
import multer, { Multer } from "multer";
const storage = multer.memoryStorage();
import upload from "../middleware/multer";

cloudinary.v2.config({
  cloud_name: "dbwjras14",
  api_key: "888776656743184",
  api_secret: "9xHPdwFBvMuh-2QhHEVnC2gUvLM",
});

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPost);
router.post("/upload-img", upload.single("image"), uploadImg);
router.post("/posts", createPost);
router.delete("/posts/:id", deletePost);
router.post("/register", register);

export default router;
