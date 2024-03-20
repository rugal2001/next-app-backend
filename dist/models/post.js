"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    contenue: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user', // Reference to the UserModel
        required: true
    }
}, { timestamps: true });
exports.PostModel = mongoose_1.default.model('post', PostSchema);
//# sourceMappingURL=post.js.map