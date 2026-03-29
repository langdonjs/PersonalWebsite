import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import BackgroundBanner from "./components/BackgroundBanner";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Langdon Huynh | Personal Site",
  description:
    "CS and Applied Math student at UC Berkeley who builds web and mobile apps.",
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
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-black text-slate-100 antialiased`}>
        <BackgroundBanner />
        {children}
      </body>
    </html>
  );
}
