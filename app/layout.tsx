import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lasunav-sable.vercel.app"),

  title: {
    default: "LASU Navigate",
    template: "%s | LASU Navigate",
  },

  description:
    "LASU Navigate is an interactive campus navigation system designed to help students, staff, and visitors easily locate buildings, departments, and facilities within Lagos State University, Ojo.",

  keywords: [
    "LASU navigation",
    "Lagos State University map",
    "LASU campus guide",
    "LASU Ojo map",
    "campus navigation app",
    "student navigation system",
    "LASU buildings and locations",
  ],

  authors: [{ name: "Shafiriyu Roqeeb" }],
  creator: "Shafiriyu Roqeeb",
  applicationName: "LASU Navigate",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "LASU Navigate – Smart Campus Navigation",
    description:
      "Easily explore Lagos State University with real-time navigation. Find lecture halls, faculties, offices, and key facilities across LASU Ojo campus.",
    url: "https://lasunav-sable.vercel.app",
    siteName: "LASU Navigate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LASU Navigate Campus Map",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LASU Navigate – Campus Navigation Made Easy",
    description:
      "Navigate Lagos State University effortlessly. Discover buildings, routes, and facilities in seconds.",
    images: ["/og-image.png"],
  },

  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-hidden">
        {children}
      </body>
    </html>
  );
}
