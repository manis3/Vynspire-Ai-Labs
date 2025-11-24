import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Nunito,
  Roboto_Flex,
} from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vynspire Ai Labs",
};
export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  variable: "--font-roboto-flex",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} ${nunito.variable} ${inter.variable} w-full max-h-screen overflow-auto bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
