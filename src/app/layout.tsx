import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load custom Windows 98 fonts
const msw98Regular = localFont({
  src: "../../public/font/MSW98UI-Regular.ttf",
  variable: "--font-msw98-regular",
  weight: "400",
});

const msw98Bold = localFont({
  src: "../../public/font/MSW98UI-Bold.ttf",
  variable: "--font-msw98-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Portfolio | sakila lakmal",
  description: "sakila lakmal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${msw98Regular.variable} ${msw98Bold.variable}`}>
        {children}
      </body>
    </html>
  );
}
