import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
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
    likeCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the UserModel
      required: true,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("post", PostSchema);
