
import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenSettings: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleDarkMode, onOpenSettings }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_v1');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent_v1', 'accepted');
    setShowCookieConsent(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">🇲🇦</div>
              <h1 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">حاسبة المعدلات</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all active:scale-90"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 18v1m9-9h1M4 12H3m15.364-6.364l.707-.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l-.707-.707" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              <button
                onClick={onOpenSettings}
                className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all active:scale-90"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8">
          {children}
        </main>

        <footer className="py-12 px-4 text-center border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-right">
              <p className="font-black text-gray-800 dark:text-white">حاسبة المعدلات – المغرب 🇲🇦</p>
              <p className="mt-1 opacity-70">أداة تعليمية مستقلة لمساعدة التلاميذ والطلاب</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 font-bold">
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-emerald-600 transition-colors">سياسة الخصوصية</button>
              
              <a 
                href="https://www.instagram.com/9attos.2/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600 transition-all text-pink-600 dark:text-pink-400"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>المطورون</span>
              </a>

              <a href="mailto:asmar1samar2@gmail.com" className="hover:text-emerald-600 transition-colors">الدعم الفني</a>
            </div>
          </div>
        </footer>

        {/* Modal سياسة الخصوصية */}
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[3rem] p-10 max-h-[85vh] overflow-y-auto relative text-right shadow-2xl">
              <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-8 left-8 p-2.5 bg-gray-100 dark:bg-gray-700 rounded-2xl hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white border-b-4 border-emerald-500 pb-4 inline-block">سياسة الخصوصية وملفات تعريف الارتباط</h2>
                
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
                  <section>
                    <h3 className="text-emerald-600 dark:text-emerald-400 text-lg mb-2">1. جمع البيانات</h3>
                    <p>نحن لا نجمع أي بيانات شخصية مباشرة. جميع النقاط والمعدلات التي تدخلها تُحفظ فقط في متصفحك (Local Storage) ولا تُرسل إلى خوادمنا أبداً.</p>
                  </section>

                  <section>
                    <h3 className="text-emerald-600 dark:text-emerald-400 text-lg mb-2">2. جوجل أدسنس (Google AdSense)</h3>
                    <p>نستخدم جوجل كطرف ثالث لتزويد الإعلانات. تستخدم جوجل ملفات تعريف الارتباط (Cookies) لعرض الإعلانات بناءً على زياراتك السابقة لهذا الموقع أو المواقع الأخرى.</p>
                    <p className="mt-2">يسمح استخدام جوجل لملف تعريف الارتباط DART بعرض الإعلانات للمستخدمين بناءً على زيارتهم لمواقعنا ومواقع أخرى على الإنترنت.</p>
                  </section>

                  <section>
                    <h3 className="text-emerald-600 dark:text-emerald-400 text-lg mb-2">3. ملفات تعريف الارتباط</h3>
                    <p>يمكنك اختيار تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك الخاص، أو من خلال زيارة سياسة خصوصية شبكة إعلانات جوجل ومحتواها.</p>
                  </section>

                  <section>
                    <h3 className="text-emerald-600 dark:text-emerald-400 text-lg mb-2">4. الموافقة</h3>
                    <p>باستخدامك لتطبيقنا، فإنك توافق على سياسة الخصوصية الخاصة بنا وعلى شروطنا.</p>
                  </section>
                </div>

                <p className="pt-6 border-t text-xs font-black opacity-40">تاريخ التحديث: {new Date().toLocaleDateString('ar-MA')}</p>
              </div>
            </div>
          </div>
        )}

        {/* شريط الموافقة على الكوكيز */}
        {showCookieConsent && (
          <div className="fixed bottom-6 left-6 right-6 z-[90] animate-in slide-in-from-bottom-10 duration-500">
            <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl border border-white/20 dark:border-gray-700/50 p-6 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-right">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-2xl">🍪</div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 dark:text-white">نحن نستخدم ملفات تعريف الارتباط</h4>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">لتحسين تجربتك وعرض إعلانات ملائمة اهتماماتك عبر Google AdSense.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={handleAcceptCookies} className="flex-1 md:flex-none px-8 py-3 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20">أوافق</button>
                <button onClick={() => setIsPrivacyOpen(true)} className="flex-1 md:flex-none px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-black rounded-2xl hover:bg-gray-200 transition-colors">التفاصيل</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
