import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marlow & Reed | Premium Footwear",
  description: "Shoes made to be worn down slowly. Full-grain leather, hand-lasted soles and a footbed that fits by the second week. Built in small batches, sold without the markup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
