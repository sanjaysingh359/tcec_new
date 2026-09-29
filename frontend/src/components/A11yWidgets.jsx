import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TranslationOutlined, DownOutlined, CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import './A11yWidgets.css';

/* ════════════════════════════════════════════════════════════════════
   Language + accessibility widgets (as on the legacy portal):
   · bottom-left  — page language (Google website translator, loaded only
                    when a language other than English is chosen)
   · bottom-right — accessibility panel (text size, contrast, grayscale …)
   Both render outside #root so the page filters/zoom never move them.
   ════════════════════════════════════════════════════════════════════ */

const LANGUAGES = [
  ['en', 'English'], ['hi', 'हिन्दी'], ['bn', 'বাংলা'], ['gu', 'ગુજરાતી'], ['kn', 'ಕನ್ನಡ'],
  ['ml', 'മലയാളം'], ['mr', 'मराठी'], ['or', 'ଓଡ଼ିଆ'], ['pa', 'ਪੰਜਾਬੀ'], ['ta', 'தமிழ்'],
  ['te', 'తెలుగు'], ['ur', 'اردو'], ['as', 'অসমীয়া'],
];

/* ───────────── language ───────────── */
function currentLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[a-z-]+\/([a-z-]+)/i);
  return m ? m[1] : 'en';
}

