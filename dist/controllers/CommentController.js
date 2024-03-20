"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getAllComments = void 0;
const comment_1 = require("../models/comment");
////////////GET ALL COMMENTS///////////
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = yield comment_1.CommentModel.find({ post: postId }).populate("user", "firstName lastName image");
        return res.status(200).json({ data: comments });
    }
    catch (error) {
        return res.status(400).json({ message: "error in finding comments !!" });
    }
});
exports.getAllComments = getAllComments;
//////////////////_///////////////////
////////////CREATE COMMENT///////////
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contenue, user, post } = req.body;
        const comment = new comment_1.CommentModel({
            contenue,
            user,
            post,
        });
        yield comment.save();
        return res
            .status(200)
            .json({ message: "comment inserted successffully", data: comment });
    }
    catch (error) {
        return res.status(400);
    }
});
exports.createComment = createComment;
//////////////////_///////////////////
////////////UPDATE COMMENT///////////
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { contenue } = req.body;
        const comment = yield comment_1.CommentModel.findById(id);
        if (comment) {
            (comment.contenue = contenue), yield comment.save();
        }
        return res
            .status(200)
            .json({ message: "comment updated successffully", data: comment });
    }
    catch (error) {
        return res.status(400);
    }
});
exports.updateComment = updateComment;
//////////////////_///////////////////
////////////DELETE COMMENT///////////
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield comment_1.CommentModel.findByIdAndDelete({ _id: id });
        return res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        return res.status(400).json({ message: "Error in deleting the comment" });
    }
});
exports.deleteComment = deleteComment;
//////////////////_///////////////////
//# sourceMappingURL=CommentController.js.map