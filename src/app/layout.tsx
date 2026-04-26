import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { portfolioIntro } from "./data/portfolio-content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ujang Setejo — Human Interface Developer",
  description: portfolioIntro.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full bg-[#FFDBBB] antialiased`}>
      <body className="flex min-h-full flex-col bg-[#FFDBBB] text-[#664930]">
        {children}
      </body>
    </html>
  );
}
