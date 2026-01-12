
import React, { useState, useEffect, useMemo } from 'react';
import { EducationStage, LevelType, AppState } from './types';
import { LEVEL_BRANCHES } from './constants';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import GradeInput from './components/GradeInput';
import AdBanner from './components/AdBanner';
import InfoTooltip from './components/InfoTooltip';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [calculationResult, setCalculationResult] = useState<{ result: string, progress: number } | null>(null);

  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('moroccan_calc_state_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('moroccan_calc_state_v1', JSON.stringify(state));
  }, [state]);

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const setStage = (stage: EducationStage) => {
    setState(prev => ({ ...prev, stage, level: null, branchId: null, grades: {} }));
    setShowResult(false);
  };

  const setLevel = (level: LevelType) => {
    const branches = LEVEL_BRANCHES[level] || [];
    setState(prev => ({ 
      ...prev, 
      level, 
      branchId: branches.length > 0 ? branches[0].id : null,
      grades: {} 
    }));
    setShowResult(false);
  };

  const setBranch = (branchId: string) => {
    setState(prev => ({ ...prev, branchId, grades: {} }));
    setShowResult(false);
  };

  const handleGradeChange = (subjectId: string, index: number, value: string) => {
    setState(prev => {
      const subjectGrades = [...(prev.grades[subjectId] || [])];
      while (subjectGrades.length <= index) subjectGrades.push('');
      subjectGrades[index] = value;
      return { ...prev, grades: { ...prev.grades, [subjectId]: subjectGrades } };
    });
    if (showResult) setShowResult(false);
  };

  const currentBranch = useMemo(() => {
    if (!state.level || !state.branchId) return null;
    return LEVEL_BRANCHES[state.level]?.find(b => b.id === state.branchId) || null;
  }, [state.level, state.branchId]);

  const handleCalculate = () => {
    if (!currentBranch) return;
    setIsCalculating(true);
    setShowResult(false);

    setTimeout(() => {
      let totalWeightedGrade = 0;
      let totalCoefficients = 0;
      let totalInputsNeeded = 0;
      let totalInputsFilled = 0;

      currentBranch.subjects.forEach(subject => {
        const count = 5;
        totalInputsNeeded += count;
        const grades = state.grades[subject.id] || [];
        const numericGrades = grades.map(g => parseFloat(g)).filter(n => !isNaN(n));
        totalInputsFilled += numericGrades.length;

        if (numericGrades.length > 0) {
          const avg = numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length;
          totalWeightedGrade += avg * subject.coefficient;
          totalCoefficients += subject.coefficient;
        }
      });

      const result = totalCoefficients > 0 ? totalWeightedGrade / totalCoefficients : 0;
      const progress = totalInputsNeeded > 0 ? (totalInputsFilled / totalInputsNeeded) * 100 : 0;
      
      setCalculationResult({
        result: result.toFixed(2),
        progress
      });
      setIsCalculating(false);
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  };

  if (loading) return <SplashScreen />;

  return (
    <Layout 
      isDarkMode={state.isDarkMode} 
      toggleDarkMode={toggleDarkMode}
      onOpenSettings={() => setIsSettingsOpen(true)}
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" dir="rtl">
        
        {/* Stage Selection */}
        <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            🏫 اختر المرحلة الدراسية
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(EducationStage).map((stage) => (
              <button
                key={stage}
                onClick={() => setStage(stage)}
                className={`p-4 rounded-2xl font-black transition-all active:scale-95 border-2 ${
                  state.stage === stage 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' 
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {stage === EducationStage.PRIMARY && '🎒 الابتدائي'}
                {stage === EducationStage.MIDDLE && '📐 الإعدادي'}
                {stage === EducationStage.HIGH && '🎓 الثانوي'}
                {stage === EducationStage.TOOLS && '🛠️ أدوات'}
              </button>
            ))}
          </div>
        </section>

        {/* Level Selection */}
        {state.stage && (
          <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl border border-gray-100 dark:border-gray-700 animate-in zoom-in-95">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              📚 اختر المستوى
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
                    className={`px-5 py-3 rounded-xl font-bold transition-all ${
                      state.level === level ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-900'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Branch / Division Selection */}
        {state.level && LEVEL_BRANCHES[state.level].length > 1 && (
          <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-xl border border-gray-100 dark:border-gray-700 animate-in zoom-in-95">
             <h2 className="text-xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              {state.stage === EducationStage.HIGH ? '🧬 اختر الشعبة (Division)' : '📑 اختر المسلك / النوع'}
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

        {/* Calculating State */}
        {isCalculating && (
          <div className="fixed inset-0 z-[200] bg-emerald-600/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-24 h-24 mb-8 relative">
              <div className="absolute inset-0 border-8 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">⏳</div>
            </div>
            <h2 className="text-3xl font-black mb-4">جاري تدقيق النقط... ✨</h2>
            <p className="max-w-xs font-bold opacity-80 mb-8">نحن نقوم الآن بحساب معدلك بدقة بناءً على معاملات وزارة التربية الوطنية 🇲🇦</p>
            <div className="w-full max-w-sm">
              <AdBanner label="إعلان - يرجى الانتظار" type="banner" />
            </div>
          </div>
        )}

        {currentBranch && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {currentBranch.subjects.map((subject) => (
                <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center font-black text-emerald-600">
                        {subject.coefficient}
                      </span>
                      <h3 className="font-black text-lg text-gray-900 dark:text-white">{subject.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <GradeInput
                        key={i}
                        value={state.grades[subject.id]?.[i] || ''}
                        onChange={(val) => handleGradeChange(subject.id, i, val)}
                        placeholder={`ف ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleCalculate}
                className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                <span>🚀 احسب النتيجة الآن</span>
                <span className="group-hover:rotate-12 transition-transform">🧮</span>
              </button>
            </div>

            {/* Result Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {showResult && calculationResult ? (
                  <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🏆</div>
                    <h3 className="text-xl font-black mb-2 opacity-90">معدلك النهائي ✨</h3>
                    <div className="text-7xl font-black tracking-tighter mb-4 flex items-baseline gap-2 animate-bounce">
                      {calculationResult.result}
                      <span className="text-xl opacity-60">/20</span>
                    </div>
                    <div className="p-4 bg-white/20 rounded-2xl text-sm font-bold">
                      {parseFloat(calculationResult.result) >= 10 ? "✅ تهانينا! لقد نجحت" : "⚠️ تحتاج لبذل مجهود أكبر"}
                    </div>
                    <button 
                      onClick={() => setShowResult(false)}
                      className="mt-6 w-full py-3 bg-black/20 hover:bg-black/30 rounded-xl font-black text-sm"
                    >
                      تعديل النقط 🔄
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-[2.5rem] p-8 text-center border-4 border-dashed border-gray-200 dark:border-gray-700 text-gray-400">
                    <div className="text-5xl mb-4 opacity-30">🤔</div>
                    <p className="font-black text-lg">أدخل نقطك ثم اضغط على زر الحساب لرؤية نتيجتك</p>
                  </div>
                )}
                <AdBanner type="banner" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
