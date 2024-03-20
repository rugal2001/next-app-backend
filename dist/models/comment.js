"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    contenue: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to the UserModel
        required: true,
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "post", // Reference to the PostModel
        required: true,
    },
}, { timestamps: true });
exports.CommentModel = mongoose_1.default.model("comment", CommentSchema);
//# sourceMappingURL=comment.js.map