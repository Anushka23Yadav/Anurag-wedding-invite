import { Cormorant_Garamond, Great_Vibes, Lato } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata = {
  title: "Wedding of Garima & Anurag | Nov 24, 2026",
  description: "Join us in celebrating the beginning of our forever.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${cormorantGaramond.variable} ${greatVibes.variable} ${lato.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
