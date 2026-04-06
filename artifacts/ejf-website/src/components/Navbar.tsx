import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pillars", href: "/pillars" },
  { label: "Programs", href: "/programs" },
  { label: "Research", href: "/research" },
  { label: "Events", href: "/events" },
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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setProfileOpen(false); }, [location]);

  // Close dropdown on outside click
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

  // Hide the link for the current active page
  const visibleLinks = navLinks.filter((link) => !isActive(link.href));

  return (
    <nav
      className={`bg-[#0e1f3d] sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-2xl" : "shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top row: logo + actions + hamburger ── */}
        <div className="flex items-center justify-between py-3 border-b border-white/10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/logo.jpeg"
              alt="EJF Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-md object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight truncate">
                Economic Justice Forum (EJF)
              </div>
              <div className="text-[#d4a017] text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                Equity &bull; Justice &bull; Prosperity
              </div>
            </div>
          </Link>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/donate"
              className="bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-5 py-2 rounded text-sm transition-colors shadow-md"
            >
              Donate
            </Link>

            {user ? (
              /* ── Avatar + dropdown when logged in ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white pl-2 pr-3 py-1.5 rounded-xl transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a017] to-amber-700 flex items-center justify-center text-xs font-bold text-white">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-semibold max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                  <svg className={`w-3.5 h-3.5 opacity-60 transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50">
                      <p className="text-xs font-bold text-[#0e1f3d] truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors group">
                      <span className="text-base">👤</span> My Profile
                    </Link>
                    <Link href="/research" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span className="text-base">📚</span> Publications
                    </Link>
                    <Link href="/events" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0e1f3d] hover:text-white transition-colors">
                      <span className="text-base">📅</span> Events
                    </Link>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <span className="text-base">🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Login button when logged out ── */
              <Link
                href="/login"
                className="border border-white/30 hover:border-white/60 text-white/90 hover:text-white text-sm font-medium px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white p-2 rounded hover:bg-white/10 transition-colors ml-3 flex-shrink-0"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Desktop nav links row — hides current page ── */}
        <div className="hidden md:flex items-center py-1.5 gap-1 overflow-x-auto">
          {visibleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 lg:px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors text-white/80 hover:text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {/* Show Profile link in nav only when logged in */}
          {user && (
            <Link
              href="/profile"
              className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                isActive("/profile")
                  ? "text-white bg-white/15 border-b-2 border-[#d4a017]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Profile
            </Link>
          )}
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#081629] border-t border-white/10 px-4 py-4 space-y-1">
          {/* User info in mobile when logged in */}
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-2">
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
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors text-white/80 hover:text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Profile link (only when logged in) */}
          {user && (
            <Link
              href="/profile"
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive("/profile")
                  ? "bg-[#d4a017]/20 text-[#d4a017] border-l-4 border-[#d4a017]"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              👤 My Profile
            </Link>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/donate"
              className="block bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold px-4 py-3 rounded-lg text-sm transition-colors text-center shadow-md"
            >
              Donate
            </Link>
            {user ? (
              <button
                onClick={() => logout()}
                className="block w-full border border-red-400/40 text-red-300 hover:bg-red-500/20 text-sm font-semibold px-4 py-3 rounded-lg transition-colors text-center"
              >
                🚪 Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="block border border-white/30 hover:border-white/60 text-white/90 hover:text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
