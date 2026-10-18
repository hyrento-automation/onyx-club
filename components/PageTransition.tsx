'use client';
import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const subscribeToMotionPreference = (callback: () => void) => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  preference.addEventListener('change', callback);
  return () => preference.removeEventListener('change', callback);
};
const getMotionPreference = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotionPreference = () => false;

export default function PageTransition({children}:{children:React.ReactNode}) {
  const reduced = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);
  const path = usePathname();
  return <motion.div key={path} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .45, ease: [.22, .61, .36, 1] }}>{children}</motion.div>;
}
