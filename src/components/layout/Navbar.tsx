"use client";

import * as React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const t = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled
            ? "w-full max-w-5xl bg-background/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 border border-white/20"
            : "w-full max-w-7xl bg-transparent px-2 py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading text-2xl font-bold tracking-tighter text-foreground transition-colors group-hover:text-primary">
            Lucie<span className="text-primary">Fyzio</span>
          </span>
        </Link>

        {/* Desktop Nav - Pill Design */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full shadow-sm border border-black/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-white/80 px-4 py-2 rounded-full transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/booking"
            className={buttonVariants({ 
              className: "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all shadow-xl shadow-accent/20 rounded-full py-3 px-8 h-auto font-bold tracking-wide" 
            })}
          >
            {tCommon("book_now")}
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center gap-3">
          <Sheet>
            <SheetTrigger
              render={
                <button type="button" className="inline-flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-black/5 p-2.5 text-foreground hover:bg-white transition-colors" />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col justify-between border-l-border/50 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Navigace menu</SheetTitle>
              <SheetDescription className="sr-only">Odkazy na hlavní sekce webu.</SheetDescription>
              
              <div className="flex flex-col gap-12 mt-20 px-8">
                <Link href="/" className="font-heading text-4xl font-bold tracking-tighter text-foreground">
                  Lucie<span className="text-primary">Fyzio</span>
                </Link>
                <nav className="flex flex-col gap-8">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} render={<Link href={link.href} className="text-2xl font-medium tracking-tight text-foreground/70 hover:text-primary transition-colors" />}>
                      {link.name}
                    </SheetClose>
                  ))}
                </nav>
              </div>
              <div className="pb-12 px-8">
                <SheetClose
                  render={
                    <Link
                      href="/booking"
                      className={buttonVariants({ className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 rounded-2xl py-6 text-xl font-bold" })}
                    />
                  }
                >
                  {tCommon("book_now")}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
