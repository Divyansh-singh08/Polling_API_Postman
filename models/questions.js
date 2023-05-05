const mongoose = require("mongoose");
const { Schema } = mongoose;

// Creating the question Schema
const QuestionSchema = new Schema(
	{
		title: {
			type: "String",
			required: true,
		},
		options: [
			//options array to store options
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Options", //coming from then options
				},
				title: String,
				votes: Number,
				link_to_vote: String,
			},
		],
	},
	{
		timestamps: true,
	}
);


//mongoose models for Question Schema
//Question ---> this will be the DB name
const  Question = mongoose.model('Question',QuestionSchema);

module.exports = Question; //exporting so that to use in any another modules 