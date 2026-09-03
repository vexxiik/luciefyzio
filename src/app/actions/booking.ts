"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import BookingConfirmationEmail from "@/emails/BookingConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return { success: true, data: services };
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return { success: false, error: "Nepodařilo se načíst služby." };
  }
}

export async function createBooking(data: {
  userId: string;
  userEmail: string;
  userName: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  notes?: string;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        userId: data.userId,
        serviceId: data.serviceId,
        date: data.date,
        notes: data.notes,
        status: "PENDING",
      },
    });

    // Send confirmation email asynchronously
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "LucieFyzio <rezervace@luciefyzio.cz>", // Replace with verified domain
        to: [data.userEmail],
        subject: `Potvrzení rezervace: ${data.serviceName}`,
        react: BookingConfirmationEmail({
          customerName: data.userName,
          serviceName: data.serviceName,
          date: data.date,
        }),
      });
    }

    revalidatePath("/bookings");
    
    return { success: true, data: booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Rezervaci se nepodařilo vytvořit. Zkuste to prosím znovu." };
  }
}
