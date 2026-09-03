"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              {/* Placeholder for the professional photo */}
              <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted-foreground text-center p-8">
                <span className="text-lg">[ Profesionální fotografie fyzioterapeutky Lucie ]</span>
              </div>
            </div>
            {/* Accent floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 md:-right-12 bg-card p-6 rounded-2xl shadow-xl border border-border/50 max-w-[240px]"
            >
              <p className="text-sm font-medium text-foreground italic">
                "{t("subtitle")}"
              </p>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t("title")}
            </h1>
            
            <div className="space-y-6 text-lg text-muted-foreground mb-12 leading-relaxed">
              <h2 className="text-2xl font-heading text-primary font-semibold mb-4">
                {t("story_title")}
              </h2>
              <p>{t("story_p1")}</p>
              <p>{t("story_p2")}</p>
            </div>

            <div className="bg-secondary/20 rounded-2xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-foreground">
                  {t("education_title")}
                </h3>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{t(`edu_${item}` as any)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
