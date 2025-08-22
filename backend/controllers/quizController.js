const QuizResult = require('../models/QuizResult');
const { CAREER_DATA, QUIZ_QUESTIONS } = require('../../shared/constants-backend');

class QuizController {
  // Get quiz questions and career data
  static async getQuizData(req, res) {
    try {
      res.json({
        questions: QUIZ_QUESTIONS,
        careers: Object.keys(CAREER_DATA)
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz data' });
    }
  }

  // Calculate career match based on quiz answers
  static calculateCareerMatch(answers) {
    const scores = {};
    
    // Initialize scores for all careers
    Object.keys(CAREER_DATA).forEach(career => {
      scores[career] = 0;
    });

    // Calculate scores based on answers
    answers.forEach((answer, index) => {
      const question = QUIZ_QUESTIONS[index];
      if (question && question.options[answer]) {
        const optionScores = question.options[answer].score;
        Object.keys(optionScores).forEach(career => {
          scores[career] += optionScores[career];
        });
      }
    });

    // Find the career with the highest score
    let bestCareer = Object.keys(scores)[0];
    let bestScore = scores[bestCareer];

    Object.keys(scores).forEach(career => {
      if (scores[career] > bestScore) {
        bestCareer = career;
        bestScore = scores[career];
      }
    });

    return {
      career: bestCareer,
      score: bestScore,
      allScores: scores
    };
  }

  // Submit quiz results
  static async submitQuiz(req, res) {
    try {
      const { userId, answers } = req.body;

      if (!userId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      // Calculate career match
      const result = QuizController.calculateCareerMatch(answers);
      
      // Save to database
      const quizResult = await QuizResult.create(
        userId,
        result.career,
        result.score,
        answers
      );

      res.json({
        success: true,
        result: {
          career: result.career,
          score: result.score,
          description: CAREER_DATA[result.career].description,
          scope: CAREER_DATA[result.career].scope,
          demand: CAREER_DATA[result.career].demand,
          salary: CAREER_DATA[result.career].salary,
          skills: CAREER_DATA[result.career].skills,
          personality: CAREER_DATA[result.career].personality,
          allScores: result.allScores
        },
        quizResult
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: 'Failed to submit quiz results' });
    }
  }

  // Get user's quiz results
  static async getUserResults(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const results = await QuizResult.getByUserId(userId);
      res.json({ results });
    } catch (error) {
      console.error('Error fetching user results:', error);
      res.status(500).json({ error: 'Failed to fetch user results' });
    }
  }

  // Get all quiz results (admin function)
  static async getAllResults(req, res) {
    try {
      const results = await QuizResult.getAll();
      res.json({ results });
    } catch (error) {
      console.error('Error fetching all results:', error);
      res.status(500).json({ error: 'Failed to fetch all results' });
    }
  }
}

module.exports = QuizController;
