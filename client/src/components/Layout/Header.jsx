import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Enable dark mode class on root <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow flex items-center justify-between">
      <h1 className="text-xl font-semibold">Task Tracker</h1>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          Logged in as: <span className="font-semibold">{currentUser?.name}</span>{' '}
          <span className="bg-white text-blue-600 px-2 py-0.5 ml-1 rounded-full text-xs capitalize">
            {currentUser?.role}
          </span>
        </div>

        <button
  onClick={logout}
  className="text-sm px-4 py-1.5 bg-white dark:bg-gray-100 text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-200"
>
  Logout
</button>


        {/* 🌙 Toggle Button now RIGHT of logout */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xs px-4 py-1.5 bg-white text-blue-600 rounded-full shadow hover:bg-gray-100 transition"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;
