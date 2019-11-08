const Section = require("../models/Section");

class PublishHandler{
	constructor ({ req, res }){
		this.req = req;
		this.res = res;
		this.status = {};
	}

	async publish (){
		const sections = this.req.body;
		const lang = this.req.cookies.lang;

		for(let section of sections){
			section.content = section.saved_text;
			section.isPublic = true;
			delete section.edited_text;
			delete section.original_text;

			const isPublic = true;
			const path = section.path;
			const page = section.page;
			const result = await Section.findOne({ path, page, lang, isPublic }).maxTime(1000)
				.catch( err => console.log(err));

			if(!result)
				await this.createSection(section).catch( err => console.log(err));
			else
				await this.replaceSection(result, section).catch( err => console.log(err));
		}

		return sections;
	}

	async createSection (section){
		await Section.create(section);
	}

	async replaceSection (item, section){
		await item.updateOne(section);
	}
}

async function publish (req, res){
	console.log("Starting publish...");
	const publishHandler = new PublishHandler({ req, res });
	const sections = await publishHandler.publish();

	console.log("Finished publish!");
	res.status(200).send({ status: 200, msg: "Sections updated!", sections });
}

module.exports = publish;
