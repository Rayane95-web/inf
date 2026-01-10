
import React, { useEffect } from 'react';

interface AdBannerProps {
  label?: string;
  type?: 'banner' | 'inline' | 'interstitial';
  adSlot?: string; 
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  label = "إعلان", 
  type = 'banner',
  adSlot = "" // اتركها فارغة إذا لم تجدها، سيعتمد AdSense على التوزيع التلقائي أو سيظهر مساحة بيضاء حتى يتم القبول
}) => {
  
  const PUBLISHER_ID = "ca-pub-3272418713415911";

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`
      relative overflow-hidden transition-all duration-500 animate-in fade-in flex flex-col items-center
      ${type === 'banner' 
        ? 'w-full my-6 p-4 rounded-[2.5rem] bg-amber-50/20 dark:bg-amber-950/5 border-2 border-dashed border-amber-200/50 dark:border-amber-900/20' 
        : 'p-4 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800'}
    `}>
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
           <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">
             {label}
           </span>
        </div>
        <div className="text-[8px] text-gray-400 font-bold opacity-60">Google AdSense</div>
      </div>
      
      {/* AdSense Container */}
      <div className="w-full overflow-hidden flex justify-center min-h-[90px] bg-white/5 rounded-2xl">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client={PUBLISHER_ID}
             data-ad-slot={adSlot || undefined}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default AdBanner;
