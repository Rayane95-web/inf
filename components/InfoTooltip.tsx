
import React, { useState, useRef, useEffect } from 'react';

interface InfoTooltipProps {
  content: string;
  title?: string;
  className?: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, title, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`relative inline-block ${className}`} ref={tooltipRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all active:scale-90"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-[100] bottom-full right-0 mb-3 w-64 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200">
          <div className="absolute bottom-0 right-2 translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700"></div>
          {title && <h5 className="text-xs font-black text-emerald-600 dark:text-emerald-400 mb-1.5">{title}</h5>}
          <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300 leading-relaxed text-right">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
