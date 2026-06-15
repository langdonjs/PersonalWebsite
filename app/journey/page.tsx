import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import JourneyGame from "../components/journey/JourneyGame";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Langdon's World | Langdon Huynh",
  description:
    "A playable, Pokemon-style walk through my life: Langdon's Lodge, Toga Town, and Campanile City.",
};

export default function Journey() {
  return (
    <div className={`${pressStart.variable} font-[family-name:var(--font-press-start)]`}>
      <JourneyGame />
    </div>
  );
}
