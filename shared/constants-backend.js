// Career dataset structure for backend (CommonJS)
const CAREER_DATA = {
  "Software Engineer": {
    description: "Develops software applications and systems using programming languages and frameworks.",
    scope: "High demand across all industries, remote work opportunities, continuous learning required",
    demand: "Very High - Consistently growing with tech industry expansion",
    salary: "$70,000 - $150,000+ annually, varies by experience and location",
    skills: ["Programming", "Problem Solving", "Analytical Thinking", "Teamwork", "Communication"],
    personality: ["Logical", "Detail-oriented", "Creative", "Patient", "Curious"]
  },
  "Data Scientist": {
    description: "Analyzes complex data to help organizations make informed decisions.",
    scope: "Growing field in tech, finance, healthcare, and consulting sectors",
    demand: "Very High - Rapidly growing as companies embrace data-driven decisions",
    salary: "$80,000 - $180,000+ annually, with high earning potential",
    skills: ["Statistics", "Programming", "Data Analysis", "Machine Learning", "Business Acumen"],
    personality: ["Analytical", "Curious", "Detail-oriented", "Logical", "Problem-solver"]
  },
  "Marketing Manager": {
    description: "Develops and executes marketing strategies to promote products and services.",
    scope: "Essential role in all business sectors, digital marketing growth",
    demand: "High - Steady demand with digital transformation driving growth",
    salary: "$60,000 - $120,000+ annually, performance-based bonuses common",
    skills: ["Communication", "Creativity", "Analytics", "Leadership", "Strategic Thinking"],
    personality: ["Creative", "Extroverted", "Strategic", "Results-driven", "Adaptable"]
  },
  "Healthcare Professional": {
    description: "Provides medical care and support to patients in various healthcare settings.",
    scope: "Always in demand, diverse specializations, stable career path",
    demand: "Very High - Critical shortage in many areas, stable long-term demand",
    salary: "$50,000 - $200,000+ annually, varies by specialization and experience",
    skills: ["Medical Knowledge", "Patient Care", "Communication", "Empathy", "Attention to Detail"],
    personality: ["Compassionate", "Patient", "Detail-oriented", "Calm under pressure", "Team player"]
  },
  "Financial Analyst": {
    description: "Analyzes financial data to help businesses make investment and financial decisions.",
    scope: "Strong demand in corporate finance, investment banking, and consulting",
    demand: "High - Consistent demand in finance sector, recession-resistant",
    salary: "$60,000 - $130,000+ annually, with bonus potential",
    skills: ["Financial Analysis", "Excel", "Research", "Communication", "Critical Thinking"],
    personality: ["Analytical", "Detail-oriented", "Risk-averse", "Logical", "Professional"]
  },
  "Designer": {
    description: "Creates visual designs for products, websites, and marketing materials.",
    scope: "Growing demand in tech, advertising, and creative industries",
    demand: "High - Growing demand with digital transformation and UX focus",
    salary: "$45,000 - $100,000+ annually, freelance opportunities available",
    skills: ["Creativity", "Design Software", "Visual Communication", "User Experience", "Typography"],
    personality: ["Creative", "Visual", "Detail-oriented", "Innovative", "User-focused"]
  },
  "Teacher": {
    description: "Educates students in various subjects and helps them develop skills and knowledge.",
    scope: "Essential role in education, opportunities in public and private sectors",
    demand: "High - Consistent demand, especially in STEM and special education",
    salary: "$40,000 - $80,000+ annually, varies by location and experience",
    skills: ["Communication", "Patience", "Subject Knowledge", "Classroom Management", "Adaptability"],
    personality: ["Patient", "Enthusiastic", "Organized", "Empathetic", "Motivational"]
  },
  "Sales Representative": {
    description: "Sells products or services to customers and builds client relationships.",
    scope: "Universal role across all industries, high earning potential",
    demand: "High - Always in demand, essential for business growth",
    salary: "$40,000 - $120,000+ annually, commission-based structure",
    skills: ["Communication", "Negotiation", "Relationship Building", "Product Knowledge", "Persistence"],
    personality: ["Extroverted", "Confident", "Persuasive", "Resilient", "Goal-oriented"]
  }
};

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How do you prefer to spend your free time?",
    options: [
      { text: "Solving puzzles and brain teasers", score: { "Software Engineer": 3, "Data Scientist": 3, "Financial Analyst": 2 } },
      { text: "Creating art or designing things", score: { "Designer": 3, "Marketing Manager": 2 } },
      { text: "Reading and learning new things", score: { "Teacher": 3, "Data Scientist": 2, "Healthcare Professional": 2 } },
      { text: "Meeting new people and socializing", score: { "Sales Representative": 3, "Marketing Manager": 3, "Teacher": 1 } }
    ]
  },
  {
    id: 2,
    question: "What type of work environment do you prefer?",
    options: [
      { text: "Quiet, focused environment", score: { "Software Engineer": 3, "Data Scientist": 3, "Financial Analyst": 3 } },
      { text: "Creative and collaborative space", score: { "Designer": 3, "Marketing Manager": 3, "Teacher": 2 } },
      { text: "Fast-paced and dynamic", score: { "Sales Representative": 3, "Marketing Manager": 2, "Healthcare Professional": 2 } },
      { text: "Structured and organized", score: { "Teacher": 3, "Healthcare Professional": 3, "Financial Analyst": 2 } }
    ]
  },
  {
    id: 3,
    question: "How do you handle challenges and problems?",
    options: [
      { text: "Analyze systematically and find logical solutions", score: { "Software Engineer": 3, "Data Scientist": 3, "Financial Analyst": 3 } },
      { text: "Think creatively and find innovative approaches", score: { "Designer": 3, "Marketing Manager": 3, "Teacher": 2 } },
      { text: "Collaborate with others to find solutions", score: { "Teacher": 3, "Healthcare Professional": 3, "Marketing Manager": 2 } },
      { text: "Persist until I find a solution", score: { "Sales Representative": 3, "Healthcare Professional": 2, "Software Engineer": 1 } }
    ]
  },
  {
    id: 4,
    question: "What motivates you most in a job?",
    options: [
      { text: "Solving complex technical problems", score: { "Software Engineer": 3, "Data Scientist": 3, "Financial Analyst": 2 } },
      { text: "Helping and serving others", score: { "Teacher": 3, "Healthcare Professional": 3, "Sales Representative": 1 } },
      { text: "Creating something new and innovative", score: { "Designer": 3, "Marketing Manager": 2, "Software Engineer": 1 } },
      { text: "Achieving goals and targets", score: { "Sales Representative": 3, "Marketing Manager": 3, "Financial Analyst": 2 } }
    ]
  },
  {
    id: 5,
    question: "How do you prefer to communicate with others?",
    options: [
      { text: "Through clear, logical explanations", score: { "Software Engineer": 3, "Data Scientist": 3, "Financial Analyst": 3 } },
      { text: "Using visual aids and creative methods", score: { "Designer": 3, "Marketing Manager": 3, "Teacher": 2 } },
      { text: "Through personal interaction and empathy", score: { "Teacher": 3, "Healthcare Professional": 3, "Sales Representative": 2 } },
      { text: "Persuasively and confidently", score: { "Sales Representative": 3, "Marketing Manager": 3, "Teacher": 1 } }
    ]
  }
];

// CommonJS export for backend
module.exports = {
  CAREER_DATA,
  QUIZ_QUESTIONS
};
