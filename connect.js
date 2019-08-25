const mongoose = require("mongoose");
require("dotenv").config();

if(!mongoose.connection){
	const uri = process.env.MONGODB_URI;

	if(!uri)
		throw new Error("Environment variable ADMIN_URI is not specified");

	// Connect to MongoDB
	mongoose.connect(uri, { useNewUrlParser: true })
		.catch(err => {
			console.log(err);
		});

	// Check for connection errors and confirm connection
	const db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", () => {
		console.log("Connected to CMS database");
	});
}else {
	console.log("Already connected to a MongoDB");
}
