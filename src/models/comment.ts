import mongoose, { Schema, SchemaType } from "mongoose";
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
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      default: null,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);
function populateReplies(comment: any, depth: number) : mongoose.PopulateOptions {
  if (depth <= 0) return;
  
  return comment.populate({
    path: "replies",
    populate: {
      path: "user",
      select: "firstName lastName image",
      populate: (depth > 1) ? populateReplies(comment, depth - 1) : null,
    },
  });
}
CommentSchema.pre("find", function (next) {
  this.populate({
    path: "replies",
    populate: {
      path: "user",
      select: "firstName lastName image",
      populate: (this as any)._mongooseOptions.populate?.depth ?
        populateReplies(this, (this as any)._mongooseOptions.populate.depth - 1) :
        null,
    },
  });
  next();
});

export const CommentModel = mongoose.model("comment", CommentSchema);
