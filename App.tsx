
import React, { useState, useEffect, useMemo } from 'react';
import { EducationStage, LevelType, AppState } from './types';
import { LEVEL_BRANCHES } from './constants';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import GradeInput from './components/GradeInput';
import AdBanner from './components/AdBanner';
import InfoTooltip from './components/InfoTooltip';

/**
 * Main App Component
 * Manages the global state for the Moroccan Grade Calculator.
 * Handles level selection, grade entry, and average calculations.
 */
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [state, setState] = useState<AppState>(() => {
    // Load state from local storage on initialization
    const saved = localStorage.getItem('moroccan_calc_state_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          // Ensure dark mode respects system if not set, or use saved value
          isDarkMode: parsed.isDarkMode !== undefined ? parsed.isDarkMode : window.matchMedia('(prefers-color-scheme: dark)').matches
        };
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      stage: null,
      level: null,
      branchId: null,
      grades: {},
      customSubjects: {},
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initial loading splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('moroccan_calc_state_v1', JSON.stringify(state));
  }, [state]);

  // Handle PWA installation
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  const setStage = (stage: EducationStage) => {
    setState(prev => ({ 
      ...prev, 
      stage, 
      level: null, 
      branchId: null, 
      grades: {} 
    }));
  };

  const setLevel = (level: LevelType) => {
    const branches = LEVEL_BRANCHES[level] || [];
    setState(prev => ({ 
      ...prev, 
      level, 
      branchId: branches.length > 0 ? branches[0].id : null,
      grades: {} 
    }));
  };

  const setBranch = (branchId: string) => {
    setState(prev => ({ ...prev, branchId, grades: {} }));
  };

  const handleGradeChange = (subjectId: string, index: number, value: string) => {
    setState(prev => {
      const subjectGrades = [...(prev.grades[subjectId] || [])];
      while (subjectGrades.length <= index) {
        subjectGrades.push('');
      }
      subjectGrades[index] = value;
      return {
        ...prev,
        grades: {
          ...prev.grades,
          [subjectId]: subjectGrades
        }
      };
    });
  };

  const currentBranch = useMemo(() => {
    if (!state.level || !state.branchId) return null;
    return LEVEL_BRANCHES[state.level]?.find(b => b.id === state.branchId) || null;
  }, [state.level, state.branchId]);

  const calculation = useMemo(() => {
    if (!currentBranch) return null;

    let totalWeightedGrade = 0;
    let totalCoefficients = 0;
    let totalInputsNeeded = 0;
    let totalInputsFilled = 0;

    currentBranch.subjects.forEach(subject => {
      const count = 5; // Always 5 inputs per subject now
      totalInputsNeeded += count;
      
      const grades = state.grades[subject.id] || [];
      const numericGrades = grades
        .map(g => parseFloat(g))
        .filter(n => !isNaN(n));

      totalInputsFilled += numericGrades.length;

      if (numericGrades.length > 0) {
        const avg = numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length;
        totalWeightedGrade += avg * subject.coefficient;
        totalCoefficients += subject.coefficient;
      }
    });

    const result = totalCoefficients > 0 ? totalWeightedGrade / totalCoefficients : 0;
    const progress = totalInputsNeeded > 0 ? (totalInputsFilled / totalInputsNeeded) * 100 : 0;
    
    return {
      result: result.toFixed(2),
      progress
    };
  }, [currentBranch, state.grades]);

  if (loading) return <SplashScreen />;

  return (
    <Layout 
      isDarkMode={state.isDarkMode} 
      toggleDarkMode={toggleDarkMode}
      onOpenSettings={() => setIsSettingsOpen(true)}
      onInstall={deferredPrompt ? handleInstall : undefined}
    >
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
        
        {/* Stage Selection */}
        <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            اختر المرحلة الدراسية
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(EducationStage).map((stage) => (
              <button
                key={stage}
                onClick={() => setStage(stage)}
                className={`p-4 rounded-2xl font-black transition-all active:scale-95 border-2 ${
                  state.stage === stage 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20' 
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-emerald-200 text-gray-700 dark:text-gray-300'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </section>

        {/* Level Selection */}
        {state.stage && (
          <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-500">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              اختر المستوى
            </h2>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(LEVEL_BRANCHES) as LevelType[]).map((level) => {
                const isMatch = (state.stage === EducationStage.PRIMARY && level.includes('ابتدائي')) ||
                                (state.stage === EducationStage.MIDDLE && level.includes('إعدادي')) ||
                                (state.stage === EducationStage.HIGH && (level.includes('باك') || level.includes('جذع مشترك'))) ||
                                (state.stage === EducationStage.TOOLS && (level === LevelType.CUSTOM || level === LevelType.CUSTOM_ENTRY || level === LevelType.GENERAL || level === LevelType.SPECIAL || level === LevelType.AUTHENTIC));

                if (!isMatch) return null;

                return (
                  <button
                    key={level}
                    onClick={() => setLevel(level)}
                    className={`px-5 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                      state.level === level 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Branch Selection (if multiple) */}
        {state.level && LEVEL_BRANCHES[state.level].length > 1 && (
          <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 animate-in zoom-in-95 duration-500">
             <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              اختر المسلك / النوع
            </h2>
            <div className="flex flex-wrap gap-3">
              {LEVEL_BRANCHES[state.level].map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => setBranch(branch.id)}
                  className={`px-5 py-3 rounded-xl font-bold transition-all active:scale-95 ${
                    state.branchId === branch.id 
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800'
                  }`}
                >
                  {branch.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Grades Input Area */}
        {currentBranch && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {currentBranch.subjects.map((subject) => (
                <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center font-black text-gray-400 dark:text-gray-500">
                        {subject.coefficient}
                      </span>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white">{subject.name}</h3>
                        <p className="text-xs font-bold text-gray-400">المعامل: {subject.coefficient}</p>
                      </div>
                    </div>
                    <InfoTooltip 
                      title="طريقة الحساب" 
                      content={`يتم حساب معدل هذه المادة عبر جمع جميع النقط المحصل عليها وقسمتها على عدد الفروض (5).`} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <GradeInput
                        key={i}
                        value={state.grades[subject.id]?.[i] || ''}
                        onChange={(val) => handleGradeChange(subject.id, i, val)}
                        placeholder={`نقطة ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Result Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-600/20 relative overflow-hidden group transition-all">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <h3 className="text-lg font-black mb-1 opacity-90">المعدل التوقعي</h3>
                  <div className="text-6xl font-black tracking-tighter mb-4 flex items-baseline gap-2">
                    {calculation?.result || "00.00"}
                    <span className="text-xl opacity-60">/20</span>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${calculation?.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs font-bold opacity-80">
                      تم إدخال {Math.round(calculation?.progress || 0)}% من النقط المطلوبة
                    </p>
                  </div>

                  <button 
                    onClick={() => {
                      if(confirm('هل تريد فعلاً مسح جميع النقط لهذا المسلك؟')) {
                        setState(prev => ({ ...prev, grades: {} }));
                      }
                    }}
                    className="mt-8 w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl font-black text-sm transition-all active:scale-95"
                  >
                    تفريغ جميع النقط
                  </button>
                </div>

                <AdBanner adSlot="7890123456" />

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 transition-colors">
                  <h4 className="font-black text-gray-900 dark:text-white mb-4">نصيحة ذكية 💡</h4>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed">
                    {parseFloat(calculation?.result || "0") >= 10 
                      ? "عمل جيد! استمر في التركيز على المواد ذات المعاملات المرتفعة لرفع معدلك أكثر وتحقيق ميزة دراسية."
                      : "لا تقلق، لا يزال بإمكانك تحسين النتيجة من خلال التركيز على الفروض القادمة والعمل الجاد في المواد الأساسية."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <AdBanner type="banner" />
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-[3rem] p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsSettingsOpen(false)} 
              className="absolute top-6 left-6 p-2 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">الإعدادات</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white">الوضع الليلي</h3>
                  <p className="text-xs font-bold text-gray-400">تغيير مظهر التطبيق</p>
                </div>
                <button 
                  onClick={toggleDarkMode}
                  className={`w-14 h-8 rounded-full transition-colors relative ${state.isDarkMode ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${state.isDarkMode ? 'right-7' : 'right-1'}`}></div>
                </button>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                <h3 className="font-black text-emerald-700 dark:text-emerald-400 text-sm mb-2">تطبيق الويب (PWA)</h3>
                <p className="text-xs font-bold text-emerald-600/70 dark:text-emerald-400/70 leading-relaxed">
                  يمكنك تثبيت هذا الموقع كمتصفح على هاتفك (أندرويد أو آيفون) ليعمل مثل التطبيقات العادية تماماً. اضغط على "إضافة إلى الشاشة الرئيسية" في خيارات متصفحك.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => {
                    if (confirm('هل أنت متأكد من مسح جميع البيانات المخزنة؟ هذا سيؤدي إلى تصفير جميع النقط والمعدلات.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="w-full py-4 text-red-500 font-black hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors"
                >
                  مسح جميع البيانات المخزنة
                </button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">
              v1.0.0 Moroccan Education System
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
