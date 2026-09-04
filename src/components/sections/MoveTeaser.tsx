"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export function MoveTeaser() {
  const t = useTranslations("Move");
  const tCommon = useTranslations("Common");

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-stone-50 text-foreground flex items-center justify-center min-h-[70vh]"
    >
      {/* Static Playful Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-emerald-300/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div style={{ scale, y }} className="max-w-4xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-primary">
            Unikátní metoda
          </p>
          <div className="relative inline-block mb-8">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-stone-900 to-stone-600">
              M.O.V.E.
            </h2>
            <svg className="absolute w-[110%] h-[30%] -bottom-[5%] -left-[5%] text-primary opacity-60 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path 
                d="M 5 15 Q 30 5, 50 15 T 95 10" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="transparent"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </svg>
          </div>
          <p className="text-xl md:text-2xl font-medium mb-8 text-stone-600 leading-tight max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
          
          <TypewriterEffect />

          <Link
            href="/move"
            className={buttonVariants({
              size: "lg",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20 rounded-full py-6 px-10 h-auto text-xl font-bold group"
            })}
          >
            Objevte koncept
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const MOVE_WORDS = ["Motivace", "Odvaha", "Vytrvalost", "Energie"];

function TypewriterEffect() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = MOVE_WORDS[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < word.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % MOVE_WORDS.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 mb-14">
      <p className="text-lg md:text-xl text-stone-500 font-medium">Co pro nás znamená M.O.V.E.?</p>
      <div className="text-4xl md:text-5xl font-bold text-stone-800 h-[1.2em] flex items-center justify-center">
        <span>{currentText}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[3px] h-[0.9em] bg-primary ml-1"
        />
      </div>
    </div>
  );
}
