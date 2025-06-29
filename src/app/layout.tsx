import "./globals.css";
import type { Metadata } from "next";
import { siteMetadata } from "../../metadata";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        {children}
        <Toaster position={"top-right"} />
      </body>
    </html>
  );
}
