
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        // Check if user is already logged in
        const userData = localStorage.getItem('userData');
        if (userData) {
          navigate('/');
        } else {
          navigate('/login');
        }
      }, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <div className="h-24 w-24 bg-blue-400 rounded-full opacity-20"></div>
          </div>
          <div className="relative h-24 w-24 mx-auto bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <Plane className="h-12 w-12 text-white animate-bounce" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white animate-fade-in">
            Atrika Flights
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-pulse text-slate-600 dark:text-slate-300">
              Loading your premium travel experience
            </div>
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
