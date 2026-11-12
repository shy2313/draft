import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import preweddingImg from "@/assets/prewedding.jpeg";
import graduationImg from "@/assets/graduation.jpeg";
import maternityImg from "@/assets/maternity.jpeg";
import birthdayImg from "@/assets/birthday.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ஒviyam Studio | Cinematic Social Photoshoots" },
      {
        name: "description",
        content:
          "Editorial black & gold photoshoot experiences — Pre-wedding, Graduation, Maternity, Birthday & Personal sessions by ஒviyam Studio.",
      },
      { property: "og:title", content: "ஒviyam Studio | Cinematic Social Photoshoots" },
      {
        property: "og:description",
        content: "Cinematic, social-first photoshoots curated for the modern soul.",
      },
      { property: "og:image", content: preweddingImg },
    ],
  }),
  component: Index,
});

const packages = [
  { num: "01", title: "Pre-Wedding", price: "RM 1500", duration: "4 hr session", desc: "A romantic, cinematic narrative of your love story — timeless frames before the big day.", tag: "Cinematic Couple", img: preweddingImg },
  { num: "02", title: "Graduation", price: "RM 600", duration: "2 hr session", desc: "Celebrate your achievement with editorial portraits worthy of the milestone.", tag: "Honor Frame", img: graduationImg },
  { num: "03", title: "Maternity", price: "RM 600", duration: "2 hr session", desc: "Heartfelt, elegant frames preserving the radiance of motherhood.", tag: "Radiant Glow", img: maternityImg },
  { num: "04", title: "Birthday", price: "RM 1000", duration: "3 hr session", desc: "Vibrant, joyful storytelling — every laugh and candle, captured.", tag: "Celebration Soul", img: birthdayImg },
  { num: "05", title: "Personal", price: "RM 800", duration: "2 hr session", desc: "Signature portraits for personal branding, social media & keepsakes.", tag: "Signature Portrait", img: preweddingImg },
];

const gallery = [
  { img: preweddingImg, label: "Pre-Wedding Diaries", category: "Couples" },
  { img: graduationImg, label: "Grad Celebrations", category: "Milestones" },
  { img: maternityImg, label: "Maternity Elegance", category: "Family" },
  { img: birthdayImg, label: "Birthday Energy", category: "Lifestyle" },
];

