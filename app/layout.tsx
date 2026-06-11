import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Langdon Huynh",
  description:
    "ML engineer + full stack developer. CS + Applied Math @ UC Berkeley. Building AI systems at the edge of vision and language.",
  icons: {
    icon: "/snorlax-icon.jpg",
    shortcut: "/snorlax-icon.jpg",
    apple: "/snorlax-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${inter.variable} bg-[#f8f7f4] text-[#111] antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
