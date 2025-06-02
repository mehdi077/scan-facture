import type { Metadata } from "next";
import { IBM_Plex_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import SyncUserWithConvex from "@/components/SyncUserWithConvex";
import ClientAuthOverlayGate from "@/components/ClientAuthOverlayGate";


const ibmPlexSansDevanagari = IBM_Plex_Sans_Devanagari({
  variable: "--font-ibm-plex-sans-devanagari",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Scan Facture",
  description: "convertir les images en excel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ConvexClientProvider>
      <ClerkProvider>
        <html lang="fr" suppressHydrationWarning>
          <head>
            {/* Set initial theme before React loads to avoid FOUC */}
            <script dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (!theme) {
                      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch (e) {}
                })();
              `
            }} />
          </head>
          <body
            className={`${ibmPlexSansDevanagari.variable} antialiased`}
          >
            <SyncUserWithConvex />
            <ClientAuthOverlayGate />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ConvexClientProvider>
  );
}