function Index() {
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeLightbox = () => setLightboxIdx(null);
  const nextImg = () =>
    setLightboxIdx((i) => (i === null ? null : (i + 1) % gallery.length));
  const prevImg = () =>
    setLightboxIdx((i) =>
      i === null ? null : (i - 1 + gallery.length) % gallery.length,
    );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") nextImg();
      else if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextImg();
      else prevImg();
    }
    touchStartX.current = null;
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "packages", label: "Packages" },
    { id: "gallery", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-background/85 border-b border-gold/20 py-2"
            : "bg-transparent py-3"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto flex justify-between items-center px-5 md:px-10">
          <button onClick={() => scrollTo("home")} className="font-display text-left">
            <div className="text-xl md:text-2xl font-bold text-gold tracking-tight leading-none">
              ஒviyam<span className="text-foreground/90"> Studio</span>
            </div>
            <div className="text-[0.6rem] tracking-[0.25em] text-gold/70 mt-1">
              PHOTOGRAPHY · FILMS
            </div>
          </button>

          <ul className="hidden lg:flex gap-9 list-none text-[0.8rem] tracking-[0.15em] uppercase">
            {navItems.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className="text-foreground/85 hover:text-gold transition relative group"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                scrollTo("contact");
                showToast("📸 Let's create magic — we'll reply within 12h.");
              }}
              className="hidden sm:inline-flex btn-glow px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              Book Session
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-gold"
              aria-label="Menu"
            >
              <span className={`block w-5 h-px bg-gold transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-5 h-px bg-gold transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-gold transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden border-t border-gold/20 bg-background/95 backdrop-blur-xl">
            <ul className="flex flex-col px-6 py-5 gap-4">
              {navItems.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollTo(n.id)}
                    className="font-display text-2xl text-foreground/90 hover:text-gold transition"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    scrollTo("contact");
                    showToast("📸 We'll reply within 12h.");
                  }}
                  className="btn-glow mt-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                >
                  Book Session
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* HERO — full bleed cinematic */}
      <section
        id="home"
        className="relative min-h-screen flex items-end pt-28 pb-20 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={preweddingImg}
            alt="ஒviyam Studio cinematic photoshoot"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        </div>

        {/* Vertical side label */}
        <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[0.65rem] tracking-[0.5em] uppercase text-gold/70 gap-3 items-center">
          <span className="h-px w-10 bg-gold/50" />
          Est. 2017 · Malaysia
        </div>

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 md:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.7rem] tracking-[0.3em] text-gold uppercase">
                Cinematic Photography
              </span>
            </div>
            <h1
              className="font-display text-[2.8rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold gold-gradient-text leading-[1.02] tracking-tight mb-7"
              style={{ textShadow: "0 0 25px oklch(0.78 0.13 85 / 0.15)" }}
            >
              Stories Framed<br />
              in <span className="italic font-semibold">Gold</span> &amp; Silence.
            </h1>
            <p className="text-base md:text-lg text-foreground/85 max-w-xl mb-9 leading-relaxed">
              Editorial photoshoots for the moments worth remembering — pre-wedding,
              graduation, maternity, birthday and signature portraits.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("packages")}
                className="btn-glow px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase"
              >
                View Packages
              </button>
              <button
                onClick={() => scrollTo("gallery")}
                className="px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-foreground/90 hover:text-gold transition border border-foreground/20 hover:border-gold/60 backdrop-blur"
              >
                See Portfolio →
              </button>
            </div>

            <div className="mt-12 inline-flex items-center gap-2 bg-background/60 backdrop-blur border border-gold/40 rounded-full px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Booking 2026 — Limited Slots
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("packages")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold text-xs tracking-[0.3em] uppercase animate-bounce-y flex flex-col items-center gap-2 z-10"
        >
          Scroll
          <span>↓</span>
        </button>
      </section>

      {/* PACKAGES — editorial list with imagery */}
      <section id="packages" className="py-20 md:py-32 bg-background relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-[0.7rem] tracking-[0.3em] text-gold uppercase">— Investment</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mt-3 gold-gradient-text leading-[1.05]">
                Signature<br />Packages
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm md:text-base leading-relaxed">
              Tailored sessions for every milestone. Custom add-ons, locations and
              wardrobe consultation available on request.
            </p>
          </div>

          <div className="border-t border-gold/15">
            {packages.map((p) => (
              <div
                key={p.title}
                className="group grid grid-cols-12 gap-3 md:gap-6 py-7 md:py-10 border-b border-gold/15 hover:bg-gold/[0.04] transition-all cursor-pointer px-2 md:px-4 items-center"
                onClick={() => {
                  scrollTo("contact");
                  showToast(`✨ ${p.title} session — let's talk dates.`);
                }}
              >
                <div className="col-span-2 md:col-span-1 font-display text-gold/50 text-lg md:text-2xl">{p.num}</div>
                <div className="hidden md:block md:col-span-1">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gold/30 group-hover:border-gold/70 transition">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="font-display text-xl md:text-3xl text-gold-soft leading-tight">{p.title}</h3>
                  <div className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">{p.tag}</div>
                </div>
                <div className="col-span-12 md:col-span-4 text-sm text-muted-foreground leading-relaxed">{p.desc}</div>
                <div className="col-span-7 md:col-span-2 flex flex-col">
                  <span className="font-display text-lg md:text-2xl text-gold font-semibold">{p.price}</span>
                  <span className="text-[0.7rem] tracking-wider uppercase text-muted-foreground">{p.duration}</span>
                </div>
                <div className="col-span-5 md:col-span-1 flex items-center justify-end text-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-2xl">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — magazine grid */}
      <section
        id="gallery"
        className="py-20 md:py-32 relative"
        style={{
          background:
            "radial-gradient(circle at 90% 10%, oklch(0.1 0.02 75) 0%, oklch(0.02 0 0) 70%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <span className="text-[0.7rem] tracking-[0.3em] text-gold uppercase">— Portfolio</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-3 gold-gradient-text leading-[1.05]">
              Selected Works
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              A curated selection of recent stories — moments that go viral, frames that endure.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {gallery.map((g, i) => {
              const layout = [
                "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]",
                "col-span-6 md:col-span-5 aspect-[3/4] md:aspect-[5/6]",
                "col-span-6 md:col-span-5 aspect-[3/4] md:aspect-[5/6]",
                "col-span-12 md:col-span-7 aspect-[4/5] md:aspect-[5/6]",
              ];
              return (
                <button
                  key={g.label}
                  onClick={() => setLightboxIdx(i)}
                  className={`group relative ${layout[i]} rounded-2xl overflow-hidden border border-gold/25 hover:border-gold/70 transition-all`}
                >
                  <img
                    src={g.img}
                    alt={g.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 text-[0.65rem] tracking-[0.25em] uppercase text-gold bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-gold/30">
                    {g.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left flex items-end justify-between gap-3">
                    <div>
                      <div className="font-display text-lg md:text-2xl text-gold-soft leading-tight">{g.label}</div>
                      <div className="text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">View Series</div>
                    </div>
                    <div className="text-gold text-2xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">↗</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section
        id="contact"
        className="py-20 md:py-32 border-t border-gold/15"
        style={{
          background: "linear-gradient(145deg, oklch(0 0 0), oklch(0.07 0.012 70))",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-[0.7rem] tracking-[0.3em] text-gold uppercase">— Let's Create</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 gold-gradient-text leading-[1.05]">
              Your Signature<br />Moment Awaits.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-md leading-relaxed">
              Reach out for bespoke packages, location consultation, or to simply say
              hello. We typically reply within 12 hours.
            </p>
            <button
              onClick={() =>
                showToast("✨ We'll craft your dream shoot. Our team will reach out shortly ✨")
              }
              className="btn-glow mt-8 px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase"
            >
              Request Consultation →
            </button>
          </div>

          <div className="grid gap-4">
            {[
              { label: "Phone", value: "+60 16-749 6806", icon: "📞" },
              { label: "Email", value: "studio@oviyam.com", icon: "✉️" },
              { label: "Instagram", value: "@oviyam.studio", icon: "📷" },
              { label: "Studio", value: "Kuala Lumpur, Malaysia", icon: "📍" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-5 p-5 md:p-6 border border-gold/20 rounded-2xl hover:border-gold/60 hover:bg-gold/[0.03] transition-all"
              >
                <div className="text-2xl">{c.icon}</div>
                <div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="font-display text-lg md:text-xl text-gold-soft mt-0.5">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 bg-background">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-12 md:py-16 grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-display text-2xl font-bold text-gold">ஒviyam Studio</div>
            <div className="text-[0.65rem] tracking-[0.25em] text-gold/70 mt-2">
              PHOTOGRAPHY · FILMS
            </div>
            <p className="text-muted-foreground text-sm mt-5 max-w-xs leading-relaxed">
              Cinematic storytelling for the moments worth keeping.
            </p>
          </div>
          <div>
            <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="text-foreground/80 hover:text-gold transition">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold mb-4">Follow</div>
            <div className="flex gap-3 text-xl">
              {["📷", "📘", "🎵", "▶️"].map((s, i) => (
                <button key={i} className="w-11 h-11 flex items-center justify-center rounded-full border border-gold/25 hover:border-gold hover:bg-gold/10 transition">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gold/10">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground tracking-wider">
            <p>© 2025 ஒviyam Studio. All rights reserved.</p>
            <p>Black & Gold · Social Photoshoot Curators</p>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-gold text-primary-foreground font-semibold text-sm shadow-2xl">
          {toast}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-5 right-5 md:top-7 md:right-7 w-11 h-11 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition flex items-center justify-center text-xl z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 md:top-7 md:left-7 text-[0.7rem] tracking-[0.3em] uppercase text-gold/80 z-10">
            {String(lightboxIdx + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition items-center justify-center text-2xl z-10"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image + Caption */}
          <div
            className="relative max-w-[92vw] max-h-[85vh] flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIdx}
              src={gallery[lightboxIdx].img}
              alt={gallery[lightboxIdx].label}
              className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            />
            <div className="text-center">
              <div className="text-[0.65rem] tracking-[0.3em] uppercase text-gold/80 mb-2">
                {gallery[lightboxIdx].category}
              </div>
              <div className="font-display text-xl md:text-3xl gold-gradient-text">
                {gallery[lightboxIdx].label}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-black transition items-center justify-center text-2xl z-10"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Mobile dot indicators */}
          <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                className={`h-1.5 rounded-full transition-all ${idx === lightboxIdx ? "w-6 bg-gold" : "w-1.5 bg-gold/40"}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/60167496806?text=Hi%20%E0%AE%92viyam%20Studio%2C%20I%27d%20like%20to%20enquire%20about%20a%20photoshoot."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[150] group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span className="relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-black/40 transition-all hover:scale-105">
          <MessageCircle className="w-5 h-5 fill-white" strokeWidth={2} />
          <span className="hidden sm:inline text-xs font-semibold tracking-wider">
            +60 16-749 6806
          </span>
        </span>
      </a>
    </div>
  );
}
