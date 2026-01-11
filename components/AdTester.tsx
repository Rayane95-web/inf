import React, { useState } from 'react';

const AdTester: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const append = (msg: string) => setLogs(l => [new Date().toLocaleTimeString() + ' - ' + msg, ...l].slice(0, 30));

  const callPlugin = async (action: string) => {
    append(`Trying: ${action}`);
    try {
      const mod = await import('@capacitor-community/admob');
      const admob = mod && (mod.AdMob || mod.Admob || mod.default) || mod;
      if (!admob) throw new Error('AdMob plugin not exposed');

      switch (action) {
        case 'init':
          admob.initialize?.({ requestTrackingAuthorization: true });
          append('initialize() called');
          break;
        case 'showBanner':
          await admob.showBanner?.({ adId: 'ca-app-pub-3940256099942544/6300978111', adSize: 'BANNER', position: 'BOTTOM_CENTER' });
          append('showBanner() succeeded');
          break;
        case 'hideBanner':
          await admob.hideBanner?.();
          append('hideBanner() succeeded');
          break;
        case 'removeBanner':
          await admob.removeBanner?.();
          append('removeBanner() succeeded');
          break;
        case 'prepareInterstitial':
          await admob.prepareInterstitial?.({ adId: 'ca-app-pub-3940256099942544/1033173712' });
          append('prepareInterstitial() succeeded');
          break;
        case 'showInterstitial':
          await admob.showInterstitial?.();
          append('showInterstitial() succeeded');
          break;
        default:
          append('Unknown action');
      }
    } catch (e: any) {
      append('Error: ' + (e?.message || e));
      console.warn(e);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg w-72 text-right font-bold text-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">Ad Debug</div>
        <div className="text-emerald-600">DEV</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => callPlugin('init')} className="px-2 py-2 rounded-xl bg-emerald-50 text-emerald-700">Init</button>
        <button onClick={() => callPlugin('showBanner')} className="px-2 py-2 rounded-xl bg-blue-50 text-blue-700">Show Banner</button>
        <button onClick={() => callPlugin('hideBanner')} className="px-2 py-2 rounded-xl bg-gray-50 text-gray-700">Hide Banner</button>
        <button onClick={() => callPlugin('removeBanner')} className="px-2 py-2 rounded-xl bg-red-50 text-red-700">Remove Banner</button>
        <button onClick={() => callPlugin('prepareInterstitial')} className="col-span-2 px-2 py-2 rounded-xl bg-yellow-50 text-yellow-700">Prepare Interstitial</button>
        <button onClick={() => callPlugin('showInterstitial')} className="col-span-2 px-2 py-2 rounded-xl bg-pink-50 text-pink-700">Show Interstitial</button>
      </div>

      <div className="mt-3 max-h-40 overflow-auto text-xs text-gray-600 dark:text-gray-300">
        {logs.length === 0 ? (
          <div className="text-gray-400">Logs will appear here</div>
        ) : (
          <ul className="space-y-1">
            {logs.map((l, i) => (
              <li key={i} className="break-words">{l}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdTester;
