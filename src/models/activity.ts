import mongoose from "mongoose";
const ActivitySchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      require: true,
      enum : ['post_created','post_updated','comment_created','comment_updated','comment_deleted']
    },
    submitTime: {
      type: Date,
      require: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"post",
      required:true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the UserModel
      required: true,
    }
    
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model("activity", ActivitySchema);
