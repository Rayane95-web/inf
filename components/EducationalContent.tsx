
import React from 'react';

const EducationalContent: React.FC = () => {
  return (
    <section className="mt-12 space-y-12 text-right">
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 border-b-4 border-emerald-500 pb-2 inline-block">
          دليل حساب المعدلات في المغرب 🇲🇦
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <article className="space-y-4">
            <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400">كيف يتم حساب معدل البكالوريا؟</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
              يعتمد نظام البكالوريا المغربي على دمج ثلاث نتائج أساسية بنسب متفاوتة:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-500 dark:text-gray-400 font-bold pr-2">
              <li><span className="text-emerald-500">50%</span> من المعدل العام مخصص للامتحان الوطني الموحد.</li>
              <li><span className="text-emerald-500">25%</span> من المعدل مخصص للامتحان الجهوي الموحد (السنة الأولى باك).</li>
              <li><span className="text-emerald-500">25%</span> المتبقية مخصصة للمراقبة المستمرة للسنة الثانية باك.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h3 className="text-xl font-black text-blue-600 dark:text-blue-400">نصائح لرفع معدل المراقبة المستمرة</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-bold">
              تعتبر المراقبة المستمرة فرصة ذهبية لضمان النجاح. ينصح بالتركيز على:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-500 dark:text-gray-400 font-bold pr-2">
              <li>المواظبة على الحضور والمشاركة الفعالة في القسم.</li>
              <li>إنجاز الفروض المنزلية والبحوث المطلوبة بدقة.</li>
              <li>الاستعداد الجيد للفروض المحروسة التي تمثل ثقلاً كبيراً في النقطة.</li>
            </ul>
          </article>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "نظام المعاملات",
            desc: "تختلف المعاملات حسب الشعبة؛ فالمواد العلمية لها معامل 7 في مسلك PC بينما العربية لها معامل 2.",
            icon: "⚖️"
          },
          {
            title: "الامتحان الإقليمي",
            desc: "للسادس ابتدائي، يركز على العربية، الفرنسية، والرياضيات لتقييم مكتسبات السلك الابتدائي.",
            icon: "📝"
          },
          {
            title: "مسار Massar",
            desc: "تطبيقنا متوافق مع منظومة مسار لضمان أن النتائج التي تحصل عليها هنا هي مطابقة للواقع.",
            icon: "🔗"
          }
        ].map((item, i) => (
          <div key={i} className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4 className="text-lg font-black text-emerald-800 dark:text-emerald-200 mb-2">{item.title}</h4>
            <p className="text-sm font-bold text-emerald-700/70 dark:text-emerald-400/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationalContent;
