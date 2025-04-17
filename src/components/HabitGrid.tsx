import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const HabitGrid = () => {
  const days = Array.from({ length: 30 }, (_, i) => i);
  const habits = ['Exercise', 'Meditation', 'Reading', 'Writing', 'Coding', 'Language Learning'];
  const colors = ['#22c55e', '#f97316', '#ffffff', '#3b82f6', '#8b5cf6', '#ec4899'];

  // Get current date and previous dates
  const today = new Date();
  const dates = days.map(day => {
    const date = new Date();
    date.setDate(today.getDate() - (days.length - 1 - day));
    return date;
  });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Date headers */}
        <div className="flex mb-6 pl-32">
          {dates.map((date, index) => (
            <div
              key={index}
              className="w-12 text-center flex-shrink-0"
            >
              <div className="text-xs font-medium text-gray-400">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-sm mt-1 ${
                date.toDateString() === today.toDateString() 
                  ? 'text-[#22c55e] font-medium' 
                  : 'text-gray-400'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Habits grid */}
        <div className="space-y-6">
          {habits.map((habit, habitIndex) => (
            <motion.div
              key={habit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: habitIndex * 0.1 }}
              className="group"
            >
              <div className="flex items-center">
                <div className="w-32 flex-shrink-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-[#22c55e] transition-colors">
                    {habit}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.floor(Math.random() * 30) + 1} day streak
                  </p>
                </div>
                <div className="flex gap-2">
                  {days.map((day) => {
                    const completed = Math.random() > 0.3;
                    const isToday = day === days.length - 1;
                    
                    return (
                      <motion.button
                        key={`${habit}-${day}`}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center relative group/cell
                          ${completed 
                            ? `bg-${colors[habitIndex]}/20 hover:bg-${colors[habitIndex]}/30` 
                            : 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                          } transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: day * 0.02 }}
                        >
                          {completed ? (
                            <CheckCircle2 
                              className="w-6 h-6"
                              style={{ color: colors[habitIndex] }}
                            />
                          ) : (
                            <Circle 
                              className="w-6 h-6 text-gray-600"
                            />
                          )}
                        </motion.div>
                        
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/cell:opacity-100 transition-opacity pointer-events-none">
                          <div className="bg-[#2a2a2a] text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            {dates[day].toLocaleDateString('en-US', { 
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 pl-32">
                <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: colors[habitIndex] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.floor(Math.random() * 40 + 60)}%` }}
                    transition={{ duration: 1, delay: habitIndex * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HabitGrid;