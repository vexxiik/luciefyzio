import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BookingConfirmationProps {
  customerName: string;
  serviceName: string;
  date: Date;
}

export const BookingConfirmationEmail = ({
  customerName = "Kliente",
  serviceName = "Fyzioterapie",
  date = new Date(),
}: BookingConfirmationProps) => {
  const formattedDate = new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);

  return (
    <Html>
      <Head />
      <Preview>Potvrzení rezervace: {serviceName} u LucieFyzio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>LucieFyzio</Heading>
          <Text style={text}>Dobrý den, {customerName},</Text>
          <Text style={text}>
            Vaše rezervace byla úspěšně potvrzena. Těším se na naši společnou cestu za zdravým pohybem.
          </Text>
          <Section style={section}>
            <Text style={textBold}>Detaily rezervace:</Text>
            <Text style={text}>Služba: {serviceName}</Text>
            <Text style={text}>Termín: {formattedDate}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            LucieFyzio | Vaše tělo, váš pohyb, vaše zdraví.<br />
            Pokud potřebujete termín změnit, kontaktujte mě prosím co nejdříve.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f5f2eb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  marginTop: "40px",
  marginBottom: "40px",
  maxWidth: "600px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const h1 = {
  color: "#8f9c88", // Sage green
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const textBold = {
  ...text,
  fontWeight: "bold",
};

const section = {
  padding: "24px",
  backgroundColor: "#faf8f5",
  borderRadius: "8px",
  margin: "24px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center" as const,
};

export default BookingConfirmationEmail;
