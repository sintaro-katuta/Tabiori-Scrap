import type { Metadata } from "next";
import { Kaisei_Decol } from "next/font/google";
import "./globals.css";

const kaiseiDecol = Kaisei_Decol({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kaisei",
});

export const metadata: Metadata = {
  title: "Tsuzuri",
  description: "旅の計画と記録を、ひとつの綴り（タイムライン）に。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={kaiseiDecol.className}>
        {children}
      </body>
    </html>
  );
}
