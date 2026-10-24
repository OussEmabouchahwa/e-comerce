import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marlow & Reed | Premium Footwear",
  description:
    "Shoes made to be worn down slowly. Full-grain leather, hand-lasted soles and a footbed that fits by the second week. Built in small batches, sold without the markup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&family=Biryani:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
