"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastedCommentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NastedCommentSchema = new mongoose_1.default.Schema({
    distinataire_firstName: {
        type: String,
        require: false
    },
    distinataire_lastName: {
        type: String,
        require: false
    },
    contenue: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user", // Reference to the UserModel
        required: true,
    },
    comment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "comment", // Reference to the PostModel
        required: true,
    },
}, { timestamps: true });
exports.NastedCommentModel = mongoose_1.default.model("nastedComment", NastedCommentSchema);
//# sourceMappingURL=nastedComment.js.map