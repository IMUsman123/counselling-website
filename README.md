# 🎯 Career Guidance Web Application

A full-stack career guidance web application built with Next.js, Supabase, and Node.js. Take a comprehensive career assessment quiz and discover your perfect career path based on your personality, interests, and skills.

## ✨ Features

- **🔐 User Authentication**: Secure signup/login with Supabase Auth
- **📝 Career Assessment Quiz**: 5-question personality-based career matching
- **🎯 Personalized Results**: Get detailed career insights with skills and personality traits
- **📱 Responsive Design**: Mobile-first design with TailwindCSS
- **⚡ Modern Tech Stack**: Built with Next.js 14, TypeScript, and Framer Motion
- **🗄️ Data Persistence**: Save quiz results to Supabase database
- **🔒 Protected Routes**: Quiz access only for authenticated users

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MVC Architecture** - Clean code organization
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Database & Authentication
- **Supabase** - PostgreSQL database + Auth API
- **PostgreSQL** - Relational database

## 📁 Project Structure

```
career-guidance-app/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   ├── components/          # Reusable React components
│   ├── contexts/            # React contexts (Auth)
│   ├── lib/                 # Utility libraries
│   └── package.json         # Frontend dependencies
├── backend/                 # Node.js + Express backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── routes/              # API endpoints
│   └── package.json         # Backend dependencies
├── shared/                  # Shared utilities and constants
│   └── constants.js         # Career data and quiz questions
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd career-guidance-app
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API
3. Create the following table in your Supabase database:

```sql
-- Create quiz_results table
CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  career_match TEXT NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own results
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy for users to insert their own results
CREATE POLICY "Users can insert own quiz results" ON quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Edit .env with your Supabase credentials
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
FRONTEND_URL=http://localhost:3000

# Start development server
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp env.local.example .env.local

# Edit .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start development server
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🎯 How It Works

### Career Assessment Algorithm

1. **Question Scoring**: Each quiz question has weighted scores for different careers
2. **Answer Processing**: User answers are processed to calculate career compatibility scores
3. **Career Matching**: The career with the highest total score becomes the user's match
4. **Result Generation**: Detailed career information including skills and personality traits

### Quiz Questions

The application includes 5 carefully crafted questions covering:
- Free time preferences
- Work environment preferences
- Problem-solving approaches
- Motivation factors
- Communication styles

### Career Database

Includes 8 career paths with detailed information:
- Software Engineer
- Data Scientist
- Marketing Manager
- Healthcare Professional
- Financial Analyst
- Designer
- Teacher
- Sales Representative

## 🔧 API Endpoints

### Quiz API (`/api/quiz`)

- `GET /data` - Get quiz questions and career data
- `POST /results` - Submit quiz answers and get results
- `GET /user/:userId` - Get user's quiz results
- `GET /all` - Get all quiz results (admin)

### Health Check

- `GET /health` - Server health status

## 🎨 Customization

### Adding New Careers

1. Edit `shared/constants.js`
2. Add career data to `CAREER_DATA` object
3. Update quiz questions with appropriate scoring

### Modifying Quiz Questions

1. Edit `shared/constants.js`
2. Modify `QUIZ_QUESTIONS` array
3. Update scoring weights for each option

### Styling Changes

- Modify `frontend/tailwind.config.js` for theme customization
- Edit `frontend/app/globals.css` for custom CSS
- Update component classes for layout changes

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel or your preferred hosting platform
```

### Backend (Railway/Heroku)

```bash
cd backend
npm run build
# Deploy to Railway, Heroku, or your preferred platform
```

### Environment Variables

Ensure all environment variables are set in your production environment:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `FRONTEND_URL` (production URL)

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Security Features

- **Row Level Security** in Supabase
- **CORS protection** on backend
- **Helmet.js** security headers
- **Protected routes** for authenticated users
- **Input validation** and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for database and authentication
- **Next.js** team for the amazing framework
- **TailwindCSS** for the utility-first CSS approach
- **Framer Motion** for smooth animations

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/yourusername/career-guidance-app/issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Happy Career Discovery! 🎯✨**
