import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Users, Globe, Code, Shield, Brain } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl px-4"
      >
        {/* Hero Section */}
        <div className="mb-12 space-y-6">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="mb-8 text-6xl font-bold font-heading bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"
          >
            Shaping the Future of Digital Content
          </motion.div>
          
          <p className="text-xl text-dark-300 dark:text-light-300 max-w-3xl mx-auto">
            At Chills Blogg, we believe that blogging should be more than just writing—it should be an experience. That’s why we’ve built a futuristic, modern, and intuitive platform that blends aesthetics with functionality
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Rocket size={40} />, title: "Innovation", desc: "Fresh, well-researched, and engaging content that keeps you informed and entertained." },
            { icon: <Globe size={40} />, title: "Global Reach", desc: "Read, like, comment, and bookmark your favorite posts. Let's create a space where ideas flow freely, and discussions thrive." },
            { icon: <Shield size={40} />, title: "Security", desc: "Enterprise-grade protection for all user data" },
            { icon: <Code size={40} />, title: "Technology", desc: "Leveraging cutting-edge AI and blockchain solutions" },
            { icon: <Brain size={40} />, title: "Knowledge", desc: "Curating expert-led educational content" },
            { icon: <Users size={40} />, title: "Community", desc: "2M+ strong global community of creators" },
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-primary-500 transition-all"
            >
              <div className="text-primary-600 dark:text-primary-400 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-dark-300 dark:text-light-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-primary-600/10 to-secondary-500/10 p-8 rounded-2xl mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-dark-300 dark:text-light-300 max-w-2xl mx-auto">
            To deliver accurate and good information to our community
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { number: "10M+", label: "Monthly Readers" },
            { number: "150+", label: "Countries Served" },
            { number: "500K+", label: "Active Readers" },
            { number: "99.9%", label: "Uptime Reliability" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card p-4"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-dark-300 dark:text-light-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/blog" className="btn btn-primary flex items-center">
            <Rocket size={20} className="mr-2" />
            Start Reading
          </Link>
          <Link to="/contact" className="btn btn-outline flex items-center">
            <Users size={20} className="mr-2" />
            Join Our Team
          </Link>
        </div>

        {/* Innovation Timeline */}
        <div className="mt-16 border-l-2 border-primary-500/30 pl-8 ml-4">
          <h2 className="text-2xl font-bold mb-8">Innovation Timeline</h2>
          {[
            { year: "2024", event: "AI Integration" },
            { year: "2023", event: "Global Community Expansion" },
            { year: "2022", event: "Building of followers" },
            { year: "2021", event: "Company Foundation" },
          ].map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-8 pl-6"
            >
              <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[2.1rem] top-2" />
              <h3 className="text-lg font-bold">{item.year}</h3>
              <p className="text-dark-300 dark:text-light-300">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;