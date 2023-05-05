//Option Controller

const Option = require("../../../models/options");

module.exports = {
	// +++++++++++++++++++++++ DELETE A SINGLE OPTION ++++++++++++++++++++++++++ //
	delete: async (req, res) => {
		try {
			// trying to delete an option with given option id
			const optionID = req.params.id;
			const option = await Option.findById(optionID); // finding option by its id

			// if that option is not there
			// send a json file with status code 404 (not found)
			if (!option) {
				return res.status(404).json({
					success: false,
					message: `Option does not found with this id : ${optionID}`,
				});
			}

			// if option found
			// delete the option

			await Option.deleteOne({ _id: req.params.id });

			// then send a json file with status code 200 (ok)
			res.status(200).json({
				success: true,
				message: `You have delete an option with id ${option.id} successfully`,
			});
			// if any error go to catch block
		} catch (err) {
			// send a json file with status code 500 (Internal server error)
			res.status(500).json({
				success: false,
				message: `Internal Server Error | Error in deleting option`,
				err,
			});
		}
	},

	// +++++++++++++++++++++++ ADD A VOTE +++++++++++++++++++++++++++++++ //
	addVote: async (req, res) => {
		// trying to add vote to a particular option
		try {
			//finding option with their id
			const option = await Option.findById(req.params.id);

			//incrementing the votes field value by 1
			option.votes += 1;

			//and then save it to the dataBase
			await option.save();

			// and after sending a json file as response with status code 200 (ok)
			res.status(200).json({
				success: true,
				message: "Vote incremented by 1",
			});
			//if any error go to the catch block
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `Error in adding Vote`,
				error,
			});
		}
	},
};
