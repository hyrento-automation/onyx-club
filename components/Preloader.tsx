'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};
const hasSeenPreloader = () => sessionStorage.getItem('onyx') === '1';
const hasSeenPreloaderOnServer = () => false;

export default function Preloader() {
  const [out, setOut] = useState(false);
  const [finished, setFinished] = useState(false);
  const wasShown = useSyncExternalStore(subscribeToStorage, hasSeenPreloader, hasSeenPreloaderOnServer);
  const gone = wasShown || finished;
  useEffect(() => {
    if (wasShown) return;
    sessionStorage.setItem('onyx', '1');
    const a = setTimeout(() => setOut(true), 1800), b = setTimeout(() => setFinished(true), 2600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [wasShown]);
  if (gone) return null;
  return (
    <div className={'pre' + (out ? ' out' : '')} aria-hidden>
      <svg viewBox="0 0 100 100" width="120" height="120"><circle className="ring" cx="50" cy="50" r="40" /></svg>
      <b>ONYX</b>
    </div>
  );
}
