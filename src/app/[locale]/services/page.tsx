import { setRequestLocale } from "next-intl/server";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StickyCTA } from "@/components/layout/StickyCTA";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-20">
      <ServicesSection />
      <StickyCTA />
    </div>
  );
}
