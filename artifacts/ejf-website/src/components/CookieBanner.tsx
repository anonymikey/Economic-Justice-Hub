import { useState, useEffect } from "react";
import { Link } from "wouter";

export type CookieConsent = {
  decision: "all" | "essential" | "custom";
  essential: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
};

const STORAGE_KEY = "ejf_cookie_consent";

export function getCookieConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(consent: CookieConsent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export function clearCookieConsent() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      // Slight delay so it doesn't flash instantly on load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  const dismiss = () => {
    setSaved(true);
    setTimeout(() => setVisible(false), 600);
  };

  const acceptAll = () => {
    saveCookieConsent({
      decision: "all",
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    });
    dismiss();
  };

  const acceptEssential = () => {
    saveCookieConsent({
      decision: "essential",
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    });
    dismiss();
  };

  const saveCustom = () => {
    saveCookieConsent({
      decision: "custom",
      essential: true,
      analytics,
      marketing,
      functional,
      timestamp: new Date().toISOString(),
    });
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[999] transition-all duration-500 ${
        saved ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Backdrop blur strip */}
      <div className="bg-[#0a1628]/97 backdrop-blur-md border-t-2 border-[#d4a017]/60 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 max-h-[min(70vh,32rem)] overflow-y-auto">

          {!showSettings ? (
            /* ── Default banner ── */
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
              {/* Icon + text */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4a017]/20 flex items-center justify-center text-lg mt-0.5">
                  🍪
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm mb-0.5">We use cookies</p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    EJF uses cookies to improve your experience, analyse traffic, and personalise content.
                    Your preferences are saved locally on your device.{" "}
                    <Link href="/cookies" className="text-[#d4a017] hover:underline font-medium">
                      Cookie Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 flex-shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold text-white/70 border border-white/20 hover:border-white/50 hover:text-white rounded-lg transition-all"
                >
                  ⚙️ Manage
                </button>
                <button
                  onClick={acceptEssential}
                  className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-semibold text-white border border-white/30 hover:border-white/60 hover:bg-white/10 rounded-lg transition-all"
                >
                  Essential Only
                </button>
                <button
                  onClick={acceptAll}
                  className="w-full sm:w-auto px-4 py-1.5 text-xs font-bold bg-[#d4a017] hover:bg-[#b8891a] text-white rounded-lg transition-all hover:scale-105 shadow-md"
                >
                  Accept All ✓
                </button>
              </div>
            </div>
          ) : (
            /* ── Settings panel ── */
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚙️</span>
                  <div>
                    <h3 className="text-white font-bold text-sm">Cookie Preferences</h3>
                    <p className="text-white/40 text-xs">Choose which cookies you allow</p>
                  </div>
                </div>
                <button aria-label="Close cookie preferences" onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {/* Essential — always on */}
                <CookieToggleRow
                  label="Essential"
                  desc="Required for the site to work. Cannot be disabled."
                  emoji="🔒"
                  checked={true}
                  disabled={true}
                  onChange={() => {}}
                />
                <CookieToggleRow
                  label="Functional"
                  desc="Remembers your preferences and settings."
                  emoji="⚙️"
                  checked={functional}
                  onChange={setFunctional}
                />
                <CookieToggleRow
                  label="Analytics"
                  desc="Helps us understand how visitors use the site."
                  emoji="📊"
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <CookieToggleRow
                  label="Marketing"
                  desc="Used to show relevant ads and track campaigns."
                  emoji="📢"
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-end">
                <button
                  onClick={acceptEssential}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white/70 border border-white/20 hover:border-white/50 hover:text-white rounded-lg transition-all"
                >
                  Essential Only
                </button>
                <button
                  onClick={saveCustom}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-bold bg-[#0e1f3d] border border-[#d4a017]/50 hover:bg-[#1a3a6e] text-white rounded-lg transition-all"
                >
                  Save My Choices
                </button>
                <button
                  onClick={acceptAll}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-bold bg-[#d4a017] hover:bg-[#b8891a] text-white rounded-lg transition-all hover:scale-105"
                >
                  Accept All ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CookieToggleRow({
  label, desc, emoji, checked, disabled = false, onChange,
}: {
  label: string;
  desc: string;
  emoji: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={`bg-white/5 rounded-xl p-3 flex flex-col gap-2 ${disabled ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{emoji}</span>
          <span className="text-white text-xs font-bold">{label}</span>
        </div>
        {/* Toggle */}
        <button
          aria-label={`${label} cookies ${checked ? "enabled" : "disabled"}`}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
            checked ? "bg-[#d4a017]" : "bg-white/20"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      <p className="text-white/40 text-[10px] leading-relaxed">{desc}</p>
    </div>
  );
}
