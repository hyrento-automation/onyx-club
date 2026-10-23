'use client';

import { useEffect, useState } from 'react';

type Consent = { analytics: boolean; marketing: boolean };
type DataLayerWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  onyxGtmLoaded?: boolean;
};

const STORAGE_KEY = 'onyx-consent-v1';
const CONSENT_DEFAULTS = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
} as const;

function loadGtm(gtmId: string) {
  const win = window as DataLayerWindow;
  if (win.onyxGtmLoaded) return;
  win.onyxGtmLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  script.onerror = () => {
    win.onyxGtmLoaded = false;
    script.remove();
  };
  document.head.appendChild(script);
}

function updateConsent(consent: Consent) {
  const win = window as DataLayerWindow;
  win.gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    personalization_storage: consent.marketing ? 'granted' : 'denied',
  });
}

export default function ConsentManager({ gtmId, googleTagId }: { gtmId?: string; googleTagId?: string }) {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setLang(window.location.pathname.split('/')[1] === 'en' ? 'en' : 'fr');
    const win = window as DataLayerWindow;
    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function () {
      win.dataLayer!.push(arguments);
    };
    if (gtmId) {
      win.gtag('consent', 'default', CONSENT_DEFAULTS);
      if (googleTagId) {
        win.gtag('js', new Date());
        win.gtag('config', googleTagId);
      }
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Consent;
        if (typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') {
          setAnalytics(parsed.analytics);
          setMarketing(parsed.marketing);
          if (gtmId) {
            updateConsent(parsed);
            if (parsed.analytics || parsed.marketing) loadGtm(gtmId);
          }
          setOpen(false);
          return;
        }
      }
    } catch {
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be disabled. */ }
    }
    setOpen(true);
  }, [gtmId, googleTagId]);

  function saveConsent(next: Consent) {
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Consent still applies for this visit. */ }
    if (gtmId) {
      updateConsent(next);
      if (next.analytics || next.marketing) loadGtm(gtmId);
    }
    setOpen(false);
    setCustomize(false);
  }

  const copy = lang === 'fr'
    ? {
        title: 'Votre confidentialité, votre choix.',
        body: 'Les cookies essentiels assurent le fonctionnement du site. Avec votre accord, nous activons aussi la mesure d’audience et les outils marketing.',
        essential: 'Essentiels', analytics: 'Mesure d’audience', marketing: 'Marketing', always: 'Toujours actifs',
        accept: 'Tout accepter', reject: 'Refuser les optionnels', customize: 'Personnaliser', save: 'Enregistrer mes choix',
        settings: 'Paramètres cookies',
      }
    : {
        title: 'Your privacy, your choice.',
        body: 'Essential storage keeps the site working. With your permission, we also enable audience measurement and marketing tools.',
        essential: 'Essential', analytics: 'Analytics', marketing: 'Marketing', always: 'Always active',
        accept: 'Accept all', reject: 'Reject optional', customize: 'Customize', save: 'Save my choices',
        settings: 'Cookie settings',
      };

  return <>
    {open && <section className="consent-panel" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <div className="consent-copy">
        <p className="lab">{lang === 'fr' ? 'ONYX · CONFIDENTIALITÉ' : 'ONYX · PRIVACY'}</p>
        <h2 id="consent-title">{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      {customize && <div className="consent-options">
        <div className="consent-option"><span>{copy.essential}<small>{copy.always}</small></span><input type="checkbox" checked disabled aria-label={copy.essential}/></div>
        <label className="consent-option"><span>{copy.analytics}</span><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /></label>
        <label className="consent-option"><span>{copy.marketing}</span><input type="checkbox" checked={marketing} onChange={event => setMarketing(event.target.checked)} /></label>
      </div>}
      <div className="consent-actions">
        <button type="button" className="consent-secondary" onClick={() => customize ? saveConsent({ analytics, marketing }) : saveConsent({ analytics: false, marketing: false })}>{customize ? copy.save : copy.reject}</button>
        {!customize && <button type="button" className="consent-secondary" onClick={() => setCustomize(true)}>{copy.customize}</button>}
        <button type="button" className="consent-primary" onClick={() => saveConsent({ analytics: true, marketing: true })}>{copy.accept}</button>
      </div>
    </section>}
    {!open && <button className="consent-settings" type="button" onClick={() => { setCustomize(true); setOpen(true); }} aria-label={copy.settings}>{copy.settings}</button>}
  </>;
}
