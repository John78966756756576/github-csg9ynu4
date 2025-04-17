import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, ChevronRight, Trophy, Star, Calendar } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  milestones: { id: number; title: string; completed: boolean }[];
  category: string;
  priority: 'High' | 'Medium' | 'Low';
}

const GoalsView = () => {
  const [goals] = useState<Goal[]>([
    {
      id: 1,
      title: "Run a Marathon",
      description: "Complete a full marathon in under 4 hours",
      deadline: "2024-12-31",
      progress: 65,
      category: "Fitness",
      priority: "High",
      milestones: [
        { id: 1, title: "Run 5km without stopping", completed: true },
        { id: 2, title: "Complete a half marathon", completed: true },
        { id: 3, title: "Train 4 times per week", completed: false },
        { id: 4, title: "Complete marathon preparation plan", completed: false }
      ]
    },
    {
      id: 2,
      title: "Learn Spanish",
      description: "Achieve B2 level in Spanish",
      deadline: "2024-09-30",
      progress: 40,
      category: "Education",
      priority: "Medium",
      milestones: [
        { id: 1, title: "Complete basic vocabulary", completed: true },
        { id: 2, title: "Practice daily conversations", completed: true },
        { id: 3, title: "Pass intermediate exam", completed: false }
      ]
    },
    {
      id: 3,
      title: "Launch Side Project",
      description: "Develop and launch a web application",
      deadline: "2024-06-30",
      progress: 25,
      category: "Career",
      priority: "High",
      milestones: [
        { id: 1, title: "Complete MVP design", completed: true },
        { id: 2, title: "Develop core features", completed: false },
        { id: 3, title: "Beta testing", completed: false },
        { id: 4, title: "Official launch", completed: false }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#22c55e';
    if (progress >= 50) return '#f97316';
    return '#3b82f6';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Goals</h1>
          <p className="text-gray-400">Track and manage your personal goals</p>
        </div>
        <motion.button
          className="flex items-center space-x-2 bg-[#22c55e] text-black px-4 py-2 rounded-lg font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span>New Goal</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center space-x-2 text-[#22c55e] mb-2">
            <Trophy className="w-5 h-5" />
            <h3 className="font-semibold">Achievement Rate</h3>
          </div>
          <p className="text-3xl font-bold text-white">78%</p>
          <p className="text-gray-400 text-sm">Goals completed this year</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 text-[#f97316] mb-2">
            <Star className="w-5 h-5" />
            <h3 className="font-semibold">Active Goals</h3>
          </div>
          <p className="text-3xl font-bold text-white">{goals.length}</p>
          <p className="text-gray-400 text-sm">Currently in progress</p>
        </motion.div>

        <motion.div
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 text-white mb-2">
            <Calendar className="w-5 h-5" />
            <h3 className="font-semibold">Upcoming Deadlines</h3>
          </div>
          <p className="text-3xl font-bold text-white">2</p>
          <p className="text-gray-400 text-sm">Goals due this month</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-[#22c55e]" />
                  <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(goal.priority)} text-white`}>
                    {goal.priority}
                  </span>
                </div>
                <p className="text-gray-400 mt-1">{goal.description}</p>
              </div>
              <motion.button
                className="p-2 hover:bg-[#2a2a2a] rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: getProgressColor(goal.progress) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm text-gray-400">Category</h4>
                  <p className="text-white">{goal.category}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm text-gray-400">Deadline</h4>
                  <p className="text-white">{new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-400 mb-2">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center space-x-2"
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${
                          milestone.completed ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                        }`}
                      />
                      <span className={`text-sm ${
                        milestone.completed ? 'text-gray-400 line-through' : 'text-white'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GoalsView;