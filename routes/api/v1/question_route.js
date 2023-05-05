
//Question api
const express = require('express');
const router = express.Router();
// importing question controller to set routes to their respective functions
const questionController = require('../../../controllers/api/v1/question_controller');

//to create a new Question
//( api/v1/options/create) {create}<= ./routes/api/v1/question_route
router.route('/create').post(questionController.creatingQuestion);
//to create a new option for a given question
router.route('/:id/options/create').post(questionController.createOption);
// to delete a question with the given ID
router.route('/:id/delete').delete(questionController.delete);
// to view a single question with the given ID
router.route('/:id').get(questionController.viewSingleQuestion);

//exporting the router to the app.js
module.exports = router;



