const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
	content: String,
	page: String,
	path: String,
	element: Object,
	isPublic: { type: Boolean, default: false },
	lang: String
});

const Section = mongoose.model("section", sectionSchema);

module.exports = Section;
