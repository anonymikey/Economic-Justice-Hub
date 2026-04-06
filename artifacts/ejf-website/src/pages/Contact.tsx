import { useState, useEffect, useRef } from "react";

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

const contactInfo = [
  {
    icon: "📞",
    label: "Phone",
    value: "+254 741 357 830",
    sub: "Mon – Fri, 8:00 AM – 5:00 PM EAT",
    href: "tel:+254741357830",
    color: "from-blue-600 to-blue-800",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "info@economicjusticeforum.org",
    sub: "We respond within 24 hours",
    href: "mailto:info@economicjusticeforum.org",
    color: "from-[#d4a017] to-amber-700",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
  {
    icon: "🌐",
    label: "Website",
    value: "economicjusticeforum.org",
    sub: "Visit us online",
    href: "https://economicjusticeforum.org",
    color: "from-emerald-600 to-emerald-800",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Taita-Taveta County, Kenya",
    sub: "East Africa",
    href: "https://maps.google.com/?q=Taita+Taveta+County+Kenya",
    color: "from-violet-600 to-violet-800",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
];

const subjects = [
  "General Enquiry",
  "Partnership Opportunity",
  "Event Registration",
  "Research Collaboration",
  "Media / Press",
  "Volunteer / Join Us",
  "Donation Enquiry",
  "Other",
];

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0e1f3d] via-[#1a3a6e] to-[#0e1f3d] overflow-hidden py-20 px-4">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a017]/8 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/8 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
          💬 We'd Love to Hear From You
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          Get in <span className="text-[#d4a017]">Touch</span>
        </h1>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Whether you have questions about our programs, want to collaborate, or simply want to learn more about economic justice, we're here to connect. Reach out and let's build a more just world together.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT INFO CARDS
───────────────────────────────────────────── */
function ContactCards() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "Website" ? "_blank" : undefined}
              rel="noreferrer"
              className={`group flex flex-col items-center text-center p-6 bg-white rounded-2xl border ${item.border} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-sm font-bold text-[#0e1f3d] leading-snug mb-1 group-hover:text-[#d4a017] transition-colors break-all">{item.value}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", organization: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-gray-800 bg-white outline-none transition-all duration-200 ${
      focused === field
        ? "border-[#d4a017] ring-2 ring-[#d4a017]/20 shadow-sm"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const labelClass = "block text-xs font-bold text-[#0e1f3d] mb-1.5 uppercase tracking-wider";

  if (submitted) {
    return (
      <section className="bg-white py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-5 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Message Sent!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Thank you for reaching out, <span className="font-bold text-[#0e1f3d]">{form.name}</span>. Our team will get back to you at <span className="font-bold text-[#d4a017]">{form.email}</span> within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "", organization: "" }); }}
            className="bg-[#0e1f3d] hover:bg-[#1a3a6e] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all hover:scale-105"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0e1f3d] mb-2">Send Us a Message</h2>
              <div className="w-10 h-0.5 bg-[#d4a017] mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">
                Fill in the form and we'll get back to you promptly. All fields marked with <span className="text-red-400 font-bold">*</span> are required.
              </p>
            </div>

            {/* Quick contact buttons */}
            <div className="space-y-3">
              <a
                href="tel:+254741357830"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#d4a017] hover:bg-amber-50 transition-all group"
              >
                <div className="w-10 h-10 bg-[#0e1f3d] rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-[#d4a017] transition-colors">📞</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">Call us directly</p>
                  <p className="text-sm font-bold text-[#0e1f3d]">+254 741 357 830</p>
                </div>
              </a>
              <a
                href="mailto:info@economicjusticeforum.org"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#d4a017] hover:bg-amber-50 transition-all group"
              >
                <div className="w-10 h-10 bg-[#0e1f3d] rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-[#d4a017] transition-colors">✉️</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold">Email us at</p>
                  <p className="text-sm font-bold text-[#0e1f3d] break-all">info@economicjusticeforum.org</p>
                </div>
              </a>
            </div>

            {/* Office hours */}
            <div className="bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] rounded-2xl p-5 text-white">
              <h3 className="font-bold text-sm mb-3 text-[#d4a017]">🕐 Office Hours</h3>
              <div className="space-y-2 text-xs">
                {[["Monday – Friday", "8:00 AM – 5:00 PM"], ["Saturday", "9:00 AM – 1:00 PM"], ["Sunday", "Closed"]].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-white/70">{day}</span>
                    <span className="font-semibold">{hrs}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50">All times in East Africa Time (EAT, UTC+3)</div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-md p-7 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className={inputClass("name")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className={inputClass("email")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    className={inputClass("phone")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input
                    type="text"
                    placeholder="Company or organization (optional)"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    onFocus={() => setFocused("organization")}
                    onBlur={() => setFocused(null)}
                    className={inputClass("organization")}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Subject <span className="text-red-400">*</span></label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className={inputClass("subject")}
                >
                  <option value="">Select a subject…</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Message <span className="text-red-400">*</span></label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help you…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass("message")} resize-none`}
                />
                <p className="text-right text-xs text-gray-400 mt-1">{form.message.length} / 1000</p>
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-base mt-0.5 flex-shrink-0">🔒</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your information is safe with us. We respect your privacy and will never share your details with third parties without your consent.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#0e1f3d] hover:bg-[#1a3a6e] disabled:bg-gray-400 text-white font-bold text-sm py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-md disabled:scale-100"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>✉️ Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAP / LOCATION SECTION
───────────────────────────────────────────── */
function LocationSection() {
  const { ref, inView } = useInView();
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Map placeholder */}
          <div className="relative bg-gradient-to-br from-[#0e1f3d] to-[#1a3a6e] rounded-2xl overflow-hidden h-64 shadow-lg flex items-center justify-center group cursor-pointer">
            <div className="text-center text-white">
              <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">🗺️</div>
              <p className="font-bold text-base">Taita-Taveta County</p>
              <p className="text-white/60 text-xs mt-1">Kenya, East Africa</p>
              <a
                href="https://maps.google.com/?q=Taita+Taveta+County+Kenya"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 bg-[#d4a017] hover:bg-[#b8891a] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Find Us</h2>
              <div className="w-10 h-0.5 bg-[#d4a017] mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed">
                EJF operates primarily across Kenya, with a strong presence in Taita-Taveta County. Our team works across coastal, inland, and urban communities to champion economic, climate, social, and digital justice.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: "📍", label: "Primary Base", value: "Taita-Taveta County, Kenya" },
                { icon: "📞", label: "Phone", value: "+254 741 357 830" },
                { icon: "✉️", label: "Email", value: "info@economicjusticeforum.org" },
                { icon: "🌐", label: "Website", value: "economicjusticeforum.org" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0e1f3d] rounded-xl flex items-center justify-center text-sm flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold">{item.label}</p>
                    <p className="text-sm font-bold text-[#0e1f3d]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONNECT CHANNELS
───────────────────────────────────────────── */
function ConnectChannels() {
  const { ref, inView } = useInView();
  const channels = [
    { icon: "📘", label: "Facebook", handle: "@EconomicJusticeForum", color: "bg-blue-600" },
    { icon: "🐦", label: "Twitter / X", handle: "@EJFKenya", color: "bg-sky-500" },
    { icon: "📸", label: "Instagram", handle: "@ejf_kenya", color: "bg-pink-600" },
    { icon: "💼", label: "LinkedIn", handle: "Economic Justice Forum", color: "bg-blue-800" },
    { icon: "▶️", label: "YouTube", handle: "EJF Kenya", color: "bg-red-600" },
  ];
  return (
    <section className="bg-white py-14 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Stay Connected</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Follow us on social media for updates, stories, and opportunities to engage with our work.</p>
        <div ref={ref} className="flex flex-wrap justify-center gap-3">
          {channels.map((c, i) => (
            <button
              key={c.label}
              onClick={() => alert("To be updated Soon")}
              className={`flex items-center gap-2.5 ${c.color} hover:opacity-90 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-md ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span>{c.icon}</span>
              <div className="text-left">
                <p className="text-xs leading-none opacity-80">{c.label}</p>
                <p className="text-xs leading-none font-normal opacity-70">{c.handle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
function FAQ() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How can I get involved with EJF?", a: "You can volunteer, partner with us, attend our events, or support our work through donations. Use the contact form above or email us directly to learn more about current opportunities." },
    { q: "Does EJF accept research collaboration proposals?", a: "Yes! We actively seek partnerships with researchers, academic institutions, and organizations interested in collaborative research on economic, climate, social, and digital justice." },
    { q: "How can I host an EJF event in my community?", a: "We partner with communities, schools, and organizations across Kenya. Use the contact form and select 'Event Registration' or visit the Events page to request an event in your area." },
    { q: "Are EJF publications available for free?", a: "Most of our publications, policy briefs, and research reports are available for free download on the Research page. Some documents are still being digitised and will be uploaded soon." },
  ];
  return (
    <section className="bg-gray-50 py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#0e1f3d] mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm">Quick answers to common questions.</p>
        </div>
        <div ref={ref} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-bold text-[#0e1f3d] pr-4">{faq.q}</span>
                <span className={`text-[#d4a017] text-lg font-bold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
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

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactCards />
      <ContactForm />
      <LocationSection />
      <ConnectChannels />
      <FAQ />
    </>
  );
}
