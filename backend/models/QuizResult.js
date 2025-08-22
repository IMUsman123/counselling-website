const supabase = require('../config/supabase');

class QuizResult {
  static async create(userId, careerMatch, score, answers) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            user_id: userId,
            career_match: careerMatch,
            score: score,
            answers: answers,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      throw new Error(`Error creating quiz result: ${error.message}`);
    }
  }

  static async getByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching quiz results: ${error.message}`);
    }
  }

  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(`Error fetching all quiz results: ${error.message}`);
    }
  }
}

module.exports = QuizResult;
