import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SITE_CONFIG from "@/lib/constants/site-config";
import type { PropsWithChildren } from "@/lib/types";

import Providers from "./components/providers";

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex min-h-screen w-full flex-col overflow-x-hidden antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
