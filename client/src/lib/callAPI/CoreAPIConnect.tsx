import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import APILink from "@/connect/APILink";
import { fetchAPI } from "@/connect/FetchAPI";
export async function getLinkAPI(
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll: boolean = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
) {
    try {

        let param: string = `?page=${page}&limit=${limit}`
        if (search !== null && search?.status === true) {
            param += `&search=${search?.value}`
        }
        if (filter !== null && filter?.status === true) {
            param += `&typeTime=${filter?.column}&start=${filter?.startTime}&end=${filter?.endTime}`
        }
        if (isSelectAll !== FALSE_VALUE_DEFAULT) {
            param += `&isSelectAll=${isSelectAll}`
        }
        if (timeFilterBase64 !== NULL_VALUE_DEFAULT) {
            param += `&filtersBase64=${timeFilterBase64}`
        }
        if (queryOrderByBase64 !== NULL_VALUE_DEFAULT) {
            param += `&filtersBase64=${queryOrderByBase64}`
        }
        if (filterBaseDecode !== NULL_VALUE_DEFAULT) {
            param += `&filterBaseDecode=${filterBaseDecode}`
        }
        return param;
    } catch (error) {
        return { error: `Failed to fetch data`, message: error };
    }
}

export async function callListCore(
    link: string,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll: boolean = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    isServerCall: boolean = FALSE_VALUE_DEFAULT
) {
    const param = await getLinkAPI(page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);

    if (isServerCall === true) {
        const res = await fetchAPI(link + param);
        const data = await res.json();
        return data;
    }
     const data = await APILink.get(link + param);
     return data?.data;
}

export async function findCore(link: string, isServerCall: boolean = FALSE_VALUE_DEFAULT) {
  
    if (isServerCall === true) {
        const res = await await fetchAPI(link);
     
        const data = await res.json();
        return data;
    }
    return await APILink.get(link)
}
export async function createCore(link: string, data: object) {
    return await APILink.post(link, data);
}
export async function updateCore(
    link: string,
    data: object,
    isFormData: boolean = FALSE_VALUE_DEFAULT
) {
    const method = isFormData ? "post" : "put";
    const url = isFormData ? `${link}?_method=PUT` : link;
    return await APILink[method](url, data);
};

export async function deleteCore(link: string) {
    return await APILink.delete(link);
}


export async function callListClientCore(
    link: string,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isServerCall: boolean = FALSE_VALUE_DEFAULT
) {
    const param = await getLinkAPI(page, limit, search, filter, false, null, null, null);

    if (isServerCall === true) {
        const res = await fetchAPI(link + param);
        const data = await res.json();
        return data;
    }
     const data = await APILink.get(link + param);
     return data?.data;
}