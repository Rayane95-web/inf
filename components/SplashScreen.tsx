
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="relative w-48 h-48 mb-8 animate-in zoom-in duration-700">
        {/* Background Sparkles */}
        <div className="absolute -top-4 -right-4 text-2xl animate-pulse">✨</div>
        <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse delay-300">⭐</div>
        
        {/* Flag of Morocco */}
        <div className="absolute -top-4 -right-10 text-4xl transform -rotate-12 animate-bounce">🇲🇦</div>

        {/* Main Stack */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Graduation Cap */}
          <div className="text-7xl z-20 transform -translate-y-4 -rotate-6 filter drop-shadow-xl">🎓</div>
          
          {/* Calculator Visual Body */}
          <div className="w-32 h-36 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-gray-100 dark:border-gray-700 flex flex-col p-3 gap-2 -mt-10">
            {/* Screen */}
            <div className="w-full h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl font-mono">15.4</span>
            </div>
            {/* Keys */}
            <div className="grid grid-cols-2 gap-2 flex-1">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg"></div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg"></div>
              <div className="bg-red-500 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Pencil & Book Accents */}
        <div className="absolute -bottom-4 -right-6 text-4xl transform rotate-12">✏️</div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-red-600 rounded-full blur-2xl opacity-20"></div>
      </div>

      <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          حاسبة المعدلات
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-emerald-500"></span>
          <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg">المملكة المغربية</p>
          <span className="h-px w-8 bg-emerald-500"></span>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="mt-12 flex gap-1.5">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
