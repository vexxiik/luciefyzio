import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Admin");

  // Fetch bookings from Prisma (with fallback for development if DB fails)
  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
      orderBy: {
        date: "desc",
      },
    });
  } catch (error) {
    console.warn("DB not connected, using mock data for admin");
    bookings = [
      {
        id: "1",
        date: new Date(Date.now() + 86400000),
        status: "PENDING",
        user: { name: "Jan Novák", email: "jan@example.com" },
        service: { title: "Bolesti zad a páteře" },
      },
      {
        id: "2",
        date: new Date(),
        status: "CONFIRMED",
        user: { name: "Eva Svobodová", email: "eva@example.com" },
        service: { title: "Sportovní fyzioterapie" },
      },
    ] as any;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CONFIRMED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-heading text-3xl font-bold mb-8 text-foreground">
          {t("title")} - {t("bookings_title")}
        </h1>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4">{t("date")}</th>
                  <th className="px-6 py-4">{t("client")}</th>
                  <th className="px-6 py-4">{t("service")}</th>
                  <th className="px-6 py-4">{t("status")}</th>
                  <th className="px-6 py-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      {t("no_bookings")}
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                        {format(new Date(booking.date), "d. MMMM yyyy, HH:mm", { locale: cs })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{booking.user?.name || "Neznámý"}</div>
                        <div className="text-muted-foreground text-xs">{booking.user?.email}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {booking.service?.title || "Neznámá služba"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {t(`status_${booking.status.toLowerCase()}` as any)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded transition-colors">
                            {t("confirm_btn")}
                          </button>
                          <button className="text-xs px-3 py-1.5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors">
                            {t("cancel_btn")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
