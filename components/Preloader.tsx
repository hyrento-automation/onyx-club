'use client';
import { useEffect, useState } from 'react';
export default function Preloader() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('onyx')) { setGone(true); return; }
    sessionStorage.setItem('onyx', '1');
    const a = setTimeout(() => setOut(true), 1800), b = setTimeout(() => setGone(true), 2600);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (gone) return null;
  return (
    <div className={'pre' + (out ? ' out' : '')} aria-hidden>
      <svg viewBox="0 0 100 100" width="120" height="120"><circle className="ring" cx="50" cy="50" r="40" /></svg>
      <b>ONYX</b>
    </div>
  );
}
