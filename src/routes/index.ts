import express, { request } from "express";
import cloudinary from "cloudinary";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  addPost2,
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
//router.post("/posts", upload.single("image"), uploadImage);
//router.post("/posts", upload.single("image"), addPost);
//router.put("/posts/:id", upload.single("image"), updatePost);
router.delete("/posts/:id", deletePost);

router.post("/upload-img", upload.single("image"), addPost2);

export default router;

/**app.post('/upload', multerUploads, (req, res) => {
if(req.file) {
const file = dataUri(req).content;
return uploader.upload(file).then((result) => {
const image = result.url;
return res.status(200).json({
messge: 'Your image has been uploded successfully to cloudinary',
data: {
image
}
})
}).catch((err) => res.status(400).json({
messge: 'someting went wrong while processing your request',
data: {
err
}
}))
}
}); */
