import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { callListCoreSever, findCoreServer } from "@/lib/callAPI/CoreAPIConnectServer";

export async function getDataCategoryServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/category', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdCategory(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/category/${id}`,isServerCall)
}

export async function getDataAuthorServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,

) {
    return await callListCoreSever('admin/product/author', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdAuthor(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/author/${id}`,isServerCall)
}

export async function getDataPublisherServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/publisher', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdPublisher(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/publisher/${id}`,isServerCall)
}

export async function getDataSeriesServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/series', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdSeries(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/series/${id}`,isServerCall)
}
export async function getDataPermisstionServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/permisstion/permisstion', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdPermisstion(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/permisstion/permisstion/${id}`,isServerCall)
}

export async function getDataSettingServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/system/setting', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdSetting(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/system/setting/${id}`,isServerCall)
}

export async function getDataActionServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/permisstion/action', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdAction(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/permisstion/action/${id}`,isServerCall)
}


export async function getDataPermisstionDetailServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/permisstion/permisstion-detail', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdPermisstionDetail(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/permisstion/permisstion-detail/${id}`,isServerCall)
}

export async function getDataProductServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/product', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdProduct(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/product/${id}`,isServerCall)
}

export async function getDataRoleServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/staff/role', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}
export async function findIdRole(id: number | string,isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/staff/role/${id}`,isServerCall)
}

export async function getDataStaffServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/staff/staff', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdStaff(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/staff/staff/${id}`,isServerCall)
}

export async function getDataBannerServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/system/banner', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdBanner(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/system/banner/${id}`, isServerCall)
}

export async function getDataLogActiveServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/system/log-active', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdLogActive(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/system/log-active/${id}`, isServerCall)
}

export async function getDataProductImportExportServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/product/get-import-export', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdProductImportExport(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/product/view-import-export/${id}`,isServerCall)
}


export async function getDataProductLogServer(

    isServerCall = FALSE_VALUE_DEFAULT,
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBase64: string | null = NULL_VALUE_DEFAULT,
) {
    return await callListCoreSever('admin/product/product/get-log', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBase64, isServerCall)
}

export async function findIdProductLog(id: number | string, isServerCall = FALSE_VALUE_DEFAULT) {
    return await findCoreServer(`admin/product/product/view-log/${id}`,isServerCall)
}
