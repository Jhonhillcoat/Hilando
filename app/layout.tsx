import type { Metadata } from "next";
import { Caveat, Fraunces, Nunito } from "next/font/google";

import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hilando — Moda circular",
  description:
    "Respondé cinco preguntas, descubrí si conviene donar, reparar o vender, y explorá el marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        fraunces.variable,
        nunito.variable,
        caveat.variable,
        "font-nunito"
      )}
    >
      <body className="min-h-screen bg-crema text-madera antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
