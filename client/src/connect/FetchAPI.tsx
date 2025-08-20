interface FetchAPIOptions extends Omit<RequestInit, "cache"> {
    cacheForever?: boolean;    
    cacheSeconds?: number;  
  }
  
  export async function fetchAPI(
    link: string,
    options?: FetchAPIOptions
  ): Promise<Response> {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/" || "";
    let cacheMode: RequestCache = "no-store";
  
    if (options?.cacheForever) {
      cacheMode = "force-cache";
    } else if (options?.cacheSeconds !== undefined) {
      cacheMode = "no-store";
    }
  
    const fetchOptions: RequestInit = {
      ...options,
      cache: cacheMode,
    };
    const url = baseURL + link;
    const response = await fetch(url, fetchOptions);
      return response;
  }
  