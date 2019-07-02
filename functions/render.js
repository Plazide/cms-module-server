const Section = require("../models/Section");
const fs = require("fs-extra");
const path = require("path");
const jsdom = require("jsdom");
const{ JSDOM } = jsdom;

async function insertContents(page, contents){
	try{
		const pageSections = await Section.find({ page });
		const dom = new JSDOM(contents);
		const document = dom.window.document;

		for(let section of pageSections){
			const el = document.querySelector(section.path);
			el.innerHTML = section.content;
		}

		return dom.serialize();
	}catch (err){
		throw err;
	}
}

module.exports = (dir, options) => {
	return async(req, res, next) => {
		if(req.method !== "GET"){
			next();
			return;
		}

		try{
			let reqFile = req.url === "/" ? "index.html" : req.url.substring(1);
			if(path.extname(reqFile) !== ".html"){
				next();
				return;
			}

			const dirFiles = await fs.readdir(dir);
			const htmlFiles = dirFiles.filter( file => {
				return path.extname(file) === ".html";
			});

			if(!htmlFiles.includes(reqFile)){
				next();
				return;
			}

			const file = `${dir}/${reqFile}`;
			const fileContents = await fs.readFile(file);
			const renderedContents = await insertContents(req.url, fileContents);
			res.send(renderedContents);
		}catch (err){
			throw err;
		}
	};
};
