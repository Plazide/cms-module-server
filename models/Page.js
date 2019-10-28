const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
	url: String,
	title: String,
	description: String,
	keywords: String,
	lang: String
});

const Page = mongoose.model("page", pageSchema);

module.exports = Page;
