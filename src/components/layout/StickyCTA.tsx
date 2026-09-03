"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { CalendarCheck } from "lucide-react";

export function StickyCTA() {
  const tCommon = useTranslations("Common");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 400);
  });

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-gradient-to-t from-background via-background/95 to-transparent pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <Link href="/booking" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-accent rounded-full py-4 text-base font-semibold shadow-2xl active:scale-95 transition-all">
        <CalendarCheck className="w-5 h-5" />
        {tCommon("book_now")}
      </Link>
    </motion.div>
  );
}
