import "./globals.css";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mine Treasure",
  description: "Mine treasure is a Minecraft datapack which aims to enhance the mining experience. This datapack does so by making treasure randomly spawn while mining.",
  icons: {
    icon: "/images/Mine_Treasure.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
