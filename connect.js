const mongoose = require("mongoose");
require("dotenv").config();

const state = mongoose.connection.readyState;
const connecting = mongoose.connection.states.connecting;
const connected = mongoose.connection.states.connected;

if(state !== connecting && state !== connected){
	const uri = process.env.MONGODB_URI;

	if(!uri)
		throw new Error("Environment variable MONGODB_URI is not specified");

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
	console.log(mongoose.connection.readyState);
	console.log("Already connected to a MongoDB");
}
