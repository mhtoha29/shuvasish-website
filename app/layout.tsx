import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shuvasish Bhowmick — Engineer. Changemaker. Creator. Father.",
  description:
    "Country Director at ATEC Global. Sustainability pioneer. Creator of Baap Ka Beta. Mechanical Engineer. TEDx Speaker. Asia's Top Digital Marketeer 2025.",
  openGraph: {
    title: "Shuvasish Bhowmick",
    description: "Engineer. Changemaker. Creator. Father.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Botpress floating chat widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                var s = document.createElement('script');
                s.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
                s.onload = function() {
                  if (window.botpress) {
                    window.botpress.init({
                      configUrl: 'https://files.bpcontent.cloud/2026/06/19/16/20260619163626-OFBBTMBF.json'
                    });
                  }
                };
                document.head.appendChild(s);
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
