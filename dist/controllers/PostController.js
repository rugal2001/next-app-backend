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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getAllPosts = exports.getAllMyPosts = void 0;
const post_1 = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
////////////////////////////////////////////////////
const getAllMyPosts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const posts = yield post_1.PostModel.find({ user: userId }).populate("user", "firstName lastName image");
        return response.status(200).json({ data: posts });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.getAllMyPosts = getAllMyPosts;
//////////////////////////////////////////////////////
const getAllPosts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.PostModel.find().populate("user", "firstName lastName image");
        return response.status(200).json({ data: posts });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.getAllPosts = getAllPosts;
////////////////////////////////////////////////////////
const getPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const post = yield post_1.PostModel.findById(id).populate("user", "firstName lastName image");
        return response.status(200).json({ data: post });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.getPost = getPost;
////////////////////////////////////////////////////
const createPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, contenue, image, user } = request.body;
        const post = new post_1.PostModel({
            name,
            contenue,
            image,
            user,
        });
        yield post.save();
        return response.status(200).json({ message: "Post Created", data: post });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.createPost = createPost;
/////////////////////////////////////////////////////////////////////////
const updatePost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const { contenue } = request.body;
        const post = yield post_1.PostModel.findById(id);
        if (post) {
            post.contenue = contenue;
            yield post.save();
        }
        return response.status(200).json({ message: "Post Updated", data: post });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.updatePost = updatePost;
/////////////////////////////////////////////////////////////////////////////
const deletePost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        yield post_1.PostModel.findByIdAndDelete({ _id: id });
        return response.status(200).json({ message: "Post deleted" });
    }
    catch (error) {
        return response.status(400);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=PostController.js.map