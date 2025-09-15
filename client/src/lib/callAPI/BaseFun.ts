import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
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
