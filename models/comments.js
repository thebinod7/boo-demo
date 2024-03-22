const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schema = new mongoose.Schema(
	{
		description: { type: String, required: true },
		mbti: String,
		enneagram: String,
		zodiac: String,
		commentBy: { type: ObjectId, ref: "Profile" },
		commentFor: { type: ObjectId, ref: "Profile" },
	},
	{
		collection: "comments",
	}
);

const Comment = mongoose.model("Comment", schema);

module.exports = Comment;
