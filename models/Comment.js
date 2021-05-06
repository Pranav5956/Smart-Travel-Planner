import mongoose from "mongoose";

var commentSchema = mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentSchema);
