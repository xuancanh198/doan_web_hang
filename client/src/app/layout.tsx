import { Outfit } from "next/font/google";
import "./globals.css";
import "@/asset/css/core.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { getLocale, getMessages } from 'next-intl/server';
import ProgressBar from "@/components/core/progress-bar"
const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ThemeProvider>
          <ProgressBar/>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
