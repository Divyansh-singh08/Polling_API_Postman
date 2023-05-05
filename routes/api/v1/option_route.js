//Option_router

const express = require('express');
const router = express.Router();
//importing the option controllers
const optionController = require('../../../controllers/api/v1/option_controller');

//to delete an option
router.route('/:id/delete').delete(optionController.delete);

//to increment the count of votes
router.route('/:id/add_vote').put(optionController.addVote);

//export route to the app.js file
module.exports = router;