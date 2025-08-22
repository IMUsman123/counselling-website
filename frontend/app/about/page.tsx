'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, TrendingUp, BookOpen, Shield, Zap, Sparkles, CheckCircle, Star, Globe, Code, Database } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: Target,
      title: 'Personalized Assessment',
      description: 'Our quiz uses advanced algorithms to analyze your personality, interests, and preferences to find the perfect career match.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Career Database',
      description: 'Access comprehensive information about various careers, including required skills, personality traits, and growth opportunities.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth Insights',
      description: 'Understand the skills and traits needed to excel in your chosen field and plan your professional development.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'Get recommendations for courses, certifications, and resources to develop the skills for your dream career.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information and quiz results are kept secure and private using industry-standard security measures.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Fast & Accurate',
      description: 'Get your career match results in minutes with our optimized assessment system.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const team = [
    {
      name: 'Career Guidance Experts',
      role: 'Assessment Design',
      description: 'Our team of career counselors and psychologists designed the assessment to provide accurate career matches.',
      icon: Users,
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Technology Specialists',
      role: 'Platform Development',
      description: 'Experienced developers built a secure, scalable platform to deliver the best user experience.',
      icon: Code,
      color: 'from-green-500 to-blue-500'
    },
    {
      name: 'Data Analysts',
      role: 'Career Research',
      description: 'Professionals who continuously research and update our career database with the latest industry information.',
      icon: Database,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const technologies = [
    { name: 'Frontend', tech: 'Next.js, React, TypeScript, TailwindCSS', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { name: 'Backend', tech: 'Node.js, Express, MVC Architecture', icon: Database, color: 'from-green-500 to-emerald-500' },
    { name: 'Database', tech: 'Supabase, PostgreSQL, Real-time Auth', icon: Globe, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen overflow-hidden" ref={containerRef}>
      {/* Floating Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Hero Section */}
      <section className="relative text-center py-32 px-4">
        <motion.div
          style={{ y, opacity }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">About CareerGuide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            About
            <span className="text-gradient block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              CareerGuide
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            We're passionate about helping individuals discover their perfect career path through 
            intelligent assessment, comprehensive career data, and personalized guidance.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-4 bg-white/50 backdrop-blur-sm relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600 text-sm font-medium">Our Mission</span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Empowering Career Discovery
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto"
            >
              At CareerGuide, we believe everyone deserves to find a career that brings them 
              fulfillment and success. Our mission is to bridge the gap between individual potential 
              and career opportunities through intelligent assessment technology and comprehensive 
              career insights.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-blue-500" />
              <span className="text-blue-600 text-sm font-medium">What Makes Us Different</span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Innovation Meets Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines scientific assessment methods with comprehensive career data 
              to provide you with the most accurate career guidance available.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <motion.div
                  className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-purple-600 text-sm font-medium">Our Team</span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Meet the Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the professionals behind CareerGuide who are dedicated to helping you find your perfect career path.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <motion.div
                  className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-24 h-24 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <member.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="text-orange-600 text-sm font-medium">Built with Modern Technology</span>
            </motion.div>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Cutting-Edge Tech Stack
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              CareerGuide is built using cutting-edge technologies including Next.js, Supabase, 
              and advanced algorithms to ensure fast, secure, and accurate career assessments.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">{tech.name}</h3>
                  <p className="text-gray-600">{tech.tech}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Discover Your Career Path?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Join thousands of users who have found their perfect career match through our platform.
              Start your journey today and unlock your potential.
            </p>
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-5 px-10 rounded-2xl text-xl transition-colors duration-200 inline-flex items-center shadow-2xl"
              >
                Get Started Today
                <Sparkles className="ml-3 w-6 h-6" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

