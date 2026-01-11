import React, { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface AdBannerProps {
  label?: string;
  adUnitId?: string; // native banner ad unit (Android)
}

const AdBanner: React.FC<AdBannerProps> = ({ label = 'إعلان', adUnitId }) => {
  const isNative = (Capacitor.getPlatform && Capacitor.getPlatform() !== 'web');

  useEffect(() => {
    let admobPlugin: any = null;

    if (isNative) {
      // Try to initialize/show native banner using Capacitor AdMob plugin if present
      import('@capacitor-community/admob')
        .then((mod: any) => {
          admobPlugin = (mod && (mod.AdMob || mod.Admob || mod.default)) || mod;
          try {
            // initialize (if available) and show a banner
            admobPlugin.initialize?.({ requestTrackingAuthorization: true });
            console.log('[AdBanner] AdMob plugin loaded, attempting to show banner');
            admobPlugin.showBanner?.({
              adId: adUnitId || 'ca-app-pub-3940256099942544/6300978111', // test id by default
              adSize: 'BANNER',
              position: 'BOTTOM_CENTER',
            });
            console.log('[AdBanner] showBanner() called');
          } catch (e) {
            console.warn('[AdBanner] AdMob native showBanner failed', e);
          }
        })
        .catch((e) => {
          console.warn('[AdBanner] AdMob plugin not available', e);
        });

      return () => {
        try {
          admobPlugin?.hideBanner?.();
        } catch (e) {
          // ignore
        }
      };
    }

    // Web: try to push an AdSense slot if script exists
    const script = document.querySelector('script[src*="adsbygoogle.js"]');
    if (script) {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      try {
        (window as any).adsbygoogle.push({});
      } catch (e) {
        // ignore
      }
    }
  }, [isNative, adUnitId]);

  if (isNative) {
    // Native: the plugin will render the banner natively; show a small label for spacing
    return (
      <div style={{ width: '100%', textAlign: 'center', margin: 10 }}>
        <small style={{ color: '#888', fontSize: 12 }}>{label}</small>
      </div>
    );
  }

  // Web fallback: an AdSense slot (requires adsbygoogle script in index.html)
  return (
    <div style={{ width: '100%', textAlign: 'center', margin: 10 }}>
      <small style={{ color: '#888', fontSize: 12 }}>{label}</small>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '320px', height: '100px' }}
        data-ad-client="ca-pub-3272418713415911"
        data-ad-slot="2681630855"
      />
    </div>
  );
};

export default AdBanner;
