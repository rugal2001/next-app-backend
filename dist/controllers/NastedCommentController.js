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
exports.deleteNastedComment = exports.updateNastedComment = exports.getAllNastedComment = exports.insertNastedComment = void 0;
const nastedComment_1 = require("../models/nastedComment");
const insertNastedComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { distinataire_firstName, distinataire_lastName, contenue, user, comment, } = req.body;
        const nastedComment = new nastedComment_1.NastedCommentModel({
            distinataire_firstName,
            distinataire_lastName,
            contenue,
            user,
            comment,
        });
        yield nastedComment.save();
        return res
            .status(200)
            .json({ message: "nasted comment saved successfully" });
    }
    catch (error) {
        return res.status(401).json({ error });
    }
});
exports.insertNastedComment = insertNastedComment;
const getAllNastedComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentsId } = req.params;
        const nastedComments = yield nastedComment_1.NastedCommentModel.find({ comment: commentsId }).populate("user", "firstName lastName image");
        return res.status(200).json({ data: nastedComments });
    }
    catch (error) {
        return res.status(404).json({ error });
    }
});
exports.getAllNastedComment = getAllNastedComment;
//////////////////////////////////////////////
const updateNastedComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { contenue } = req.body;
        const nastedComment = yield nastedComment_1.NastedCommentModel.findById(id);
        if (nastedComment) {
            nastedComment.contenue = contenue;
            yield nastedComment.save();
        }
        return res
            .status(200)
            .json({ message: "comment updated successffully", data: nastedComment });
    }
    catch (error) {
        return res.status(400);
    }
});
exports.updateNastedComment = updateNastedComment;
///////////////////////////////////////////////////
const deleteNastedComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield nastedComment_1.NastedCommentModel.findByIdAndDelete({ _id: id });
        return res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "Error in deleting the comment", error: error });
    }
});
exports.deleteNastedComment = deleteNastedComment;
//# sourceMappingURL=NastedCommentController.js.map