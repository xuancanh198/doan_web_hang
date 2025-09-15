"use server";
import { cookies } from "next/headers"; // Chỉ dùng trong Server Component / Route

export async function fetchAPI(
  link: string,
  options?: FetchAPIOptions,
  isAdmin: boolean = false
): Promise<Response> {
  const cookieStore = await cookies();

  // Lấy token theo isAdmin
  const token = isAdmin
    ? cookieStore.get("admin_token")?.value
    : cookieStore.get("token_user")?.value;
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/";
  const fetchOptions: RequestInit = {
    ...options,
    cache: options?.cacheForever ? "force-cache" : "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  return fetch(baseURL + link, fetchOptions);
}

// -----------------------------
// interface để đáy file
interface FetchAPIOptions extends Omit<RequestInit, "headers" | "cache"> {
  cacheForever?: boolean;
  headers?: Record<string, string>;
}
