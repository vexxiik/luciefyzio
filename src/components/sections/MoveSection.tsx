"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function MoveSection() {
  const t = useTranslations("Move");

  const letters = ["m", "o", "v", "e"];
  
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24 md:mb-32"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 text-foreground">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* M.O.V.E Letters Timeline */}
        <div className="space-y-24 md:space-y-32 max-w-5xl mx-auto">
          {letters.map((letter, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Big Letter */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative">
                  {/* Decorative blur behind letter */}
                  <div className="absolute w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
                  <span className="font-heading text-[12rem] leading-none font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent opacity-90 drop-shadow-xl relative z-10">
                    {letter.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <h3 className="font-heading text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                    {t(`${letter}_title` as any)}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t(`${letter}_desc` as any)}
                  </p>
                  <div className="w-16 h-1 bg-accent rounded-full mt-8 opacity-50" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
