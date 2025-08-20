"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import React from "react";
import App from "@/app/[admin]/app";
import { NextIntlClientProvider } from 'next-intl';
type ProvidersProps = {
  children: React.ReactNode;
   locale: string;
   messages: Record<string, any>; 
};

export default function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <Provider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale}>  
        <App children={children} />
      </NextIntlClientProvider>
    </Provider>
  );
}
