const mongoose = require("mongoose");

// Not sure which field is appropriate for unique so I'm using name for now
const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: String,
		mbti: String,
		enneagram: String,
		variant: String,
		tritype: Number,
		socionics: String,
		sloan: String,
		psyche: String,
		image: String,
	},
	{
		collection: "profiles",
	}
);

const Profile = mongoose.model("Profile", schema);

module.exports = Profile;
