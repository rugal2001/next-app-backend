import mongoose from "mongoose";
const ActivitySchema = new mongoose.Schema(
  {
    submitTime: {
      type: Date,
      require: true,
    },
    functionId: {
      type: String,
    },
    eventType: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the UserModel
      required: true,
    },
    pageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ActivityModel = mongoose.model("activity", ActivitySchema);
