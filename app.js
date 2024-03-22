"use strict";

const express = require("express");
const app = express();
const { connectToMongoDB } = require("./config/db.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/profile")());

connectToMongoDB()
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT);
		console.log("Server running at %s", PORT);
	})
	.catch((err) => {
		console.error(err);
	});
