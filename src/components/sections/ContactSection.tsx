"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1 text-foreground">
                  {t("address_title")}
                </h3>
                <p className="text-muted-foreground">{t("address")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1 text-foreground">
                  {t("email_title")}
                </h3>
                <a href={`mailto:${t("email")}`} className="text-primary hover:underline">
                  {t("email")}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold mb-1 text-foreground">
                  {t("phone_title")}
                </h3>
                <a href={`tel:${t("phone").replace(/\s/g, "")}`} className="text-primary hover:underline">
                  {t("phone")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card p-8 rounded-3xl shadow-xl border border-border/50"
          >
            <h2 className="font-heading text-2xl font-semibold mb-6 text-foreground">
              {t("form_title")}
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  {t("form_name")}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  {t("form_email")}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="jan.novak@email.cz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  {t("form_message")}
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="..."
                />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-accent rounded-xl py-6 font-semibold">
                {t("form_submit")}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