function setTransCookie(lang) {
  const host = window.location.hostname;
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // clear any earlier value on both host and parent-domain scopes
  document.cookie = `googtrans=; ${expire}; path=/`;
  document.cookie = `googtrans=; ${expire}; path=/; domain=${host}`;
  if (lang !== 'en') {
    document.cookie = `googtrans=/en/${lang}; path=/`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${host}`;
  }
}

/* The translator rewrites text nodes React also owns; make node removal/insertion tolerant so a
   re-render after translation never throws (well-known React + page-translator conflict). */
function patchDomForTranslator() {
  if (window.__mprDomPatched) return;
  window.__mprDomPatched = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return remove.call(this, child);
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node;
    return insert.call(this, node, ref);
  };
}

function loadTranslator() {
  if (document.getElementById('mpr-gt-script')) return;
  patchDomForTranslator();
  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-undef
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: LANGUAGES.map(l => l[0]).join(','), autoDisplay: false },
      'mpr-gt-element',
    );
  };
  const s = document.createElement('script');
  s.id = 'mpr-gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

function LanguageWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(currentLang);
  const ref = useRef(null);

  useEffect(() => { if (lang !== 'en') loadTranslator(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  function choose(code) {
    setOpen(false);
    if (code === lang) return;
    setTransCookie(code);
    // the translator applies the cookie on load; reloading keeps React and the translated page in step
    window.location.reload();
  }

  const label = LANGUAGES.find(l => l[0] === lang)?.[1] || 'English';
  return (
    <div className="a11y-lang notranslate" ref={ref} translate="no">
      {open && (
        <ul className="a11y-lang-menu" role="listbox" aria-label="Choose language">
          {LANGUAGES.map(([code, name]) => (
            <li key={code}>
              <button type="button" role="option" aria-selected={code === lang} onClick={() => choose(code)}>
                <span lang={code}>{name}</span>
                {code === lang && <CheckOutlined />}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="a11y-lang-btn" onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox" aria-expanded={open} aria-label={`Language: ${label}`}>
        <TranslationOutlined className="a11y-lang-icon" />
        <span>{label}</span>
        <DownOutlined className={`a11y-lang-caret${open ? ' is-open' : ''}`} />
      </button>
      <div id="mpr-gt-element" className="a11y-gt-hidden" />
    </div>
  );
}

/* ───────────── accessibility ───────────── */
const A11Y_KEY = 'mpr_a11y';
const DEFAULTS = { size: 0, contrast: 'normal', grayscale: false, links: false, font: false, spacing: false, still: false };
const SIZES = [-1, 0, 1, 2, 3];              // zoom steps: 90 % … 130 %
const zoomOf = step => 1 + step * 0.1;

function loadPrefs() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(A11Y_KEY) || '{}') }; } catch { return { ...DEFAULTS }; }
}

function applyPrefs(p) {
  const root = document.getElementById('root');
  const html = document.documentElement;
  if (root) root.style.zoom = p.size ? String(zoomOf(p.size)) : '';
  html.classList.toggle('a11y-contrast', p.contrast === 'high');
  html.classList.toggle('a11y-dark', p.contrast === 'dark');
  html.classList.toggle('a11y-gray', p.grayscale);
  html.classList.toggle('a11y-links', p.links);
  html.classList.toggle('a11y-font', p.font);
  html.classList.toggle('a11y-spacing', p.spacing);
  html.classList.toggle('a11y-still', p.still);
}

function Toggle({ on, label, onClick }) {
  return (
    <button type="button" className={`a11y-opt${on ? ' is-on' : ''}`} aria-pressed={on} onClick={onClick}>
      <span className="a11y-opt-box">{on && <CheckOutlined />}</span>{label}
    </button>
  );
}

function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState(loadPrefs);
  const ref = useRef(null);

  useEffect(() => {
    applyPrefs(p);
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
  }, [p]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', close);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', close); };
  }, [open]);

  const set = patch => setP(prev => ({ ...prev, ...patch }));
  const idx = SIZES.indexOf(p.size);
  const changed = JSON.stringify(p) !== JSON.stringify(DEFAULTS);

  return (
    <div className="a11y-acc notranslate" ref={ref} translate="no">
      {open && (
        <section className="a11y-panel" role="dialog" aria-label="Accessibility options">
          <header className="a11y-panel-head">
            <b>Accessibility</b>
            <button type="button" className="a11y-x" onClick={() => setOpen(false)} aria-label="Close"><CloseOutlined /></button>
          </header>

          <div className="a11y-group">
            <span className="a11y-group-lbl">Text size</span>
            <div className="a11y-seg">
              <button type="button" onClick={() => set({ size: SIZES[Math.max(0, idx - 1)] })} disabled={idx <= 0} aria-label="Smaller text">A−</button>
              <button type="button" className={p.size === 0 ? 'is-on' : ''} onClick={() => set({ size: 0 })} aria-label="Normal text size">A</button>
              <button type="button" onClick={() => set({ size: SIZES[Math.min(SIZES.length - 1, idx + 1)] })} disabled={idx >= SIZES.length - 1} aria-label="Larger text">A+</button>
            </div>
            <span className="a11y-val">{Math.round(zoomOf(p.size) * 100)}%</span>
          </div>

          <div className="a11y-group">
            <span className="a11y-group-lbl">Contrast</span>
            <div className="a11y-seg">
              {[['normal', 'Normal'], ['high', 'High'], ['dark', 'Dark']].map(([k, l]) => (
                <button key={k} type="button" className={p.contrast === k ? 'is-on' : ''} aria-pressed={p.contrast === k} onClick={() => set({ contrast: k })}>{l}</button>
              ))}
            </div>
          </div>

          <div className="a11y-opts">
            <Toggle on={p.grayscale} label="Grayscale" onClick={() => set({ grayscale: !p.grayscale })} />
            <Toggle on={p.links} label="Highlight links & buttons" onClick={() => set({ links: !p.links })} />
            <Toggle on={p.font} label="Readable font" onClick={() => set({ font: !p.font })} />
            <Toggle on={p.spacing} label="Wider text spacing" onClick={() => set({ spacing: !p.spacing })} />
            <Toggle on={p.still} label="Pause animations" onClick={() => set({ still: !p.still })} />
          </div>

          <button type="button" className="a11y-reset" onClick={() => setP({ ...DEFAULTS })} disabled={!changed}>
            <ReloadOutlined /> Reset all
          </button>
        </section>
      )}
      <button type="button" className={`a11y-fab${changed ? ' is-changed' : ''}`} onClick={() => setOpen(o => !o)}
        aria-haspopup="dialog" aria-expanded={open} aria-label="Accessibility options" title="Accessibility options">
        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="currentColor">
          <circle cx="12" cy="4" r="2.2" />
          <path d="M20.5 7.6c-.2-.7-.9-1.1-1.6-.9-2.3.6-4.6.9-6.9.9s-4.6-.3-6.9-.9c-.7-.2-1.4.2-1.6.9s.2 1.4.9 1.6c1.9.5 3.8.8 5.6.9v2.8L9 21.1c-.2.7.2 1.4.9 1.6.7.2 1.4-.2 1.6-.9L12 17.4l.5 4.4c.2.7.9 1.1 1.6.9.7-.2 1.1-.9.9-1.6l-1.3-8.2V10.1c1.8-.1 3.7-.4 5.6-.9.7-.2 1.2-.9 1-1.6z" />
        </svg>
      </button>
    </div>
  );
}

export default function A11yWidgets() {
  return createPortal(
    <div className="a11y-root">
      <LanguageWidget />
      <AccessibilityWidget />
    </div>,
    document.body,
  );
}
