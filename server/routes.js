var controller = require('./controller/controller.js');
var router = require('express').Router();

router.get('/questions', controller.getQuestions);
router.get('/questions/:question_id/answers', controller.getAnswers);
router.post('/questions', controller.postQuestion);
router.post('/questions/:question_id/answers', controller.postAnswer);
router.put('/questions/:question_id/helpful', controller.putHelpful);
router.put('/questions/:question_id/report', controller.putReport);

module.exports = router;