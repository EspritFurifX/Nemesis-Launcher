"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LegalPageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  lastUpdated: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function LegalPageWrapper({ 
  children, 
  title, 
  subtitle,
  lastUpdated 
}: LegalPageWrapperProps) {
  return (
    <section className="pt-32 pb-20">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-dark-400 mb-8">
            Dernière mise à jour : {lastUpdated}
          </p>
        </motion.div>

        {/* Intro */}
        {subtitle && (
          <motion.div 
            variants={itemVariants}
            className="bg-dark-900 border-4 border-dark-700 p-6 mb-8"
          >
            <p className="text-dark-300">{subtitle}</p>
          </motion.div>
        )}

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

// Section wrapper for legal pages
export function LegalSection({ 
  title, 
  number,
  children 
}: { 
  title: string; 
  number: number;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-nemesis-400">
        {number}. {title}
      </h2>
      {children}
    </motion.section>
  );
}
