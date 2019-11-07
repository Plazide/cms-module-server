const Section = require("../models/Section");
const Page = require("../models/Page");
const fs = require("fs-extra");
const path = require("path");
const jsdom = require("jsdom");
const{ JSDOM } = jsdom;

function setMeta (doc, lang, meta){
	const head = doc.querySelector("head");
	doc.querySelector("html").setAttribute("lang", lang);

	doc.title = meta.title;
	head.querySelector("meta[name=\"description\"]").setAttribute("content", meta.description);
	head.querySelector("meta[name=\"keywords\"]").setAttribute("content", meta.keywords);

	if(meta.canonical)
		head.querySelector("link[rel=\"canonical\"]").setAttribute("href", meta.canonical);
}

async function insertContents (req, contents){
	try{
		const lang = req.lang;
		const page = req.originalUrl;
		const meta = await Page.findOne({ url: page });
		const pageSections = await Section.find({ page });
		const dom = new JSDOM(contents);
		const window = dom.window;
		const document = window.document;
		const isPublic = true;

		for(let section of pageSections)
			if(section.lang === lang && (req.authorized || isPublic)){
				const el = document.querySelector(section.path);
				if(el)
					el.innerHTML = section.content;
			}

		if(meta)
			setMeta(document, lang, meta);

		return dom.serialize();
	}catch (err){
		console.error(err);
		return false;
	}
}

module.exports = (dir, options) => {
	return async (req, res, next) => {
		if(req.method !== "GET"){
			next();
			return;
		}

		try{
			let reqFile = req.url === "/" ? "index" : req.url.substring(1);
			const dirFiles = await fs.readdir(dir);
			const htmlFiles = dirFiles.filter( file => {
				return path.extname(file) === ".html";
			});

			if(!htmlFiles.includes(reqFile + ".html")){
				next();
				return;
			}

			const file = `${dir}/${reqFile}.html`;
			const fileContents = await fs.readFile(file, { encoding: "utf-8" });
			const renderedContents = await insertContents(req, fileContents);

			if(!renderedContents) return next();

			res.send(renderedContents);
		}catch (err){
			throw err;
		}
	};
};
