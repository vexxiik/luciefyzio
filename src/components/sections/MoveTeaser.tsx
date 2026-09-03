"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function MoveTeaser() {
  const t = useTranslations("Move");
  const tCommon = useTranslations("Common");
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-accent text-accent-foreground flex items-center justify-center min-h-[70vh]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z%22 fill=%22%23ffffff%22 fill-opacity=%221%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')]"></div>
      
      <motion.div 
        style={{ y }} 
        className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-white/10 blur-3xl rounded-full"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) }} 
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[150%] bg-primary/20 blur-3xl rounded-full"
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div style={{ scale }} className="max-w-4xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-white/80">
            Unikátní metoda
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
            M.O.V.E.
          </h2>
          <p className="text-xl md:text-3xl font-medium mb-12 text-white/90 leading-tight max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          
        </motion.div>
      </div>
    </section>
  );
}
