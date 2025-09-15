"use client";
import React from "react";
import App from "@/app/[admin]/app";
type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (  
        <App children={children} />
  );
}
