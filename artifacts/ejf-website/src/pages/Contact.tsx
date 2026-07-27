import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { socialLinks } from "@/data/socialLinks";

import imgHero  from "@assets/hero_1775860211048.jpeg";
import imgComEv from "@assets/com_event_1775860211043.jpeg";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const subjects = [
  "General Enquiry", "Partnership Opportunity", "Strategic Partnership",
  "Joint Research", "Policy Dialogue", "Event Registration",
  "Research Collaboration", "Media / Press", "Volunteer / Join Us",
  "Donation Enquiry", "Other",
];

const faqs = [
  { q: "How can I get involved with EJF?", a: "You can volunteer, partner with us, attend our events, or support our work through donations. Use the contact form above or email us directly to learn more about current opportunities." },
  { q: "Does EJF accept research collaboration proposals?", a: "Yes! We actively seek partnerships with researchers, academic institutions, and organizations interested in collaborative research on economic, climate, social, and digital justice." },
  { q: "How can I host an EJF event in my community?", a: "We partner with communities, schools, and organizations across Kenya. Use the contact form and select 'Event Registration' or visit the Events page to request an event in your area." },
  { q: "Are EJF publications available for free?", a: "Most of our publications, policy briefs, and research reports are available for free download on the Research page. Some documents are still being digitised and will be uploaded soon." },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
function ContactHero() {
  return (
    <section className="relative h-[65vh] min-h-[460px] flex items-center justify-center overflow-hidden">
      <img src={imgComEv} alt="Contact EJF"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ animation: "ctKB 14s ease-in-out infinite alternate" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08152F]/88 via-[#08152F]/72 to-[#08152F]/92" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" style={{ animation: "ctFadeUp 0.9s ease both" }}>
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-5">Partnership Begins Here</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Let's Shape the<br />Future Together
        </h1>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16 bg-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px w-16 bg-[#C9A24A]/60" />
        </div>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          The future of Natural Wealth requires collaboration. Reach out and let's build something lasting together.
        </p>
      </div>
      <style>{`
        @keyframes ctKB { from { transform: scale(1.06); } to { transform: scale(1.0); } }
        @keyframes ctFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

// ─── PARTNERSHIP CARDS ────────────────────────────────────────────────────────
function PartnershipCards() {
  const { ref, inView } = useInView();
  const cards = [
    { icon: "🤝", title: "Strategic Partnerships", desc: "Join EJF's growing network of governments, international organisations, development partners, civil society and responsible enterprise working together for Economic Justice.", accent: "#C9A24A" },
    { icon: "🔬", title: "Joint Research", desc: "Collaborate with EJF's research team to generate evidence, ideas and knowledge that shape policy and strengthen decision-making on Natural Capital governance.", accent: "#60a5fa" },
    { icon: "🏛️", title: "Policy Dialogue", desc: "Participate in EJF's platforms that bring together governments, communities and institutions to advance practical and inclusive policy solutions.", accent: "#34d399" },
  ];
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">How We Work Together</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F]">Ways to Engage</h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={card.title}
              className={`group bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6" style={{ background: card.accent + "15", border: `1px solid ${card.accent}30` }}>{card.icon}</div>
              <h3 className="font-extrabold text-[#08152F] text-lg mb-3">{card.title}</h3>
              <div className="h-0.5 w-10 rounded mb-4" style={{ background: card.accent }} />
              <p className="text-[#08152F]/60 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
function ContactForm() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", organization: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), subject: form.subject.trim(), message: form.message.trim() }),
      });
    } catch (err) {
      console.error("Contact submission error:", err);
    }
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl border text-sm text-[#08152F] bg-white outline-none transition-all duration-200 ${focused === field ? "border-[#C9A24A] ring-2 ring-[#C9A24A]/20 shadow-sm" : "border-gray-200 hover:border-gray-300"}`;

  const labelClass = "block text-xs font-bold text-[#08152F] mb-1.5 uppercase tracking-wider";

  if (submitted) {
    return (
      <section className="bg-white py-20 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-[#08152F] mb-2">Message Sent!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thank you for reaching out, <span className="font-bold text-[#08152F]">{form.name}</span>. Our team will get back to you at <span className="font-bold text-[#C9A24A]">{form.email}</span> within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "", organization: "" }); }}
            className="bg-[#08152F] hover:bg-[#0e2247] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:scale-105">
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08152F] mb-3">Economic Justice Forum (EJF)</h2>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {[
              { icon: "✉️", label: "Email", value: "info@economicjusticeforum.org", href: "mailto:info@economicjusticeforum.org" },
              { icon: "🌐", label: "Website", value: "www.economicjusticeforum.org", href: "https://economicjusticeforum.org" },
              { icon: "📞", label: "Phone", value: "+254 741 357 830", href: "tel:+254741357830" },
            ].map(item => (
              <a key={item.label} href={item.href} target={item.label === "Website" ? "_blank" : undefined} rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[#08152F]/70 hover:text-[#C9A24A] transition-colors">
                <span>{item.icon}</span>
                <span className="font-semibold">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#08152F] rounded-3xl p-8 text-white">
              <h3 className="font-extrabold text-lg mb-1">Send Us a Message</h3>
              <div className="h-0.5 w-10 bg-[#C9A24A] mb-4" />
              <p className="text-white/60 text-sm leading-relaxed mb-6">Fill in the form and we'll get back to you promptly.</p>
              <div className="space-y-3">
                <a href="tel:+254741357830" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C9A24A]/40 hover:bg-white/8 transition-all group">
                  <div className="w-10 h-10 bg-[#C9A24A]/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">📞</div>
                  <div><p className="text-white/50 text-xs">Call us directly</p><p className="text-white text-sm font-bold">+254 741 357 830</p></div>
                </a>
                <a href="mailto:info@economicjusticeforum.org" className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C9A24A]/40 hover:bg-white/8 transition-all group">
                  <div className="w-10 h-10 bg-[#C9A24A]/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">✉️</div>
                  <div><p className="text-white/50 text-xs">Email us at</p><p className="text-white text-sm font-bold break-all">info@economicjusticeforum.org</p></div>
                </a>
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <h4 className="text-[#C9A24A] font-bold text-xs uppercase tracking-widest mb-3">🕐 Office Hours</h4>
                {[["Mon – Fri", "8:00 AM – 5:00 PM"], ["Saturday", "9:00 AM – 1:00 PM"], ["Sunday", "Closed"]].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between text-xs py-1">
                    <span className="text-white/50">{day}</span>
                    <span className="text-white font-semibold">{hrs}</span>
                  </div>
                ))}
                <p className="text-white/30 text-xs mt-3">East Africa Time (EAT, UTC+3)</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" required placeholder="Your full name" value={form.name}
                    onChange={e => update("name", e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    className={inputClass("name")} />
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
                  <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={e => update("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    className={inputClass("email")} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" placeholder="+254 700 000 000" value={form.phone}
                    onChange={e => update("phone", e.target.value)} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                    className={inputClass("phone")} />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input type="text" placeholder="Your organization (optional)" value={form.organization}
                    onChange={e => update("organization", e.target.value)} onFocus={() => setFocused("organization")} onBlur={() => setFocused(null)}
                    className={inputClass("organization")} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Subject <span className="text-red-400">*</span></label>
                <select required value={form.subject}
                  onChange={e => update("subject", e.target.value)} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                  className={inputClass("subject")}>
                  <option value="">Select a subject…</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Message <span className="text-red-400">*</span></label>
                <textarea required rows={5} placeholder="Tell us how we can help…" value={form.message}
                  onChange={e => update("message", e.target.value)} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  className={`${inputClass("message")} resize-none`} />
                <p className="text-right text-xs text-gray-400 mt-1">{form.message.length} / 1000</p>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-[#F7F8FA] rounded-xl border border-gray-100">
                <span className="text-base mt-0.5 flex-shrink-0">🔒</span>
                <p className="text-xs text-gray-500 leading-relaxed">Your information is safe with us. We respect your privacy and will never share your details with third parties without your consent.</p>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#08152F] hover:bg-[#0e2247] disabled:bg-gray-400 text-white font-bold text-sm py-4 rounded-xl transition-all hover:scale-[1.02] shadow-md disabled:scale-100">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</> : <>✉️ Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VISIT US ─────────────────────────────────────────────────────────────────
function VisitSection() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-[#F7F8FA] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Location</span>
          <h2 className="text-3xl font-extrabold text-[#08152F]">Visit Us</h2>
        </div>
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="https://maps.google.com/?q=Taita+Taveta+County+Kenya" target="_blank" rel="noreferrer"
            className="relative bg-[#08152F] rounded-3xl overflow-hidden min-h-[300px] shadow-2xl flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C9A24A 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="text-center text-white p-8 relative z-10">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🗺️</div>
              <p className="font-extrabold text-xl mb-1">Taita-Taveta County</p>
              <p className="text-white/50 text-sm mb-5">Kenya, East Africa</p>
              <div className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
                Open in Google Maps →
              </div>
            </div>
          </a>
          <div className="space-y-4">
            {[
              { icon: "📍", label: "Head Office", value: "Mwatate, Taita Taveta County, Kenya" },
              { icon: "📞", label: "Phone", value: "+254 741 357 830" },
              { icon: "✉️", label: "Email", value: "info@economicjusticeforum.org" },
              { icon: "🌐", label: "Website", value: "economicjusticeforum.org" },
              { icon: "🕐", label: "Office Hours", value: "Mon–Fri 8AM–5PM, Sat 9AM–1PM (EAT)" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#C9A24A]/30 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#08152F] flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-[#08152F]/45 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="text-[#08152F] font-bold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL CONNECT ───────────────────────────────────────────────────────────
function ConnectChannels() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-extrabold text-[#08152F] mb-2">Stay Connected</h2>
        <p className="text-[#08152F]/50 text-sm mb-10 max-w-md mx-auto">Follow us for updates, stories and opportunities to engage with our work.</p>
        <div ref={ref} className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((s, i) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className={`group relative flex items-center gap-3 bg-gray-50 hover:text-white border border-gray-200 hover:border-transparent text-gray-800 font-semibold text-sm px-5 py-3.5 rounded-2xl shadow-sm transition-all duration-300 hover:scale-105 overflow-hidden ${s.hoverShadow} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <span className={`absolute inset-0 ${s.iconBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              <span className={`relative w-9 h-9 rounded-full ${s.iconBg} flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md`}>{s.icon}</span>
              <span className="relative text-left">
                <span className="block text-sm font-bold leading-tight">{s.label}</span>
                <span className="block text-xs font-normal opacity-60 leading-tight">{s.handle}</span>
              </span>
              <span className="relative ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-sm">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-[#F7F8FA] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-widest uppercase mb-3">Common Questions</span>
          <h2 className="text-2xl font-extrabold text-[#08152F] mb-2">Frequently Asked Questions</h2>
        </div>
        <div ref={ref} className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm font-bold text-[#08152F] pr-4">{faq.q}</span>
                <span className={`text-[#C9A24A] text-lg font-bold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <div className="w-full h-px bg-gray-100 mb-4" />
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── A SHARED FUTURE ──────────────────────────────────────────────────────────
function SharedFutureSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgHero} alt="A shared future" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08152F]/97 via-[#08152F]/90 to-[#08152F]/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-block text-[#C9A24A] text-xs font-bold tracking-[0.25em] uppercase mb-6">Our Commitment</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">A Shared Future</h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#C9A24A]/60" />
          <div className="w-2 h-2 rounded-full bg-[#C9A24A]" />
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#C9A24A]/60" />
        </div>
        <p className="text-white/70 text-lg leading-relaxed mb-4">
          The future of Natural Wealth cannot be shaped by one institution alone.
        </p>
        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
          It requires governments, communities, researchers, enterprises and international partners working together. The Economic Justice Forum exists to build those partnerships and advance those solutions.
        </p>
        <p className="text-[#C9A24A] font-bold text-lg tracking-widest mb-10">Equity • Justice • Prosperity</p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#C9A24A] hover:bg-[#b08a35] text-white font-bold px-10 py-4 rounded-xl transition-all text-sm shadow-xl shadow-[#C9A24A]/25">
          Start the Conversation →
        </Link>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <>
      <ContactHero />
      <PartnershipCards />
      <ContactForm />
      <VisitSection />
      <ConnectChannels />
      <FAQ />
      <SharedFutureSection />
    </>
  );
}
