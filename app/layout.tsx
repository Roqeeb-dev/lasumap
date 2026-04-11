import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LASU Navigate",
  description:
    "Interactive campus navigation map for Lagos State University. Find buildings, facilities and departments across the LASU Ojo campus.",
  keywords: [
    "LASU",
    "Lagos State University",
    "campus map",
    "navigation",
    "Ojo",
  ],
  authors: [{ name: "Roqeeb" }],
  openGraph: {
    title: "LASU Navigate",
    description:
      "Find any building or facility on the Lagos State University campus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
