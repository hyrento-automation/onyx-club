import './globals.css';
import ConsentManager from '@/components/ConsentManager';
export const metadata={metadataBase:new URL('https://www.onyxclub.ch'),title:{default:'Onyx Club | Sport · Lifestyle · Zen',template:'%s'},description:'Club privé de sport, lifestyle et bien-être au bord du lac Léman, à Cologny, Genève.',openGraph:{type:'website',siteName:'Onyx Club',locale:'fr_CH',url:'https://www.onyxclub.ch',images:[{url:'/images/og-onyx-club.jpg',width:1200,height:630,alt:'ONYX Club · Sport · Lifestyle · Zen'}]},twitter:{card:'summary_large_image',images:['/images/og-onyx-club.jpg']},robots:{index:true,follow:true}};
const gtmId=process.env.NEXT_PUBLIC_GTM_ID||'GTM-5XPXSDZM';
const googleTagId=process.env.NEXT_PUBLIC_GA_ID||'G-ZNQWEXVB62';
export default function Root({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}<ConsentManager gtmId={gtmId&&/^GTM-[A-Z0-9]+$/.test(gtmId)?gtmId:undefined} googleTagId={googleTagId&&/^G-[A-Z0-9]+$/.test(googleTagId)?googleTagId:undefined}/></body></html>}
