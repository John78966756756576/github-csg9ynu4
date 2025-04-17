import React from 'react';
import { motion } from 'framer-motion';
import MetricCard from './MetricCard';
import Timeline from './Timeline';
import HabitGrid from './HabitGrid';

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Weekly Progress"
          value="76%"
          change="+12%"
          trend="up"
          color="text-[#22c55e]"
        />
        <MetricCard
          title="Current Streak"
          value="14"
          change="+2"
          trend="up"
          color="text-[#f97316]"
        />
        <MetricCard
          title="Completion Rate"
          value="89%"
          change="+5%"
          trend="up"
          color="text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-16rem)]">
        <motion.div 
          className="bg-[#1a1a1a]/80 backdrop-blur-lg p-6 rounded-xl border border-[#2a2a2a] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Habit Grid</h2>
          <div className="flex-1 overflow-auto">
            <HabitGrid />
          </div>
        </motion.div>
        <motion.div 
          className="bg-[#1a1a1a]/80 backdrop-blur-lg p-6 rounded-xl border border-[#2a2a2a] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Timeline</h2>
          <div className="flex-1 overflow-auto">
            <Timeline />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;