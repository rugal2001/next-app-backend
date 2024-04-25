import mongoose from "mongoose";
const ActivitySchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      require: true,
      enum: [
        "post_created",
        "post_updated",
        "post_deleted",
        "comment_created",
        "comment_updated",
        "comment_deleted",
      ],
    },
    post:{
      type : mongoose.Schema.Types.ObjectId,
      ref:"post",
      require : true
    },
    oldData: {
      type: Object,
      default: {},
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"comment",
      default: {},
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the UserModel
      required: true,
    },
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model("activity", ActivitySchema);
