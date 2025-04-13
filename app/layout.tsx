import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Sidebar from "./(ui)/sidebar";
import { getPageList } from "@/get-pages";
config.autoAddCss = false

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Recordkeeper',
    default: 'Recordkeeper',
  },
  description: "A simple, fast wiki.",
  openGraph: {
    description: 'A simple, fast wiki.',
    siteName: 'Recordkeeper',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://github.com/aelithron/recordkeeper/blob/main/app/opengraph-image.png?raw=true',
        alt: 'Recordkeeper logo',
      },
    ],
  },
  category: "wiki",
  keywords: [
    "wiki",
    "recordkeeper",
    "documentation",
    "knowledge base",
    "open source",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Sidebar pages={getPageList()} webEditorEnabled={process.env.WEBEDITOR === "true"} />
        {children}
      </body>
    </html>
  );
}
