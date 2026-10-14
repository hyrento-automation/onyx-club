import { Cormorant_Garamond, Inter } from 'next/font/google';
import { getLang,getDict } from '@/lib/i18n';
import PageTransition from '@/components/PageTransition';
const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],variable:'--serif',display:'swap'});
const sans=Inter({subsets:['latin'],variable:'--sans',display:'swap'});
export const dynamicParams=false;
export function generateStaticParams(){return [{lang:'fr'},{lang:'en'}]}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){const {lang:rawLang}=await params,lang=getLang(rawLang),d=getDict(lang);return {title:d.meta.title,description:d.meta.desc,openGraph:{title:d.meta.title,description:d.meta.desc,locale:lang==='fr'?'fr_CH':'en_GB',type:'website'}}}
export default async function LanguageLayout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}){const {lang}=await params;return <div lang={lang} className={`${serif.variable} ${sans.variable}`}><PageTransition>{children}</PageTransition></div>}
