const mongoose = require("mongoose");

const { Schema } = mongoose;

// Creating the options Schema
const OptionsSchema = new Schema(
	{
		title: {
			type: "String",
			required: true,
			unique: true,
		},
		votes: {
			type: "Number",
			required: true,
			default: 0,
			min: 0,
		},
		link_to_vote: {
			type: "String",
		},
	},
	{
		timestamps: true,
	}
);

//app url from .env file
const { APP_URL } = process.env;

//before saving the Schema I want to generate a link to vote for the option
// It defines a pre('save',()) middleware function for a Mongoose schema,
// which means that this function will run automatically before a document is saved to the database.
/*
			The middleware function checks whether the current document being saved 
			has a "link_to_vote" property defined.
			If the "link_to_vote" property is not defined, the middleware function 
			sets it to a string that concatenates a constant "APP_URL" with the ID of 
			the current document and a path to an "add_vote" endpoint for the API version 1.


In summary, this code ensures that every document that is saved to the database 
has a "link_to_vote" property defined, which contains a URL for adding a vote to that document.

*/
OptionsSchema.pre("save", function (next) {
	if (!this.link_to_vote) {
		this.link_to_vote = `${APP_URL}/api/v1/options/${this._id}/add_vote`;
	}
	next();
});

//mongoose model using option schema

const Options = mongoose.model("Option", OptionsSchema);
module.exports = Options; //so that other modules can use it..
