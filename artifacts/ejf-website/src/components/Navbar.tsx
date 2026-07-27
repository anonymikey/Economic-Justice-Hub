import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Philosophy", href: "/philosophy" },
  { label: "Research & Knowledge", href: "/research" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  // Hide the current active page's link
  const visibleLinks = navLinks.filter((link) => !isActive(link.href));

  return (
    <nav className={`bg-[#0e1f3d] sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-2xl" : "shadow-lg"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Single row: logo | links | actions ── */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">

          {/* Logo — always visible */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Economic Justice Forum Logo"
              className="h-[42px] sm:h-14 w-auto object-contain"
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-bold text-sm lg:text-base whitespace-nowrap">
                Economic Justice Forum (EJF)
              </div>
              <div className="text-[#d4a017] text-[9px] lg:text-[10px] font-semibold tracking-widest uppercase">
                Equity &bull; Justice &bull; Prosperity
              </div>
            </div>
          </Link>

          {/* Desktop nav links — center */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && !isActive("/profile") && (
              <Link
                href="/profile"
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors"
              >
                Profile
              </Link>
            )}
          </div>

          {/* Desktop action buttons — right */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/donate"
              className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors shadow-md whitespace-nowrap"
            >
              Donate
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white pl-2 pr-3 py-1.5 rounded-xl transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a017] to-amber-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-semibold max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                  <svg className={`w-3 h-3 opacity-60 transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50">
                      <p className="text-xs font-bold text-[#0e1f3d] truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span>👤</span> My Profile
                    </Link>
                    <Link href="/research" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span>📚</span> Publications
                    </Link>
                    <Link href="/events" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span>📅</span> Events
                    </Link>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <span>🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="border border-white/30 hover:border-white/60 text-white/90 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Login
              </Link>
            )}
          </div>

          {/* Tablet (md): show links + Donate+Login but abbreviate */}
          <div className="hidden md:flex lg:hidden items-center gap-1 flex-1 justify-center overflow-x-auto">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && !isActive("/profile") && (
              <Link href="/profile" className="px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg whitespace-nowrap transition-colors">
                Profile
              </Link>
            )}
          </div>

          <div className="hidden md:flex lg:hidden items-center gap-2 flex-shrink-0">
            <Link href="/donate" className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-colors shadow-md whitespace-nowrap">
              Donate
            </Link>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a017] to-amber-700 flex items-center justify-center text-xs font-bold text-white"
                >
                  {user.avatar}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span>👤</span> My Profile
                    </Link>
                    <div className="border-t border-gray-100">
                      <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <span>🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="border border-white/30 hover:border-white/60 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#081629] border-t border-white/10 px-4 py-4 space-y-1">
          {/* User info strip */}
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 bg-white/5 rounded-xl mb-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4a017] to-amber-700 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {user.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-bold truncate">{user.name}</p>
                <p className="text-white/40 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}

          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user && !isActive("/profile") && (
            <Link href="/profile" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              👤 My Profile
            </Link>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/donate" className="block bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-4 py-2.5 rounded-lg text-sm text-center transition-colors">
              Donate
            </Link>
            {user ? (
              <button
                onClick={() => logout()}
                className="w-full border border-red-400/40 text-red-300 hover:bg-red-500/20 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors text-center"
              >
                🚪 Sign Out
              </button>
            ) : (
              <Link href="/login" className="block border border-white/30 hover:border-white/60 text-white/90 text-sm font-semibold px-4 py-2.5 rounded-lg text-center transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
