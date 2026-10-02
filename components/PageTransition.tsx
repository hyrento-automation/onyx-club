'use client';
import { motion,useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
export default function PageTransition({children}:{children:React.ReactNode}){const reduced=useReducedMotion();const path=usePathname();return <motion.div key={path} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.45,ease:[.22,.61,.36,1]}}>{children}</motion.div>}
