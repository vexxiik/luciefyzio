import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { BookingCalendar } from "@/components/sections/BookingCalendar";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Booking");

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <BookingCalendar />
      </div>
    </div>
  );
}
