"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DayPicker } from "react-day-picker";
import { cs } from "react-day-picker/locale";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  Clock,
  ChevronRight,
  CheckCircle2,
  Activity,
  HeartPulse,
  Dumbbell,
  Brain,
  Baby,
  Sparkles,
} from "lucide-react";

const MOCK_SERVICES = [
  { id: "1", title: "Bolesti zad a páteře", duration: 60, price: 1200, icon: Activity },
  { id: "2", title: "Pooperační rehabilitace", duration: 45, price: 1000, icon: HeartPulse },
  { id: "3", title: "Sportovní fyzioterapie", duration: 60, price: 1300, icon: Dumbbell },
  { id: "4", title: "Bolesti hlavy a migrény", duration: 45, price: 1000, icon: Brain },
  { id: "5", title: "Těhotenství a porod", duration: 60, price: 1200, icon: Baby },
  { id: "6", title: "Korekce držení těla", duration: 50, price: 1100, icon: Sparkles },
];

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

export function BookingCalendar() {
  const t = useTranslations("Booking");
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof MOCK_SERVICES[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = startOfToday();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 max-w-lg mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-heading text-3xl font-bold mb-4 text-foreground">
          {t("success_title")}
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          {t("success_message")}
        </p>
        <div className="bg-secondary/30 rounded-2xl p-6 mb-8 text-left space-y-2">
          <p className="text-foreground font-medium">{selectedService?.title}</p>
          <p className="text-muted-foreground">
            {selectedDate && format(selectedDate, "d. MMMM yyyy")} v {selectedTime}
          </p>
          <p className="text-muted-foreground">{formData.name} · {formData.email}</p>
        </div>
        <Link href="/" className={buttonVariants({ className: "rounded-full px-8" })}>
          {t("back_home")}
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s < step) setStep(s);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                s === step
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : s < step
                  ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s < step ? "✓" : s}
            </button>
            {s < 4 && (
              <div className={`w-8 md:w-16 h-0.5 ${s < step ? "bg-primary/40" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-8 text-foreground">
              {t("step1")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(2);
                    }}
                    className={`group p-6 rounded-2xl border text-left transition-all hover:shadow-lg hover:border-primary/50 ${
                      selectedService?.id === service.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {service.duration} {t("duration")}
                          </span>
                          <span className="font-medium text-primary">
                            {service.price} {t("price_unit")}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Date */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-8 text-foreground">
              {t("step2")}
            </h2>
            <div className="flex justify-center">
              <div className="bg-card rounded-3xl p-6 border border-border shadow-lg">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) setStep(3);
                  }}
                  locale={cs}
                  disabled={(date) => isBefore(date, today) || date.getDay() === 0}
                  modifiers={{
                    available: (date) => !isBefore(date, today) && date.getDay() !== 0 && isBefore(date, addDays(today, 60)),
                  }}
                  modifiersClassNames={{
                    available: "font-bold",
                  }}
                  classNames={{
                    root: "text-foreground",
                    day: "rounded-xl hover:bg-primary/10 transition-colors h-10 w-10 flex items-center justify-center",
                    selected: "!bg-primary !text-primary-foreground rounded-xl",
                    today: "ring-2 ring-primary/30 rounded-xl",
                    chevron: "fill-primary",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Select Time */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-2 text-foreground">
              {t("step3")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {selectedDate && format(selectedDate, "EEEE, d. MMMM yyyy")}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(4);
                  }}
                  className={`py-3 px-4 rounded-xl border text-center font-medium transition-all hover:border-primary hover:bg-primary/5 ${
                    selectedTime === time
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact Details */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-8 text-foreground">
              {t("step4")}
            </h2>

            {/* Summary */}
            <div className="bg-secondary/30 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <CalendarCheck className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{selectedService?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDate && format(selectedDate, "d. MMMM yyyy")} v {selectedTime} · {selectedService?.duration} {t("duration")}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-primary">
                {selectedService?.price} {t("price_unit")}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("name_label")}</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("email_label")}</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("phone_label")}</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t("notes_label")}</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-accent rounded-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                {t("confirm")}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
