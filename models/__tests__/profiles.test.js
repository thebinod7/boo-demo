const ProfileModel = require("../profiles.js");
const CommentModel = require("../comments.js");
const { fakeProfileData, fakeCommentData } = require("../fixtures/");

const { connectToMongoDB, close } = require("../../config/db.js");

const {
	validateMongoDuplicationError,
	validateNotEmpty,
	validateStringEquality,
	dbValidationError,
} = require("../../utils/test.validations.js");

beforeAll(async () => connectToMongoDB());
afterAll(async () => close());

let commentBy;
let commentFor;

describe("ProfileModel Suite", () => {
	test("It should create a new profile", async () => {
		const payload = new ProfileModel(fakeProfileData);
		const savedProfile = await payload.save();
		commentFor = savedProfile._id;
		validateNotEmpty(savedProfile);
		validateStringEquality(savedProfile.name, fakeProfileData.name);
		validateStringEquality(savedProfile.image, fakeProfileData.image);
	});

	test("It should validate duplicate mongo error", async () => {
		try {
			const payload = new ProfileModel(fakeProfileData);
			await payload.save();
		} catch (error) {
			const { name, code } = error;
			validateMongoDuplicationError(name, code);
		}
	});
});

describe("CommentModel Suite", () => {
	test("It should comment to a new profile", async () => {
		const payload = new ProfileModel({
			...fakeProfileData,
			name: "Harry Potter",
		});
		const savedProfile = await payload.save();
		commentBy = savedProfile._id;

		const commentPayload = new CommentModel({
			...fakeCommentData,
			commentBy: commentBy,
			commentFor: commentFor,
		});
		const savedComment = await commentPayload.save();
		validateNotEmpty(savedComment);
		validateStringEquality(
			savedComment.description,
			fakeCommentData.description
		);
		validateStringEquality(savedComment.commentBy, commentBy);
		validateStringEquality(savedComment.commentFor, commentFor);
	});

	test("It should not comment without a description", async () => {
		try {
			const commentPayload = new CommentModel({
				zodiac: "cancer",
				mbti: "ISFJ",
				enneagram: "9w3",
				commentBy: commentBy,
				commentFor: commentFor,
			});
			await commentPayload.save();
		} catch (error) {
			const { name } = error;
			dbValidationError(name);
		}
	});
});
