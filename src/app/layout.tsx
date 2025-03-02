import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | Detalk",
    default: "Detalk - Product Deserves to Be Seen",
  },
  description:
    "Detalk is where innovation meets community. Connect with creators worldwide and share unique product narratives",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-foreground min-h-svh antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
