const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  parentId: { type: mongoose.Types.ObjectId },
  user_id: String,
  ratings: { type: Number, default: 0 },
  child: [mongoose.Types.ObjectId],
  description: String,
  like: { type: Number, default: 0 },
  disLike: { type: Number, default: 0 },
});

const Comments = mongoose.model("comment", CommentsSchema);

module.exports = Comments;
