const Section = require("../models/Section");
const Page = require("../models/Page");

class SaveHandler{
	constructor ({ req, res }){
		this.req = req;
		this.res = res;
		this.status = {};
	}

	async save (){
		const sections = this.req.body.sections;
		const meta = this.req.body.meta;
		const lang = this.req.lang;
		const url = meta.url;

		const pageItem = await Page.findOne({ url });

		if(!pageItem)
			await Page.create(meta);
		else
			await pageItem.updateOne(meta);

		for(let section of sections){
			section.content = section.edited_text;
			section.lang = lang;
			meta.lang = lang;
			delete section.edited_text;
			delete section.original_text;

			const isPublic = false;
			const path = section.path;
			const page = section.page;

			const result = await Section.findOne({ path, page, lang, isPublic }).maxTime(1000)
				.catch( err => console.log(err));

			if(!result){
				section.isPublic = false;
				await this.createSection(section).catch( err => console.log(err));
			}else {
				await this.replaceSection(result, section).catch( err => console.log(err));
			}
		}

		return sections;
	}

	async createSection (section){
		console.log(`Creating ${section.path} for page: ${section.page}`);
		await Section.create(section);
	}

	async replaceSection (item, section){
		console.log(`Updating ${section.path} for page: ${section.page}`);
		await item.updateOne(section);
	}
}

async function save (req, res, db){
	console.log("Starting save...");
	const saveHandler = new SaveHandler({ req, res });
	const sections = await saveHandler.save();
	console.log("Finished save!");

	res.status(200).send({ status: 200, msg: "Sections updated!", sections });
}

module.exports = save;
