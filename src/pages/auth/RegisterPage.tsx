import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../../components/forms/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
            <h1 className="text-2xl font-bold font-heading">
              Create Account
            </h1>
            <p className="mt-2 text-white/80">
              Join our community of writers and readers
            </p>
          </div>
          
          <div className="p-6">
            <RegisterForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;