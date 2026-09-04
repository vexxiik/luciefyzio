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
  const [isOpen, setIsOpen] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("move_concept"), href: "/move" },
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
            ? "w-full max-w-5xl bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full px-6 py-3 border border-stone-200/50"
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
        <nav className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500 ease-in-out border ${
          isScrolled 
            ? "bg-white/0 backdrop-blur-none border-stone-200/0 shadow-none" 
            : "bg-white/90 backdrop-blur-lg border-stone-200/60 shadow-md"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-base font-semibold text-foreground/80 hover:text-foreground px-5 py-2.5 rounded-full transition-all group"
            >
              {link.name}
              <span className="absolute left-5 right-5 bottom-2 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <button type="button" className="inline-flex items-center justify-center p-2 text-foreground hover:text-primary transition-colors focus:outline-none z-[60] relative" />
              }
            >
              <div className="relative flex flex-col justify-center items-center w-8 h-8 gap-1.5 overflow-hidden">
                <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "translate-y-[8px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out ${isOpen ? "opacity-0 translate-x-2" : ""}`} />
                <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false} className="w-[300px] sm:w-[400px] flex flex-col justify-between border-l-border/50 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Navigace menu</SheetTitle>
              <SheetDescription className="sr-only">Odkazy na hlavní sekce webu.</SheetDescription>
              
              {/* Custom Close Button for Mobile Menu */}
              <SheetClose
                nativeButton={false}
                render={
                  <button type="button" className="absolute top-6 right-6 inline-flex items-center justify-center p-2 text-foreground hover:text-primary transition-colors focus:outline-none z-[60]">
                    <div className="relative flex flex-col justify-center items-center w-8 h-8 gap-1.5 overflow-hidden">
                      <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "translate-y-[8px] rotate-45" : ""}`} />
                      <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out ${isOpen ? "opacity-0 translate-x-2" : ""}`} />
                      <span className={`block h-[2px] w-6 bg-current rounded-full transition-all duration-300 ease-out origin-center ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
                    </div>
                    <span className="sr-only">Zavřít menu</span>
                  </button>
                }
              />

              <div className="flex flex-col gap-12 mt-20 px-8">
                <Link href="/" className="font-heading text-4xl font-bold tracking-tighter text-foreground">
                  Lucie<span className="text-primary">Fyzio</span>
                </Link>
                <nav className="flex flex-col gap-8">
                  {navLinks.map((link) => (
                    <SheetClose 
                      key={link.href} 
                      nativeButton={false}
                      render={<Link href={link.href} className="text-2xl font-medium tracking-tight text-foreground/70 hover:text-primary transition-colors" />}
                    >
                      {link.name}
                    </SheetClose>
                  ))}
                </nav>
              </div>
              <div className="pb-12 px-8">
                <SheetClose
                  nativeButton={false}
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
