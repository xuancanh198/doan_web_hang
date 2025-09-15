"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setRouterRedirectTo } from "@/lib/redux/Features/Global";

export default function RedirectHandler() {
  const router = useRouter();
  const dispatch = useDispatch();
  const routerRedirectTo = useSelector((state: any) => state.global.routerRedirectTo);

  useEffect(() => {
    if (routerRedirectTo) {
      router.push(routerRedirectTo);
      dispatch(setRouterRedirectTo("")); // reset state
    }
  }, [routerRedirectTo, router, dispatch]);

  return null; // không render gì cả
}
