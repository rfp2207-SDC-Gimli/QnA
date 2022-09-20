var controller = require('./controller/controller.js');
var router = require('express').Router();

// GET requests
router.get('/questions', controller.getQuestions);
router.get('/questions/:question_id/answers', controller.getAnswers);

// POST requests
router.post('/questions', controller.postQuestion);
router.post('/questions/:question_id/answers', controller.postAnswer);

// PUT requests for questions
router.put('/questions/:question_id/helpful', controller.putHelpfulQuestion);
router.put('/questions/:question_id/report', controller.putReportQuestion);

// PUT requests for answers
router.put('/answers/:answer_id/helpful', controller.putHelpfulAnswer);
router.put('/answers/:answer_id/report', controller.putReportAnswer);

module.exports = router;