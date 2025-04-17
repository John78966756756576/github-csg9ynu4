import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Globe, Lock, Shield, Palette, Volume2, Clock, Mail, ChevronRight } from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ThemeSetting {
  id: string;
  name: string;
  color: string;
}

const SettingsView = () => {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'daily-reminder',
      title: 'Daily Reminders',
      description: 'Get notified about your daily habits',
      enabled: true
    },
    {
      id: 'weekly-summary',
      title: 'Weekly Summary',
      description: 'Receive a weekly progress report',
      enabled: true
    },
    {
      id: 'milestone-alerts',
      title: 'Milestone Alerts',
      description: 'Get notified when you reach milestones',
      enabled: false
    }
  ]);

  const [selectedTheme, setSelectedTheme] = useState('green');
  const themes: ThemeSetting[] = [
    { id: 'green', name: 'Emerald', color: '#22c55e' },
    { id: 'blue', name: 'Ocean', color: '#3b82f6' },
    { id: 'purple', name: 'Amethyst', color: '#8b5cf6' },
    { id: 'orange', name: 'Sunset', color: '#f97316' }
  ];

  const [settings, setSettings] = useState({
    darkMode: true,
    soundEffects: true,
    emailUpdates: true,
    timezone: 'UTC',
    language: 'English'
  });

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Customize your Habit Flow experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-400">{notification.description}</p>
                  </div>
                  <motion.button
                    onClick={() => toggleNotification(notification.id)}
                    className={`w-12 h-6 rounded-full relative ${
                      notification.enabled ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                      initial={false}
                      animate={{ left: notification.enabled ? '1.5rem' : '0.125rem' }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Palette className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-lg font-semibold text-white">Theme</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-4 rounded-lg border-2 ${
                    selectedTheme === theme.id
                      ? 'border-[#22c55e]'
                      : 'border-[#2a2a2a]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="text-white">{theme.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-lg font-semibold text-white">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-white font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-400">Enable dark theme</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => toggleSetting('darkMode')}
                  className={`w-12 h-6 rounded-full relative ${
                    settings.darkMode ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                    animate={{ left: settings.darkMode ? '1.5rem' : '0.125rem' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-white font-medium">Sound Effects</h3>
                    <p className="text-sm text-gray-400">Enable sound feedback</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => toggleSetting('soundEffects')}
                  className={`w-12 h-6 rounded-full relative ${
                    settings.soundEffects ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                    animate={{ left: settings.soundEffects ? '1.5rem' : '0.125rem' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-white font-medium">Email Updates</h3>
                    <p className="text-sm text-gray-400">Receive email notifications</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => toggleSetting('emailUpdates')}
                  className={`w-12 h-6 rounded-full relative ${
                    settings.emailUpdates ? 'bg-[#22c55e]' : 'bg-[#2a2a2a]'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full absolute top-0.5"
                    animate={{ left: settings.emailUpdates ? '1.5rem' : '0.125rem' }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl border border-[#2a2a2a] p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Lock className="w-5 h-5 text-[#22c55e]" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <motion.button
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Change Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>

              <motion.button
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Login History</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SettingsView;