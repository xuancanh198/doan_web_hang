import { Outfit } from "next/font/google";
import { getLocale, getMessages } from 'next-intl/server';
import ProvidersAdmin from "@/app/[admin]/providersAdmin";


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
  const messages = await getMessages();
  return (
    <ProvidersAdmin locale={locale} messages={messages}>{children}</ProvidersAdmin>
  );
}
