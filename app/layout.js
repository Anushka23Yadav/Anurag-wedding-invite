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
  title: "Wedding of Garima & Anurag | Nov 26, 2026",
  description:
    "You are cordially invited to the wedding celebration of Garima & Anurag on 26th November 2026 at Regal Resort, Satbari, Chhatarpur, Delhi.",
  openGraph: {
    title: "Wedding of Garima & Anurag | Nov 26, 2026",
    description:
      "You are cordially invited to the wedding celebration of Garima & Anurag on 26th November 2026 at Regal Resort, Satbari, Chhatarpur, Delhi.",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Garima & Anurag Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding of Garima & Anurag | Nov 26, 2026",
    description:
      "You are cordially invited to the wedding celebration of Garima & Anurag.",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          property="og:image"
          content="/assets/og-image.jpg"
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${greatVibes.variable} ${lato.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
