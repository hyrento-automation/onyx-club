import './globals.css';
import { GoogleTagManager } from '@next/third-parties/google';
export const metadata={metadataBase:new URL('https://www.onyxclub.ch'),title:{default:'Onyx Club | Sport · Lifestyle · Zen',template:'%s'},description:'Club privé de sport, lifestyle et bien-être au bord du lac Léman, à Cologny, Genève.',openGraph:{type:'website',siteName:'Onyx Club',locale:'fr_CH',url:'https://www.onyxclub.ch',images:[{url:'/images/og-onyx-club.jpg',width:1200,height:630,alt:'ONYX Club · Sport · Lifestyle · Zen'}]},twitter:{card:'summary_large_image',images:['/images/og-onyx-club.jpg']},robots:{index:true,follow:true}};
const gtmId=process.env.NEXT_PUBLIC_GTM_ID;
export default function Root({children}:{children:React.ReactNode}){return <html lang="fr">{gtmId&&/^GTM-[A-Z0-9]+$/.test(gtmId)&&<GoogleTagManager gtmId={gtmId}/>}<body>{children}</body></html>}
