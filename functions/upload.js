const fs = require("fs-extra");
const multer = require("multer");

async function upload(req, res){
	const file = multer().single("file");

	file(req, res, (err) => {
		if(err) throw new Error(err);

		console.log(req.file);
	});
	/* req.on("data", chunk => {
		body += chunk;
	});

	req.on("end", async() => {
		const data = body;
		await fs.writeFile("img/test.jpg", data);
		await fs.writeFile("img/test.txt", data);
	}); */
}

module.exports = upload;
