import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import WhatsAppButton from "./WhatsAppButton";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

// Page réservée à la publicité Meta : pas dans le menu, pas indexée par Google.
// GTM doit être chargé sur cette page (c'est automatique s'il est dans le layout racine du site).
export const metadata: Metadata = {
  title: "Votre séance découverte offerte | ONYX Club Cologny",
  robots: { index: false, follow: false },
};

// L'OFFRE : séance découverte offerte, validée par Sabrina le 06.11.
const OFFER = "Votre séance découverte est offerte";
// ───────────────────────────────────────────────────────────────────────────
// Règles de contenu (dossier ONYX) :
// - Une seule page pour les 3 pubs (vidéo « lieu », vidéo « sports », statique) :
//   le titre reprend ce qu'elles ont toutes en commun, le lac et Cologny.
// - La page vend la VISITE, jamais l'abonnement : aucun prix, aucune promo sur l'abonnement.
// - Pas de date de fin : le code doit rester valable pour ceux qui viennent des semaines plus tard.
// - Le bouton doit rester visible sans faire défiler sur téléphone : il est juste sous l'offre.

export default function EssaiPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} min-h-screen bg-[#070707] text-[#F2EBE3]`}>
      <main className="max-w-[560px] mx-auto px-4 pt-6 sm:pt-10 pb-36 sm:pb-24 leading-normal">
        <h1 className="font-serif text-[26px] sm:text-[32px] leading-[1.18] mb-4 text-[#F2EBE3] tracking-[-0.02em]">
          Votre salle de sport au bord du lac, à Cologny.
        </h1>

        <div className="border border-[#b87333]/50 bg-[#12100E] rounded-xl py-3.5 px-4 mb-3.5 text-center shadow-[0_4px_24px_rgba(184,115,51,0.08)]">
          <p className="text-[17px] sm:text-[18px] font-bold m-0 text-[#F2EBE3]">🎁 {OFFER}</p>
          <p className="mt-1 text-sm sm:text-base text-[#d4c5b5] m-0">Dites-nous le code ONYXLAC</p>
        </div>

        <WhatsAppButton />

        <p className="text-[14px] sm:text-[15px] text-[#a89f96] mt-2.5 mb-7 text-center leading-snug">
          Un clic ouvre WhatsApp, message déjà prêt.
          <br />
          On vous répond tout de suite.
        </p>

        <p className="font-bold mb-2.5 text-[15px] sm:text-base text-[#F2EBE3]">Ce qui vous attend</p>
        <ul className="pl-5 mb-7 space-y-2 text-[#d4c5b5] text-[14px] sm:text-[15px] leading-relaxed list-disc marker:text-[#b87333]">
          <li>Vue sur le Léman, de la lumière, et jamais d’attente devant une machine</li>
          <li>Pilates, yoga, boxe, danse, running, mobilité… et plus encore</li>
          <li>Des cours en petit groupe : jamais plus de 8 personnes</li>
          <li>Un esprit de communauté : on s’entraîne ensemble et on partage de bons moments</li>
          <li>Une salle en accès libre</li>
        </ul>

        <p className="text-xs sm:text-sm text-[#a89f96] mt-4 text-center">
          ONYX Club · Chemin du Nant d’Argent 1, 1223 Cologny
        </p>
      </main>
    </div>
  );
}
