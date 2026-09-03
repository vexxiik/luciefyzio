"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const otherServices = [
  {
    id: "post_op",
    colSpan: "md:col-span-1",
  },
  {
    id: "sport",
    colSpan: "md:col-span-1",
  },
  {
    id: "headache",
    colSpan: "md:col-span-2",
  },
  {
    id: "pregnancy",
    colSpan: "md:col-span-2",
  },
  {
    id: "posture",
    colSpan: "md:col-span-2",
  },
];

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section className="py-32 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-foreground/80 font-medium leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-foreground/80 hover:text-primary transition-colors group">
            Všechny služby 
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Integrated Bento Surface Panel - Minimalist */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          {/* Inner grid with extremely subtle gaps (off-white bg creates the divider) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1 bg-[#f9f9f9] rounded-[1.75rem] md:rounded-[2.75rem] overflow-hidden">
            
            {/* Feature Cell (Large) */}
            <div className="bg-white col-span-1 md:col-span-2 md:row-span-2 relative min-h-[450px] flex items-end p-10 md:p-12 group overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Fyzioterapie zad a páteře" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" 
              />
              {/* Very subtle gradient just for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="relative z-10 text-white w-full max-w-sm">
                <h3 className="text-3xl font-medium mb-3 tracking-tight">
                  {t("back_pain_title")}
                </h3>
                <p className="text-white/90 font-light text-sm md:text-base leading-relaxed">
                  {t("back_pain_desc")}
                </p>
              </div>
            </div>

            {/* Smaller Interactive Cells */}
            {otherServices.map((service) => (
              <ServiceCell key={service.id} service={service} t={t} />
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

function ServiceCell({ service, t }: { service: any; t: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white p-10 flex flex-col justify-end relative overflow-hidden text-left min-h-[225px] transition-colors duration-500 hover:bg-[#fafafa] ${service.colSpan}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mt-auto relative z-10 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {t(`${service.id}_title`)}
          </h3>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 ml-4"
          >
            <Plus className={`w-5 h-5 ${isHovered ? "text-foreground/80" : "text-foreground/20"} transition-colors duration-300`} />
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <p className="text-foreground/60 text-sm mt-4 font-light leading-relaxed">
                {t(`${service.id}_desc`)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
