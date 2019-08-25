const render = require("./controllers/render");
const save = require("./controllers/save");
const publish = require("./controllers/publish");
const upload = require("./controllers/upload");
require("./connect");

module.exports = {
	render,
	save,
	publish,
	upload
};
