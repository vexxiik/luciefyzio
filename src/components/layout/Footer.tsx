import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");

  return (
    <footer className="bg-background relative">
      {/* Pre-footer CTA */}
      <div className="relative border-b border-stone-200/50 bg-stone-50/50 overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-[100%] blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10 flex flex-col items-center">
          <div className="bg-white/60 backdrop-blur-xl border border-stone-200/60 shadow-xl shadow-black/5 rounded-[3rem] p-10 md:p-16 max-w-4xl w-full">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-6">
              Jste připraveni na změnu?
            </h2>
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Začněte svou cestu k životu bez bolesti ještě dnes. Objednejte se na první konzultaci.
            </p>
            <Link
              href="/booking"
              className={buttonVariants({ 
                size: "lg", 
                className: "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-primary/30 rounded-2xl py-4 px-10 h-auto text-lg font-bold group" 
              })}
            >
              {tCommon("book_now")}
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 pr-0 lg:pr-8">
            <Link href="/" className="font-heading text-3xl font-bold tracking-tighter text-stone-900">
              Lucie<span className="text-primary">Fyzio</span>
            </Link>
            <p className="text-stone-600 max-w-sm text-base md:text-lg leading-relaxed">
              {t("description")} Moderní fyzioterapie s respektem k vašemu tělu.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="w-11 h-11 rounded-full bg-stone-200/50 flex items-center justify-center text-stone-600 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-stone-200/50 flex items-center justify-center text-stone-600 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-5">
            <h4 className="font-bold text-lg text-stone-900 tracking-tight">{t("links")}</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/about" className="text-stone-600 hover:text-primary font-medium transition-all duration-300 flex items-center gap-1 group">
                <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                <span>{tNav("about")}</span>
              </Link>
              <Link href="/services" className="text-stone-600 hover:text-primary font-medium transition-all duration-300 flex items-center gap-1 group">
                <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                <span>{tNav("services")}</span>
              </Link>
              <Link href="/move" className="text-stone-600 hover:text-primary font-medium transition-all duration-300 flex items-center gap-1 group">
                <ChevronRight className="w-4 h-4 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-primary" />
                <span>{tNav("move_concept")}</span>
              </Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-8 lg:col-span-3 flex flex-col gap-5">
            <h4 className="font-bold text-lg text-stone-900 tracking-tight">{t("contact")}</h4>
            <div className="flex flex-col gap-5 text-stone-600 font-medium">
              <div className="flex items-start gap-3 group">
                <div className="mt-1 p-2 bg-stone-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="leading-relaxed group-hover:text-stone-900 transition-colors">Na Okrajích 78<br/>530 02 Spojil</p>
              </div>
              <a href="mailto:l.flegrova@gmail.com" className="flex items-center gap-3 hover:text-stone-900 transition-colors break-all group">
                <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                l.flegrova@gmail.com
              </a>
              <a href="tel:+420724372320" className="flex items-center gap-3 hover:text-stone-900 transition-colors group">
                <div className="p-2 bg-stone-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                +420 724 372 320
              </a>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col">
             <div className="w-full h-[250px] lg:h-full min-h-[250px] rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-stone-200/60 bg-stone-100 group relative">
                <iframe 
                  src="https://maps.google.com/maps?q=Na%20Okrajích%2078,%20530%2002%20Spojil&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Lucie Fyzio"
                  className="transition-all duration-700 ease-in-out"
                ></iframe>
                {/* Optional overlay hint to interact */}
                <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-3xl z-10 mix-blend-overlay"></div>
              </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200/60 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-stone-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} LucieFyzio. {t("rights")}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-stone-900 transition-colors">
              Ochrana osobních údajů
            </Link>
            <Link href="/terms" className="hover:text-stone-900 transition-colors">
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
