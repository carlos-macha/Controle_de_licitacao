import { useEffect, useState } from 'react';
import ConfigIni, { IConfigPropsPortal } from '../services/configini';

export function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [latencia, setLatencia] = useState<number | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    ConfigIni.getInstance().iniFactory<IConfigPropsPortal>('PORTAL').then(cfg => {
      setBaseUrl(cfg.WSCommandBaseUrl);
      console.log(baseUrl)
    });
  }, []);

  useEffect(() => {
    if (!baseUrl) return;
    const onOnline = () => { setOnline(true); medirLatencia(baseUrl); };
    const onOffline = () => { setOnline(false); setLatencia(null); };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    medirLatencia(baseUrl);
    const interval = setInterval(() => medirLatencia(baseUrl), 5000);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(interval);
    };
  }, [baseUrl]);

  async function medirLatencia(url: string) {
    const inicio = performance.now();

    try {
      await fetch(`${url}/mobile/echo`, { method: 'GET', cache: 'no-store', });
      setLatencia(Math.round(performance.now() - inicio));
      setOnline(true);
    } catch {
      setLatencia(null);
      setOnline(false);
    }
  }

  return {
    online,
    latencia,
    conexaoLenta: latencia !== null && latencia > 1000,
  };
}