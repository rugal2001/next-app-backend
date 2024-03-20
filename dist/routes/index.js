"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const PostController_1 = require("../controllers/PostController");
const UserController_1 = require("../controllers/UserController");
const ImageController_1 = require("../controllers/ImageController");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const multer_2 = __importDefault(require("../middleware/multer"));
cloudinary_1.default.v2.config({
    cloud_name: "dbwjras14",
    api_key: "888776656743184",
    api_secret: "9xHPdwFBvMuh-2QhHEVnC2gUvLM",
});
const router = express_1.default.Router();
const auth_1 = require("../middleware/auth");
const CommentController_1 = require("../controllers/CommentController");
const NastedCommentController_1 = require("../controllers/NastedCommentController");
router.get("/posts", auth_1.authenticateUser, PostController_1.getAllPosts);
router.get("/user/:userId/posts", PostController_1.getAllMyPosts);
router.get("/posts/:id", auth_1.authenticateUser, PostController_1.getPost);
router.post("/upload-img", [auth_1.authenticateUser, multer_2.default.single("image")], ImageController_1.uploadImg);
router.post("/posts", auth_1.authenticateUser, PostController_1.createPost);
router.put("/posts/:id", auth_1.authenticateUser, PostController_1.updatePost);
router.delete("/posts/:id", auth_1.authenticateUser, PostController_1.deletePost);
router.post("/register", UserController_1.register);
router.post("/login", UserController_1.login);
router.get("/me", auth_1.authenticateUser, UserController_1.getUser);
router.get("/user/:id", auth_1.authenticateUser, UserController_1.getUserById);
router.put("/user/:id", auth_1.authenticateUser, UserController_1.updateUser);
router.post("/comments", auth_1.authenticateUser, CommentController_1.createComment);
router.get("/posts/:postId/comments", auth_1.authenticateUser, CommentController_1.getAllComments);
router.put("/comments/:id", auth_1.authenticateUser, CommentController_1.updateComment);
router.delete("/comments/:id", CommentController_1.deleteComment);
router.post("/nasted-comments", auth_1.authenticateUser, NastedCommentController_1.insertNastedComment);
router.get("/comments/:commentsId/nasted-comments", auth_1.authenticateUser, NastedCommentController_1.getAllNastedComment);
router.put("/nasted-comments/:id", auth_1.authenticateUser, NastedCommentController_1.updateNastedComment);
router.delete("/nasted-comments/:id", auth_1.authenticateUser, NastedCommentController_1.deleteNastedComment);
exports.default = router;
//# sourceMappingURL=index.js.map