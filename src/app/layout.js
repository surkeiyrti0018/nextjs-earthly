import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Earthly - Nature sounds",
  description: "Listen to calming nature sounds for relaxation and focus.",
  keywords: "earthly, nature sounds, relaxing sounds, white noise, sleep aid, focus music",
  author: "Earthly Team",
  ogImage: "/og-image.jpg", // รูปภาพที่ใช้สำหรับแชร์บนโซเชียลมีเดีย
  twitterCard: "summary_large_image",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitterCard} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.ogImage} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
