import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { fetchAPI } from "@/connect/FetchAPI";
import {getLinkAPI} from "@/lib/callAPI/BaseFun"

export async function callListCoreSever(
    link: string,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll: boolean = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    isAdmin: boolean = FALSE_VALUE_DEFAULT,
) {
        const param = await getLinkAPI(page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        const res = await fetchAPI(link + param, {  }, isAdmin);
        const data = await res.json();
        return data;
}

export async function findCoreServer(link: string, isAdmin: boolean = FALSE_VALUE_DEFAULT,) {
  const res = await await fetchAPI(link,  {  }, isAdmin);
  const data = await res.json();
  return data;
}