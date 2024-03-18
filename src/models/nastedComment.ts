import mongoose from "mongoose";
const NastedCommentSchema = new mongoose.Schema(
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
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment", // Reference to the PostModel
      required: true,
    },
  },
  { timestamps: true }
);
export const NastedCommentModel = mongoose.model("nastedComment", NastedCommentSchema);
