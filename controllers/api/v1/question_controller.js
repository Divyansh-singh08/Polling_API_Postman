//Question Controller
const Question = require("../../../models/questions");
const Option = require("../../../models/options");

module.exports = {
	//****************************  Creating the Questions ***********************
	creatingQuestion: async (req, res) => {
		try {
			// trying to creating a single question
			const question = await Question.create(req.body);

			//save the question to the dataBase
			await question.save();

			//send the successfully msg to the json formate
			res.status(200).json({
				success: true,
				message: "Question created successfully",
				questionID: question.id,
			});
			//if getting error while creating the question
		} catch (err) {
			res.status(500).json({
				success: false,
				message: `Error in creating the Question ${err}`,
			});
		}
	},

	//****************************  Delete A SINGLE Questions *******************/
	delete: async (req, res) => {
		//try to delete a Question
		try {
			//finding a Question by it's Id
			const question = await Question.findById(req.params.id);

			// if that question is not present send a json file with status code 404 (not found)
			if (!question) {
				return res.status(400).json({
					success: false,
					message: `This Question is already deleted or Does not exist`,
				});
			}

			//if question is present then delete it
			await Question.deleteOne({ _id: req.params.id });

			//and sending a success message as json file
			res.status(200).json({
				success: true,
				message: `A Question with related options are deleted successfully`,
			});
			//if any error
		} catch (err) {
			res.status.json({
				success: false,
				message: "Error in deleting a Question",
				err,
			});
		}
	},

	// ************************** View the Single Question **************************
	viewSingleQuestion: async (req, res) => {
		//try to find the question with id
		try {
			//find the Question
			const questionID = req.params.id; //store the question
			const question = await Question.findById(questionID); //find the question with ID

			//if that question is not present send a json file with status code 404 (not found)
			if (!question) {
				return res.status(404).json({
					success: false,
					message: `Question not found with this id: ${questionID}`,
				});
			}
			//if got the Question with ID
			//then mapping the Options from the Question Schema
			const options = question.options.map((option) => ({
				id: option.id,
				text: option.title,
				votes: option.votes,
				like_to_vote: `${req.protocol}://${req.get("host")}/api/v1/options/${
					option.id
				}/add_vote`,
			}));

			// and sending a success message as json file
			res.status(200).json({
				success: true,
				id: question.id,
				title: question.title,
				options: options,
			});
			//if any error
		} catch (err) {
			res.status(500).json({
				success: false,
				message: `Error in view in Question`,
			});
		}
	},

	// **************************** CREATE OPTIONS ******************************** 🎈//
	createOption: async (req, res) => {
		//try to create Options
		try {
			//find the Question with Id
			const qID = req.params.id;
			const question = await Question.findById(qID);

			// if that question is not present send a json file with status code 404 (not found)
			if (!question) {
				return res.status(404).json({
					success: false,
					message: `Cannot find question with id: ${qID}`,
				});
			}

			//create a option with the given body
			const { title, votes } = req.body;
			const option = await Option.create({ title, votes });

			//generating new link every time for new option
			const voteLink = `${req.protocal}://${req.get("host")}/api/v1/options/${
				option.id
			}/add_vote`;

			//push created option to that question
			question.options.push({
				id: option._id,
				title: option.title,
				votes: option.votes,
				link_to_vote: voteLink,
			});

			// saving this option to question schema
			await question.save();

			//sending the success message  as a json file
			res.status(200).json({
				success: true,
				message: `Options Created Successfully!`,
			});
			//if any error go to catch
		} catch (err) {
			res.status(500).json({
				success: false,
				message: `Error in Creating Options`,
				error: err.message,
			});
		}
	},
};
