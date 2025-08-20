"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Tùy chỉnh nếu cần
NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
