import { DM_Sans, Poppins, Sora, Source_Code_Pro, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-sourceCodePro",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const aeonik = localFont({
  src: "../public/fonts/AeonikMonoVF-Roman.ttf",
  variable: "--font-aeonik",
});

const offbit = localFont({
  src: "../public/fonts/OffBit-Bold.ttf",
  variable: "--font-offbit",
});

const fkraster = localFont({
  src: "../public/fonts/FKRasterGroteskVariable.ttf",
  variable: "--font-fkraster",
});

export const fonts = [poppins, dmSans, sourceCodePro, sora, aeonik, spaceGrotesk, offbit, fkraster].map(
  (font) => font.variable
);
