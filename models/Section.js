const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
	content: String,
	page: String,
	path: String,
	isPublic: Boolean
});

const Section = mongoose.model("section", sectionSchema);

module.exports = Section;
