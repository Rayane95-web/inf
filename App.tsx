
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { EducationStage, LevelType, AppState, Branch, Subject } from './types';
import { LEVEL_BRANCHES } from './constants';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import GradeInput from './components/GradeInput';
import AdBanner from './components/AdBanner';
import InfoTooltip from './components/InfoTooltip';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExitConfirmationOpen, setIsExitConfirmationOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isSharing, setIsSharing] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isShowingAd, setIsShowingAd] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [displayedAverage, setDisplayedAverage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('bac_calculator_state_v3');
    return saved ? JSON.parse(saved) : {
      stage: null,
      level: null,
      branchId: null,
      grades: {},
      customSubjects: {},
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
    };
  });

  const maxGrade = state.stage === EducationStage.PRIMARY ? 10 : 20;

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hasActiveContent = state.stage !== null || Object.keys(state.grades).length > 0;
    if (!hasActiveContent) return;

    setSaveStatus('saving');
    const saveTimer = setTimeout(() => {
      localStorage.setItem('bac_calculator_state_v3', JSON.stringify(state));
      setSaveStatus('saved');
      const resetTimer = setTimeout(() => setSaveStatus('idle'), 2000);
      return () => clearTimeout(resetTimer);
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [state]);

  useEffect(() => {
    setIsResultVisible(false);
    setDisplayedAverage(0);
  }, [state.branchId, state.level, state.stage]);

  useEffect(() => {
    let interval: any;
    if (isShowingAd && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isShowingAd, adTimer]);

  const STAGE_LEVELS: Record<EducationStage, LevelType[]> = {
    [EducationStage.PRIMARY]: [
      LevelType.PRIMARY_1, LevelType.PRIMARY_2, LevelType.PRIMARY_3,
      LevelType.PRIMARY_4, LevelType.PRIMARY_5, LevelType.PRIMARY_6
    ],
    [EducationStage.MIDDLE]: [LevelType.MIDDLE_1, LevelType.MIDDLE_2, LevelType.MIDDLE_3],
    [EducationStage.HIGH]: [LevelType.COMMON_CORE, LevelType.FIRST_BAC, LevelType.SECOND_BAC, LevelType.AUTHENTIC],
    [EducationStage.TOOLS]: [LevelType.GENERAL, LevelType.CUSTOM, LevelType.SPECIAL, LevelType.CUSTOM_ENTRY]
  };

  const currentSubjects = useMemo(() => {
    if (!state.level || !state.branchId) return [];
    if (state.customSubjects[state.branchId]) {
      return state.customSubjects[state.branchId];
    }
    const branch = LEVEL_BRANCHES[state.level].find(b => b.id === state.branchId);
    return branch?.subjects || [];
  }, [state.level, state.branchId, state.customSubjects]);

  const calculation = useMemo(() => {
    if (currentSubjects.length === 0) return { average: 0, totalCoeff: 0, count: 0 };
    let weightedSum = 0;
    let totalCoeff = 0;
    let count = 0;

    currentSubjects.forEach(subject => {
      const subjectGrades = state.grades[subject.id] || [];
      const validGrades = subjectGrades.filter(g => g !== '' && !isNaN(parseFloat(g)));
      
      if (validGrades.length > 0) {
        const subjectAvg = validGrades.reduce((sum, g) => sum + parseFloat(g), 0) / validGrades.length;
        weightedSum += subjectAvg * subject.coefficient;
        totalCoeff += subject.coefficient;
        count++;
      }
    });

    return { average: totalCoeff > 0 ? weightedSum / totalCoeff : 0, totalCoeff, count };
  }, [currentSubjects, state.grades]);

  const getSubjectAverage = (subjectId: string) => {
    const subjectGrades = state.grades[subjectId] || [];
    const validGrades = subjectGrades.filter(g => g !== '' && !isNaN(parseFloat(g)));
    if (validGrades.length === 0) return null;
    return validGrades.reduce((sum, g) => sum + parseFloat(g), 0) / validGrades.length;
  };

  const updateGrade = (subjectId: string, index: number, value: string) => {
    setIsResultVisible(false);
    setState(prev => {
      const currentSubjectGrades = [...(prev.grades[subjectId] || [])];
      while (currentSubjectGrades.length <= index) {
        currentSubjectGrades.push('');
      }
      currentSubjectGrades[index] = value;
      return {
        ...prev,
        grades: { ...prev.grades, [subjectId]: currentSubjectGrades }
      };
    });
  };

  const handleShowResult = () => {
    if (calculation.count === 0) {
      alert("يرجى إدخال نقطة واحدة على الأقل");
      return;
    }
    setAdTimer(3); // Reduced for better experience
    setIsShowingAd(true);
  };

  const closeAdAndShowResult = () => {
    setIsShowingAd(false);
    setIsResultVisible(true);
    
    // Count-up logic
    let start = 0;
    const end = calculation.average;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayedAverage(end);
        clearInterval(timer);
      } else {
        setDisplayedAverage(start);
      }
    }, 16);

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleBackup = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_bac_calculator_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json && typeof json === 'object') {
          setState(json);
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
          alert('تمت استعادة البيانات بنجاح!');
        }
      } catch (err) {
        alert('فشل استعادة البيانات. الملف غير صالح.');
      }
    };
    reader.readAsText(file);
  };

  const getResultColor = (avg: number) => {
    if (avg === 0 && calculation.count === 0) return 'text-gray-400';
    const threshold = maxGrade / 2;
    if (avg < threshold) return 'text-red-600 dark:text-red-400';
    if (avg < threshold + (maxGrade * 0.1)) return 'text-orange-600 dark:text-orange-400';
    return 'text-emerald-600 dark:text-emerald-400';
  };

  const getResultBg = (avg: number) => {
    if (avg === 0 && calculation.count === 0) return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    const threshold = maxGrade / 2;
    if (avg < threshold) return 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/30 border-red-200 dark:border-red-800/50';
    if (avg < threshold + (maxGrade * 0.1)) return 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/30 border-orange-200 dark:border-orange-800/50';
    return 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30 border-emerald-200 dark:border-emerald-800/50';
  };

  const handleHomeClick = () => {
    const hasGrades = (Object.values(state.grades) as string[][]).some(arr => arr.some(v => v !== ''));
    if (hasGrades) {
      setIsExitConfirmationOpen(true);
    } else {
      goHomeDirect();
    }
  };

  const goHomeDirect = () => {
    setState(prev => ({ ...prev, stage: null, level: null, branchId: null }));
    setIsExitConfirmationOpen(false);
  };

  const discardAndGoHome = () => {
    const clearedState = { ...state, stage: null, level: null, branchId: null, grades: {} };
    setState(clearedState);
    setIsExitConfirmationOpen(false);
  };

  const handleShareResult = async () => {
    if (isSharing) return;
    setIsSharing(true);
    const text = `معدلي هو ${calculation.average.toFixed(2)} / ${maxGrade}\nتم الحساب بواسطة حاسبة المعدلات المغربية 🇲🇦`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'نتيجتي الدراسية', text });
      } catch (e) {
        console.error(e);
      }
    } else {
      alert(text);
    }
    setIsSharing(false);
  };

  const handleAddCustomSubject = () => {
    if (!state.branchId) return;
    const newSubject: Subject = {
      id: `custom_${Date.now()}`,
      name: 'مادة جديدة',
      coefficient: 1,
      notesCount: 5
    };
    setState(prev => ({
      ...prev,
      customSubjects: {
        ...prev.customSubjects,
        [state.branchId!]: [...currentSubjects, newSubject]
      }
    }));
  };

  const handleUpdateCustomSubject = (id: string, updates: Partial<Subject>) => {
    if (!state.branchId) return;
    setState(prev => ({
      ...prev,
      customSubjects: {
        ...prev.customSubjects,
        [state.branchId!]: currentSubjects.map(s => s.id === id ? { ...s, ...updates } : s)
      }
    }));
  };

  const handleRemoveCustomSubject = (id: string) => {
    if (!state.branchId) return;
    const subject = currentSubjects.find(s => s.id === id);
    const subjectName = subject?.name || 'هذه المادة';
    if (!confirm(`هل أنت متأكد من حذف "${subjectName}"؟ سيتم مسح جميع النقاط المرتبطة بها.`)) return;
    setState(prev => ({
      ...prev,
      customSubjects: {
        ...prev.customSubjects,
        [state.branchId!]: currentSubjects.filter(s => s.id !== id)
      },
      grades: { ...prev.grades, [id]: [] }
    }));
  };

  const handleResetToDefault = () => {
    if (!state.branchId || !confirm('هل أنت متأكد من استعادة المواد الافتراضية لهذه الشعبة؟ سيتم حذف تخصيصاتك.')) return;
    setState(prev => {
      const newCustom = { ...prev.customSubjects };
      delete newCustom[state.branchId!];
      return { ...prev, customSubjects: newCustom, grades: {} };
    });
  };

  function SettingsModal() {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
          <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">الإعدادات والتخصيص</h3>
              </div>
            </div>
            <button onClick={() => setIsSettingsOpen(false)} className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors active:scale-90">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-8 space-y-10 overflow-y-auto max-h-[75vh] no-scrollbar text-right">
             <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b-2 border-emerald-500/10">
                   <h4 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-wider">إدارة مواد الشعبة</h4>
                   {state.branchId && state.customSubjects[state.branchId] && (
                     <button onClick={handleResetToDefault} className="text-xs font-black text-red-500">استعادة الافتراضي</button>
                   )}
                </div>
                {!state.branchId ? (
                  <p className="text-gray-400 font-bold text-sm">يرجى اختيار سلك وشعبة أولاً.</p>
                ) : (
                  <div className="space-y-3">
                    {currentSubjects.map((s) => (
                      <div key={s.id} className="grid grid-cols-[1fr_80px_80px_48px] gap-3 items-center bg-gray-50/80 dark:bg-gray-900/50 p-2 rounded-2xl">
                        <input className="w-full bg-transparent px-2 py-2 text-sm font-black dark:text-white outline-none" value={s.name} onChange={(e) => handleUpdateCustomSubject(s.id, { name: e.target.value })} />
                        <input type="number" step="0.5" className="bg-white dark:bg-gray-800 rounded-xl text-center font-black text-sm py-2" value={s.coefficient} onChange={(e) => handleUpdateCustomSubject(s.id, { coefficient: parseFloat(e.target.value) || 1 })} />
                        <input type="number" className="bg-white dark:bg-gray-800 rounded-xl text-center font-black text-sm py-2" value={s.notesCount || 1} onChange={(e) => handleUpdateCustomSubject(s.id, { notesCount: parseInt(e.target.value) || 1 })} />
                        <button onClick={() => handleRemoveCustomSubject(s.id)} className="text-red-500 px-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    ))}
                    <button onClick={handleAddCustomSubject} className="w-full py-3 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-2 border-dashed border-emerald-500/30 rounded-2xl font-black text-sm mt-2">إضافة مادة جديدة</button>
                  </div>
                )}
             </section>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-3xl flex items-center justify-between">
                   <span className="font-black text-sm">الوضع الليلي</span>
                   <button onClick={() => setState(p => ({ ...p, isDarkMode: !p.isDarkMode }))} className={`w-12 h-6 rounded-full relative ${state.isDarkMode ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${state.isDarkMode ? 'right-7' : 'right-1'}`}></div>
                   </button>
                </div>
                <div className="flex gap-2">
                   <button onClick={handleBackup} className="flex-1 bg-emerald-50/50 text-emerald-600 font-black text-xs rounded-2xl">تصدير</button>
                   <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-blue-50/50 text-blue-600 font-black text-xs rounded-2xl">استيراد</button>
                   <input type="file" ref={fileInputRef} onChange={handleRestore} accept=".json" className="hidden" />
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  function InterstitialAd() {
    return (
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-3">
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/20 animate-bounce">📈</div>
            <h2 className="text-2xl font-black text-white">يتم الآن تجهيز نتيجتك...</h2>
            <p className="text-gray-400 font-bold">شكراً لانتظارك ودعمك للتطبيق</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-[3rem] min-h-[300px] flex items-center justify-center overflow-hidden">
             <AdBanner label="إعلان بيني" />
          </div>
          <button 
            disabled={adTimer > 0} 
            onClick={closeAdAndShowResult} 
            className={`w-full py-5 rounded-3xl font-black text-lg transition-all transform active:scale-95 ${adTimer > 0 ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-500/20'}`}
          >
            {adTimer > 0 ? `انتظر ${adTimer} ثانية للنتيجة` : 'عرض النتيجة الآن 🚀'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout isDarkMode={state.isDarkMode} toggleDarkMode={() => setState(p => ({ ...p, isDarkMode: !p.isDarkMode }))} onOpenSettings={() => setIsSettingsOpen(true)}>
      {showSplash && <SplashScreen />}
      {isShowingAd && <InterstitialAd />}
      
      {!state.stage ? (
        <div className="max-w-2xl mx-auto space-y-8 py-10 animate-in fade-in zoom-in-95 duration-700 text-center">
          <AdBanner label="إعلان" />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">اختر سلكك الدراسي</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: EducationStage.PRIMARY, name: 'التعليم الابتدائي', icon: '🏫' },
              { id: EducationStage.MIDDLE, name: 'التعليم الإعدادي', icon: '🎒' },
              { id: EducationStage.HIGH, name: 'التعليم الثانوي', icon: '🎓' },
              { id: EducationStage.TOOLS, name: 'أدوات الحساب', icon: '🧮' },
            ].map(stage => (
              <button key={stage.id} onClick={() => setState(prev => ({ ...prev, stage: stage.id as EducationStage, level: null, branchId: null, grades: {} }))} className="group p-8 bg-white dark:bg-gray-800 rounded-[3rem] shadow-xl hover:shadow-2xl hover:border-emerald-500 border-4 border-transparent transition-all transform hover:-translate-y-1">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{stage.icon}</div>
                <h3 className="text-xl font-black text-gray-800 dark:text-white">{stage.name}</h3>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 pb-20">
          <div className="flex items-center justify-between">
             <button onClick={handleHomeClick} className="flex items-center gap-2 text-sm font-black text-gray-400 bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 hover:text-emerald-600 transition-colors">
               <span>الرجوع للرئيسية</span>
             </button>
             <div className="px-5 py-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-black border border-emerald-100 dark:border-emerald-800">{state.stage}</div>
          </div>

          <section className="bg-white dark:bg-gray-800 p-2 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex bg-gray-100/50 dark:bg-gray-900/50 p-2 rounded-[2.5rem] overflow-x-auto no-scrollbar">
              {STAGE_LEVELS[state.stage].map((lvl) => (
                <button key={lvl} onClick={() => setState(prev => ({ ...prev, level: lvl, branchId: null, grades: {} }))} className={`flex-1 min-w-max py-4 px-6 rounded-[2rem] text-sm font-black transition-all ${state.level === lvl ? 'bg-white dark:bg-gray-800 text-emerald-600 shadow-lg' : 'text-gray-500 opacity-60'}`}>{lvl}</button>
              ))}
            </div>
            <div className="mt-4 px-3 pb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {state.level && LEVEL_BRANCHES[state.level].map(branch => (
                <button key={branch.id} onClick={() => setState(prev => ({ ...prev, branchId: branch.id, grades: {} }))} className={`p-4 rounded-3xl text-right border-2 transition-all ${state.branchId === branch.id ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-transparent bg-gray-50 dark:bg-gray-900/50'}`}>
                  <span className={`font-black text-sm block ${state.branchId === branch.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-400'}`}>{branch.name}</span>
                </button>
              ))}
            </div>
          </section>

          {state.branchId && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-5">
              {currentSubjects.map((subject) => {
                const subjectAvg = getSubjectAverage(subject.id);
                const displayNotesCount = subject.notesCount || 5;
                const isCustom = subject.id.startsWith('custom_') || subject.id.startsWith('manual_');
                const isBranchCustomized = !!(state.branchId && state.customSubjects[state.branchId]);

                return (
                  <div key={subject.id} className="bg-white dark:bg-gray-800 p-8 rounded-[3rem] border-2 border-gray-100 dark:border-gray-700 space-y-6 transition-all hover:border-emerald-100 dark:hover:border-emerald-900/40 relative overflow-hidden">
                    {/* مؤشر بصري للتخصيص */}
                    {isBranchCustomized && (
                      <div className="absolute top-0 right-0 p-1.5 bg-emerald-500/10 rounded-bl-3xl">
                        {isCustom ? (
                          <svg className="w-4 h-4 text-emerald-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5 text-blue-500 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg text-gray-800 dark:text-white leading-tight">{subject.name}</h3>
                          {isCustom && (
                             <span className="bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">مخصصة</span>
                          )}
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 mt-1 uppercase tracking-widest">المعامل: {subject.coefficient}</span>
                      </div>
                      {subjectAvg !== null && (
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                          <span className="text-sm font-black text-emerald-700 dark:text-emerald-400">المعدل: {subjectAvg.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {Array.from({ length: displayNotesCount }).map((_, idx) => (
                        <GradeInput key={idx} value={(state.grades[subject.id] || [])[idx] || ''} onChange={(val) => updateGrade(subject.id, idx, val)} max={maxGrade} placeholder={`ن${idx+1}`} />
                      ))}
                    </div>
                  </div>
                );
              })}
              <AdBanner label="إعلان" />
              {!isResultVisible ? (
                <button onClick={handleShowResult} className="w-full py-10 mt-10 bg-emerald-600 text-white font-black text-3xl rounded-[3.5rem] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-500 active:scale-95 transition-all transform">حساب النتيجة النهائية 🧮</button>
              ) : (
                <div className={`mt-10 p-10 rounded-[4rem] shadow-2xl flex flex-col items-center gap-8 border-4 relative overflow-hidden animate-in zoom-in-95 duration-700 ${getResultBg(calculation.average)}`}>
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></div>
                  
                  {/* Success Celebration Elements */}
                  {calculation.average >= (maxGrade/2) && (
                    <div className="absolute inset-0 pointer-events-none">
                       <div className="absolute top-4 left-10 text-xl animate-bounce">✨</div>
                       <div className="absolute bottom-10 right-10 text-xl animate-bounce [animation-delay:0.5s]">🌟</div>
                       <div className="absolute top-1/2 left-4 text-xl animate-pulse">🎉</div>
                    </div>
                  )}

                  <div className="text-center relative z-10">
                     <p className="text-sm font-black text-gray-500 dark:text-gray-400 mb-2">المعدل العام المستحق</p>
                     <div className={`text-9xl font-black leading-none flex items-baseline justify-center gap-2 drop-shadow-sm ${getResultColor(calculation.average)}`}>
                        {displayedAverage.toFixed(2)}
                        <span className="text-3xl opacity-30">/ {maxGrade}</span>
                     </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 w-full sm:w-auto relative z-10">
                     <button onClick={handleShareResult} className="px-12 py-5 bg-emerald-600 text-white font-black text-xl rounded-full shadow-2xl transform active:scale-95 transition-all flex items-center justify-center gap-3">
                        <span>مشاركة النتيجة</span>
                        <span>📤</span>
                     </button>
                     <button onClick={() => { setIsResultVisible(false); setDisplayedAverage(0); }} className="text-xs font-black text-gray-400 hover:text-gray-600 underline">إعادة تعديل النقاط</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {isSettingsOpen && <SettingsModal />}
      {isExitConfirmationOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 w-full max-sm rounded-[3.5rem] p-12 text-center space-y-8 shadow-2xl">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-full mx-auto flex items-center justify-center text-4xl">💾</div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">هل تود حفظ النقاط قبل الخروج؟</h3>
            <div className="space-y-4">
              <button onClick={goHomeDirect} className="w-full py-5 bg-emerald-600 text-white font-black rounded-3xl shadow-lg">نعم، حفظ البيانات</button>
              <button onClick={discardAndGoHome} className="w-full py-5 bg-red-50 text-red-600 font-black rounded-3xl">لا، مسح البيانات</button>
              <button onClick={() => setIsExitConfirmationOpen(false)} className="w-full py-3 text-gray-400 font-bold">إلغاء</button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
         {saveStatus !== 'idle' && (
           <div className={`px-6 py-2.5 rounded-full text-[10px] font-black shadow-2xl animate-in slide-in-from-bottom-4 backdrop-blur-xl border border-white/20 transition-all ${saveStatus === 'saving' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
             {saveStatus === 'saving' ? 'جاري الحفظ التلقائي...' : 'تم الحفظ بنجاح ✓'}
           </div>
         )}
      </div>
    </Layout>
  );
};

export default App;
