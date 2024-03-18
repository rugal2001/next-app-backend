import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    contenue: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the UserModel
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post", // Reference to the PostModel
      required: true,
    },
  },
  { timestamps: true }
);
export const CommentModel = mongoose.model("comment", CommentSchema);
