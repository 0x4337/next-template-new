import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fonts } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Placeholder Title",
  description: "Placeholder description.",
  openGraph: {
    type: "website",
    url: "https://placeholder.url",
    title: "Placeholder Title",
    description: "Placeholder description.",
    images: [
      {
        url: "https://placeholder.url/images/placeholder.png",
        width: 800,
        height: 600,
        alt: "Placeholder Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Placeholder Title",
    description: "Placeholder description.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen max-w-[2560px] mx-auto antialiased", ...fonts)}>
          <Toaster />

          <Providers>
            <div className="relative flex flex-col">
              {/* HEADER */}
              {children}
              {/* FOOTER */}
            </div>
          </Providers>
        </body>
      </html>
    </>
  );
}
