"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Po letech chronických bolestí zad jsem konečně našla úlevu. Paní Lucie má neuvěřitelně osobní a komplexní přístup. Nezajímá ji jen to, co bolí, ale hlavně proč to bolí.",
    author: "Jana M.",
    role: "Manažerka"
  },
  {
    id: 2,
    text: "Koncept M.O.V.E. mi otevřel oči. Zjistil jsem, jak moc moje psychika ovlivňovala mé fyzické problémy. Díky této terapii se cítím o 10 let mladší a plný energie.",
    author: "Tomáš K.",
    role: "Aktivní sportovec"
  },
  {
    id: 3,
    text: "Péče v těhotenství byla naprosto k nezaplacení. Cítila jsem se bezpečně a bolesti zad, kterých jsem se tolik bála, jsme zvládly vyřešit dříve, než se vůbec objevily.",
    author: "Petra S.",
    role: "Maminka na mateřské"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          
          <Quote className="w-16 h-16 mx-auto text-primary/20 mb-8" />
          
          <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-xl md:text-3xl font-medium text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                <div>
                  <h4 className="text-lg font-bold text-foreground">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-foreground/60">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all shadow-sm"
              aria-label="Předchozí reference"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/50"
                  }`}
                  aria-label={`Přejít na referenci ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-foreground hover:text-primary hover:scale-110 transition-all shadow-sm"
              aria-label="Další reference"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
