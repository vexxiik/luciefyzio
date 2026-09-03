import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import { StickyCTA } from "@/components/layout/StickyCTA";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutSection />
      <StickyCTA />
    </>
  );
}
