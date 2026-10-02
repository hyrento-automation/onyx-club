import './globals.css';
export const metadata={metadataBase:new URL('https://onyxclub.ch'),title:{default:'Onyx Club | Sport · Lifestyle · Zen',template:'%s | Onyx Club'},description:'Club privé de sport, lifestyle et bien-être au bord du lac Léman, à Cologny, Genève.',openGraph:{type:'website',siteName:'Onyx Club',locale:'fr_CH',url:'https://onyxclub.ch'},robots:{index:true,follow:true}};
export default function Root({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
