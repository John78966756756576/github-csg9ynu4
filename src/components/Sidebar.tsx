import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Calendar, Settings, Activity, Target, TrendingUp, X } from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'progress', icon: Activity, label: 'Progress' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <motion.div 
      className="w-[280px] h-full bg-[#1a1a1a]/80 backdrop-blur-lg border-r border-[#2a2a2a] flex flex-col py-6"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <motion.div 
        className="px-6 mb-8 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold text-white">Habit Flow</span>
        </div>
        <motion.button
          onClick={onClose}
          className="p-2 hover:bg-[#2a2a2a] rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-gray-400" />
        </motion.button>
      </motion.div>

      <nav className="flex-1 px-4">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.id 
                ? 'text-[#22c55e] bg-[#2a2a2a]' 
                : 'text-gray-400 hover:text-[#22c55e] hover:bg-[#2a2a2a]'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * navItems.indexOf(item) }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick(item.id)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <motion.div 
        className="px-6 pt-6 border-t border-[#2a2a2a]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-[#2a2a2a] rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#22c55e]" />
            <span className="text-sm font-medium text-white">Weekly Progress</span>
          </div>
          <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#22c55e] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-400">
            75% of goals completed
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Sidebar