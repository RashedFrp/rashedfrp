import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rashed FRP Tools",
  description: "Minimalist FRP bypass tools and shortcuts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
    }
