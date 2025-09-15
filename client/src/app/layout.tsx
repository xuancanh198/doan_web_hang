import { Outfit } from "next/font/google";
import "./globals.css";
import "@/asset/css/core.css";
import { getLocale, getMessages } from "next-intl/server";
import Providers from "@/app/Providers";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
