import { Cormorant_Garamond, Inter } from 'next/font/google';
import { getLang,getDict } from '@/lib/i18n';
import PageTransition from '@/components/PageTransition';
const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],variable:'--serif',display:'swap'});
const sans=Inter({subsets:['latin'],variable:'--sans',display:'swap'});
export const dynamicParams=false;
export function generateStaticParams(){return [{lang:'fr'},{lang:'en'}]}
export function generateMetadata({params}:{params:{lang:string}}){const lang=getLang(params.lang),d=getDict(lang);return {title:d.meta.title,description:d.meta.desc,alternates:{canonical:`/${lang}/`,languages:{'fr-CH':'/fr/','en':'/en/','x-default':'/fr/'}},openGraph:{title:d.meta.title,description:d.meta.desc,locale:lang==='fr'?'fr_CH':'en_GB',type:'website'}}}
export default function LanguageLayout({children,params}:{children:React.ReactNode;params:{lang:string}}){return <div lang={params.lang} className={`${serif.variable} ${sans.variable}`}><PageTransition>{children}</PageTransition></div>}
