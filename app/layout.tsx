import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessioWrapper from "@/components/global/SessioWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Track, manage, and save your expenses with ease. Our website helps you reach your financial goals.",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessioWrapper session={session}>
          {children}
          </SessioWrapper>
        </body>
      </html>
  );
}
