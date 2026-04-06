import { Link } from "wouter";
import { useState } from "react";
import { socialLinks } from "@/data/socialLinks";

const exploreLinks = [
  { label: "About", href: "/about" },
  { label: "Pillars", href: "/pillars" },
  { label: "Programs", href: "/programs" },
  { label: "Research", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Donate", href: "/donate" },
];

const resourceLinks = [
  "Publications",
  "Policy Briefs",
  "Case Studies",
  "Research Papers",
  "Annual Reports",
  "Media Kit",
];

const quickTags = ["Annual Report", "Newsletter", "Careers", "FAQs"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a1628] text-white">
      {/* ── Gold accent top border ── */}
      <div className="h-1 bg-gradient-to-r from-[#d4a017] via-[#f5c842] to-[#d4a017]" />

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpeg"
                alt="EJF Logo"
                className="h-16 w-16 rounded-lg object-cover shadow-lg border border-white/10"
              />
              <div>
                <div className="font-bold text-sm leading-snug text-white">
                  Economic Justice Forum
                </div>
                <div className="text-[#d4a017] text-xs font-semibold">(EJF)</div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-1">
              Equity &bull; Justice &bull; Prosperity
            </p>
            <p className="text-white/40 text-xs leading-relaxed mb-5">
              The people's platform for Economic, Climate, Social, and Digital Justice.
            </p>

            {/* Social icons */}
            <div className="mb-3 text-xs text-white/50 uppercase tracking-wider font-semibold">
              Follow Us
            </div>
            <div className="flex gap-2.5 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`group relative w-10 h-10 rounded-full ${s.iconBg} flex items-center justify-center transition-all duration-300 hover:scale-125 ${s.hoverShadow} shadow-md`}
                >
                  {/* Ping ring on hover */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping bg-white/20 pointer-events-none" />
                  <span className="relative text-white">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Explore ── */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5 pb-2 border-b border-white/10">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#d4a017] text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#d4a017]/40 group-hover:bg-[#d4a017] transition-colors flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {quickTags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 text-white/50 hover:text-white hover:border-[#d4a017]/60 text-xs px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Column 3: Resources ── */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5 pb-2 border-b border-white/10">
              Resources
            </h3>
            <ul className="space-y-2.5 mb-5">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-[#d4a017] text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#d4a017]/40 group-hover:bg-[#d4a017] transition-colors flex-shrink-0" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <a
                href="#"
                className="flex items-center gap-2 bg-[#d4a017] hover:bg-[#b8891a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                EJF Brochure
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-[#d4a017] hover:bg-[#b8891a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Impact Report
              </a>
            </div>
          </div>

          {/* ── Column 4: Subscribe + Contact ── */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-white/90 mb-5 pb-2 border-b border-white/10">
              Stay Connected
            </h3>

            {/* Subscribe form */}
            <div className="bg-gradient-to-br from-[#d4a017]/90 to-[#b8891a] rounded-xl p-4 mb-5 shadow-lg">
              <p className="text-white text-xs font-semibold mb-3 uppercase tracking-wider">
                Newsletter
              </p>
              {subscribed ? (
                <div className="bg-white/20 rounded-lg px-4 py-3 text-white text-sm font-medium text-center">
                  Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 min-w-0 px-3 py-2.5 text-sm text-gray-900 bg-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="bg-[#0e1f3d] hover:bg-[#0a1628] text-white text-sm font-bold px-4 py-2.5 rounded-r-lg transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <a
                href="https://economicjusticeforum.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-[#d4a017] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#d4a017]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                economicjusticeforum.org
              </a>
              <a
                href="tel:+254741357830"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-[#d4a017] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#d4a017]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                +254 741 357 830
              </a>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Taita-Taveta, Kenya
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-white/10" />

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs text-center sm:text-left">
            &copy; 2025 Economic Justice Forum (EJF) — Building a Future of Justice, Equity, and Prosperity
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40 flex-wrap justify-center">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span className="text-white/20">|</span>
            <Link href="/cookies" className="hover:text-[#d4a017] transition-colors">🍪 Cookie Policy</Link>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
        <p className="text-center text-white/25 text-xs mt-3">
          curated with ❤ by{" "}
          <span className="text-[#d4a017]/70 font-semibold">ANONYMIKETECH</span>
          {" "}|| NASHTECH
        </p>
      </div>
    </footer>
  );
}
