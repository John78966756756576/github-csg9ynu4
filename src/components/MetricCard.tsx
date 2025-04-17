import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, color }) => {
  return (
    <motion.div
      className="bg-[#1a1a1a]/80 backdrop-blur-lg p-6 rounded-xl border border-[#2a2a2a] relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2a2a2a]/20"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      <h3 className="text-gray-400 text-sm relative z-10">{title}</h3>
      <div className="flex items-end space-x-2 mt-2 relative z-10">
        <motion.span 
          className={`text-3xl font-bold ${color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.span>
        <motion.div 
          className={`flex items-center space-x-1 ${trend === 'up' ? 'text-[#22c55e]' : 'text-red-500'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm">{change}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MetricCard;