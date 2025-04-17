import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, MoreHorizontal, X } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'habit' | 'event';
  completed?: boolean;
  category?: string;
}

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Omit<Event, 'id'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<'habit' | 'event'>('event');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      time,
      type,
      category,
      completed: false
    });
    onClose();
    // Reset form
    setTitle('');
    setTime('');
    setType('event');
    setCategory('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Add New Event</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="event"
                      checked={type === 'event'}
                      onChange={(e) => setType(e.target.value as 'event' | 'habit')}
                      className="text-[#22c55e] bg-[#2a2a2a] border-[#3a3a3a]"
                    />
                    <span className="text-white">Event</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="habit"
                      checked={type === 'habit'}
                      onChange={(e) => setType(e.target.value as 'event' | 'habit')}
                      className="text-[#22c55e] bg-[#2a2a2a] border-[#3a3a3a]"
                    />
                    <span className="text-white">Habit</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#22c55e]"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Work">Work</option>
                  <option value="Personal Development">Personal Development</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:bg-[#2a2a2a]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-[#22c55e] text-black rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Event
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedView, setSelectedView] = useState<'month' | 'week'>('month');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Morning Meditation', time: '7:00', type: 'habit', completed: true, category: 'Wellness' },
    { id: 2, title: 'Workout Session', time: '8:00', type: 'habit', completed: false, category: 'Fitness' },
    { id: 3, title: 'Team Meeting', time: '10:00', type: 'event', category: 'Work' },
    { id: 4, title: 'Reading', time: '19:00', type: 'habit', completed: true, category: 'Personal Development' },
    { id: 5, title: 'Evening Run', time: '18:00', type: 'habit', completed: false, category: 'Fitness' },
  ]);

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    setEvents(prev => [...prev, { ...newEvent, id: prev.length + 1 }]);
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness':
        return 'bg-[#22c55e]';
      case 'Wellness':
        return 'bg-[#8b5cf6]';
      case 'Work':
        return 'bg-[#f97316]';
      case 'Personal Development':
        return 'bg-[#3b82f6]';
      default:
        return 'bg-gray-500';
    }
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
          <h1 className="text-2xl font-bold text-white">Calendar</h1>
          <p className="text-gray-400">Manage your habits and events</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-[#2a2a2a] rounded-lg p-1">
            <motion.button
              onClick={() => setSelectedView('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === 'month'
                  ? 'bg-[#22c55e] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={selectedView !== 'month' ? { scale: 1.05 } : {}}
              whileTap={selectedView !== 'month' ? { scale: 0.95 } : {}}
            >
              Month
            </motion.button>
            <motion.button
              onClick={() => setSelectedView('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedView === 'week'
                  ? 'bg-[#22c55e] text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={selectedView !== 'week' ? { scale: 1.05 } : {}}
              whileTap={selectedView !== 'week' ? { scale: 0.95 } : {}}
            >
              Week
            </motion.button>
          </div>
          <motion.button
            onClick={() => setIsAddEventModalOpen(true)}
            className="flex items-center space-x-2 bg-[#22c55e] text-black px-4 py-2 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Event</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-[#22c55e]" />
              <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            </h2>
            <div className="flex space-x-2">
              <motion.button
                onClick={prevMonth}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </motion.button>
              <motion.button
                onClick={nextMonth}
                className="p-2 hover:bg-[#2a2a2a] rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm text-gray-400 py-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isCurrentDay = isToday(day);
              const isSelectedDay = isSelected(day);
              
              return (
                <motion.button
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center relative
                    ${isCurrentDay ? 'bg-[#22c55e]' : ''}
                    ${isSelectedDay ? 'bg-[#2a2a2a]' : ''}
                    ${!isCurrentDay && !isSelectedDay ? 'hover:bg-[#2a2a2a]' : ''}
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className={`text-sm font-medium ${
                    isCurrentDay ? 'text-black' : 
                    isSelectedDay ? 'text-white' : 
                    'text-white'
                  }`}>
                    {day}
                  </span>
                  {events.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      <div className="w-1 h-1 rounded-full bg-[#22c55e]" />
                      <div className="w-1 h-1 rounded-full bg-[#f97316]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {selectedDate ? (
                `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`
              ) : (
                "Today's Schedule"
              )}
            </h2>
            <motion.button
              className="p-2 hover:bg-[#2a2a2a] rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
          
          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                className="p-4 rounded-lg bg-[#2a2a2a] relative overflow-hidden group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: events.indexOf(event) * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getCategoryColor(event.category || '')}`} />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-400">{event.time}</p>
                    </div>
                  </div>
                  {event.type === 'habit' && (
                    <div className="flex items-center space-x-2">
                      {event.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category || '')} bg-opacity-20 text-white`}>
                    {event.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAdd={handleAddEvent}
      />
    </motion.div>
  );
};

export default CalendarView;

export default CalendarView