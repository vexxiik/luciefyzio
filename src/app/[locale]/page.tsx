import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MoveTeaser } from "@/components/sections/MoveTeaser";
import { Testimonials } from "@/components/sections/Testimonials";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MoveTeaser />
      <Testimonials />
    </>
  );
}
