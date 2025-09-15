"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import ProgressBar from "@/components/core/progress-bar";
import React from "react";
import RedirectHandler from "@/app/RedirectHandler"
type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <ProgressBar />
          <SidebarProvider>
            <>
            <RedirectHandler/>
            {children}
            </>
          </SidebarProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </Provider>
  );
}
    