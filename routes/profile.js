"use strict";

const express = require("express");
const router = express.Router();
const ProfileModel = require("../models/profiles.js");
const CommentModel = require("../models/comments.js");

module.exports = function () {
	router.post("/profiles", async (req, res, next) => {
		try {
			const result = await ProfileModel.create(req.body);
			res.json({ success: true, data: result });
		} catch (error) {
			console.error(error);
			res.status(500).send("Server error");
		}
	});
	router.get("/profiles", async (req, res, next) => {
		const docs = await ProfileModel.find();
		res.json({ success: true, data: docs });
	});

	router.get("/profiles/:id", async (req, res, next) => {
		const doc = await ProfileModel.findOne({ _id: req.params.id });
		res.json({ success: true, data: doc });
	});

	router.post("/comments", async (req, res, next) => {
		try {
			const result = await CommentModel.create(req.body);
			res.json({ success: true, data: result });
		} catch (error) {
			console.error(error);
			res.status(500).send("Server error");
		}
	});

	router.get("/comments", async (req, res, next) => {
		const docs = await CommentModel.find().populate("commentBy");
		res.json({ success: true, data: docs });
	});

	return router;
};
