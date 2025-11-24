import type { Metadata } from "next";
import { Inter, Nunito, Roboto_Flex } from "next/font/google";
import "./globals.css";
import PageWrapper from "./pageWrapper";
import { Toaster } from "@/components/ui/sooner";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className="w-full max-h-screen overflow-auto bg-background antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PageWrapper>{children}</PageWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
