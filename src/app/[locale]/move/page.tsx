import { setRequestLocale } from "next-intl/server";
import { MoveSection } from "@/components/sections/MoveSection";
import { StickyCTA } from "@/components/layout/StickyCTA";

export default async function MovePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <MoveSection />
      <StickyCTA />
    </>
  );
}
