"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        Required: true,
    },
    lastName: {
        type: String,
        Required: true,
    },
    email: {
        type: String,
        ref: 'user',
        Required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        Required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    image: {
        type: String,
        require: true,
    }
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('user', userSchema);
//export const PostModel = mongoose.model('post' , PostSchema);
//# sourceMappingURL=user.js.map