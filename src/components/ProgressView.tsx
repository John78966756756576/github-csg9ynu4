import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Flame, Target, BarChart3, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ProgressView = () => {
  const habits = [
    { 
      id: 1,
      name: 'Morning Meditation',
      streak: 14,
      completion: 92,
      trend: 'up',
      change: '+8%',
      history: [65, 70, 85, 82, 90, 88, 92]
    },
    { 
      id: 2,
      name: 'Exercise',
      streak: 7,
      completion: 78,
      trend: 'up',
      change: '+12%',
      history: [45, 52, 60, 65, 70, 75, 78]
    },
    { 
      id: 3,
      name: 'Reading',
      streak: 5,
      completion: 65,
      trend: 'down',
      change: '-5%',
      history: [70, 72, 68, 65, 63, 64, 65]
    }
  ];

  const achievements = [
    {
      id: 1,
      title: '7 Day Streak',
      description: 'Maintained a habit for 7 consecutive days',
      icon: Flame,
      color: '#f97316',
      achieved: true
    },
    {
      id: 2,
      title: 'Early Bird',
      description: 'Completed morning routine for 30 days',
      icon: Calendar,
      color: '#8b5cf6',
      achieved: true
    },
    {
      id: 3,
      title: 'Consistency King',
      description: 'Achieved 90% completion rate',
      icon: Target,
      color: '#22c55e',
      achieved: false
    }
  ];

  const renderChart = (history: number[]) => {
    const max = Math.max(...history);
    const points = history.map((value, index) => {
      const x = (index / (history.length - 1)) * 100;
      const y = (value / max) * 100;
      return `${x},${100 - y}`;
    }).join(' ');

    return (
      <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Progress Analytics</h1>
        <p className="text-gray-400">Track your habit development and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center space-x-2 text-[#22c55e] mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Overall Progress</h3>
          </div>
          <p className="text-3xl font-bold text-white">78%</p>
          <p className="text-gray-400 text-sm">Average completion rate</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 text-[#f97316] mb-2">
            <Flame className="w-5 h-5" />
            <h3 className="font-semibold">Best Streak</h3>
          </div>
          <p className="text-3xl font-bold text-white">14 days</p>
          <p className="text-gray-400 text-sm">Morning Meditation</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-[#8b5cf6] mb-2">
            <Award className="w-5 h-5" />
            <h3 className="font-semibold">Achievements</h3>
          </div>
          <p className="text-3xl font-bold text-white">2/3</p>
          <p className="text-gray-400 text-sm">Milestones reached</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2 bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-lg font-semibold text-white">Habit Performance</h2>
            </div>
          </div>

          <div className="space-y-6">
            {habits.map((habit) => (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{habit.name}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">Current streak:</span>
                      <span className="text-[#f97316]">{habit.streak} days</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {habit.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-[#22c55e]" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={habit.trend === 'up' ? 'text-[#22c55e]' : 'text-red-500'}>
                      {habit.change}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  {renderChart(habit.history)}
                  <div className="absolute inset-0 flex items-center justify-end pr-2">
                    <span className="text-2xl font-bold text-white">{habit.completion}%</span>
                  </div>
                </div>

                <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#22c55e] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${habit.completion}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-[#22c55e]" />
            <h2 className="text-lg font-semibold text-white">Achievements</h2>
          </div>

          <div className="space-y-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  achievement.achieved ? 'bg-[#2a2a2a]' : 'bg-[#2a2a2a]/50'
                } relative overflow-hidden group`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: achievement.color }}
                  >
                    <achievement.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                </div>
                {achievement.achieved && (
                  <div className="absolute top-2 right-2">
                    <Award className="w-5 h-5 text-[#22c55e]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressView;