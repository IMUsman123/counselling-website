const express = require('express');
const QuizController = require('../controllers/quizController');

const router = express.Router();

// Get quiz data (questions and career information)
router.get('/data', QuizController.getQuizData);

// Submit quiz results
router.post('/results', QuizController.submitQuiz);

// Get user's quiz results
router.get('/user/:userId', QuizController.getUserResults);

// Get all quiz results (for admin purposes)
router.get('/all', QuizController.getAllResults);

module.exports = router;
