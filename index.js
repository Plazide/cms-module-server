const render = require("./functions/render");
const save = require("./functions/save");
const publish = require("./functions/publish");
const upload = require("./functions/upload");
require("./connect");

module.exports = {
	render,
	save,
	publish,
	upload
};
