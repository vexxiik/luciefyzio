"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Decorative noise/gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Side: Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-black/5 shadow-sm w-fit mb-6">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Moderní Fyzioterapie</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-foreground mb-6">
              Vraťte svému tělu <span className="text-primary relative inline-block">
                radost z pohybu
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 font-medium max-w-2xl mb-10 leading-relaxed">
              {t("subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                href="/booking"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30 rounded-2xl py-4 px-10 h-auto text-lg font-bold group"
                })}
              >
                {tCommon("book_now")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex flex-col">
                  <div className="flex items-center text-accent">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <span className="text-sm font-semibold text-foreground/80 mt-1">{t("trust_line")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Asymmetrical Image & Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* The main abstract shape / image container */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-primary/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-multiply z-10" />
              <Image
                src="/img/lucie.jpg"
                alt="Lucie Fyzio"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Badge 1 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl border border-black/5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                5+
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Let praxe</p>
                <p className="text-xs text-foreground/60">V oboru fyzioterapie</p>
              </div>
            </motion.div>


          </motion.div>

        </div>
      </div>
    </section>
  );
}
