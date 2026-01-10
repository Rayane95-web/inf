
import React, { useState, useEffect } from 'react';

interface GradeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  max?: number;
}

const GradeInput: React.FC<GradeInputProps> = ({ value, onChange, placeholder = "--", max = 20 }) => {
  const [isChanging, setIsChanging] = useState(false);
  const numericValue = parseFloat(value) || 0;

  useEffect(() => {
    // Trigger animation only on valid changes that aren't clearing the field
    if (value !== '') {
      setIsChanging(true);
      const timer = setTimeout(() => setIsChanging(false), 600); // زيادة المدة لوضوح التأثير
      return () => clearTimeout(timer);
    }
  }, [value]);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = Math.min(max, numericValue + 0.25);
    onChange(newValue.toFixed(2));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = Math.max(0, numericValue - 0.25);
    onChange(newValue.toFixed(2));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && num <= max) {
      onChange(val);
    }
  };

  return (
    <div className={`
      relative flex items-center border-2 rounded-2xl overflow-hidden 
      transition-all duration-500 ease-out
      focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:border-emerald-500
      ${isChanging 
        ? 'border-emerald-500 dark:border-emerald-400 scale-[1.05] shadow-xl shadow-emerald-500/25 z-10 bg-emerald-50 dark:bg-emerald-900/40 ring-4 ring-emerald-500/10' 
        : 'border-gray-100 dark:border-gray-800 scale-100 shadow-none z-0 bg-gray-50 dark:bg-gray-900'}
    `}>
      <input
        type="number"
        step="0.25"
        min="0"
        max={max}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          w-full text-center bg-transparent border-none outline-none font-mono text-sm font-black py-3
          dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          transition-colors duration-300
          ${isChanging ? 'text-emerald-700 dark:text-emerald-300' : ''}
        `}
      />
      
      <div className="absolute inset-y-0 left-0 flex flex-col border-r border-gray-100 dark:border-gray-800/50">
        <button 
          onClick={handleIncrement} 
          className="flex-1 px-2 text-[12px] bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 transition-colors font-bold"
          aria-label="زيادة"
        >
          +
        </button>
        <button 
          onClick={handleDecrement} 
          className="flex-1 px-2 text-[12px] bg-red-50/50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors font-bold border-t border-gray-100 dark:border-gray-800/50"
          aria-label="نقصان"
        >
          -
        </button>
      </div>

      {/* Floating particles effect on change */}
      {isChanging && (
        <>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1 right-2 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
        </>
      )}

      {/* Shimmer line during change inside the box */}
      {isChanging && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] pointer-events-none opacity-50"></div>
      )}
    </div>
  );
};

export default GradeInput;
