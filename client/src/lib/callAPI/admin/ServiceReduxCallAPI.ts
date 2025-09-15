import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { callListBaseClient, createBase, updateBase, deleteBase, methodPostBase } from "@/lib/callAPI/BaseCallAPIClient";
import { setData,setBannerPosition, setListCategoryAll ,setListPublisherAll, setListAuthorAll, setTotal, setLangsSystem} from "@/lib/redux/Features/Crud";
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import APILink from "@/connect/APILink";
import { AppDispatch } from '@/lib/redux/store'; 
import { setCookie } from "cookies-next";
import { setRouterRedirectTo } from "@/lib/redux/Features/Global";
export const getDataCategoryClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT,
    passIntoCorrespondingArray :boolean = FALSE_VALUE_DEFAULT,
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/category', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }else if(returnData === false && passIntoCorrespondingArray === true){
            dispatch(setListCategoryAll(data?.result))
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};

export const  createCategory= (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/category', data))
}

export  const  updateCategory = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/category/${id}`, data, isFormData))
}
export const deleteCategory = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/category/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/category/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataCategoryClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};


export const getDataAuthorClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT,
    passIntoCorrespondingArray :boolean = FALSE_VALUE_DEFAULT,

) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/author', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }else if(returnData === false && passIntoCorrespondingArray === true){
            dispatch(setListAuthorAll(data?.result))
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};

export const  createAuthor= (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/author', data))
}


export  const  updateAuthor = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/author/${id}`, data, isFormData))
}
export const deleteAuthor = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/author/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/author/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataAuthorClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting author:", error);
    }
};


export const getDataPublisherClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT,
    passIntoCorrespondingArray :boolean = FALSE_VALUE_DEFAULT,
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/publisher', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        else if(returnData === false && passIntoCorrespondingArray === true){
            dispatch(setListPublisherAll(data?.result))
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};


export const  createPublisher= (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/publisher', data))
}


export  const  updatePublisher = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/publisher/${id}`, data, isFormData))
}
export const deletePublisher = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/publisher/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/publisher/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataPublisherClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting Publisher:", error);
    }
};



export const getDataSeriesClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/series', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};

export const  createSeries= (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/series', data))
}

export  const  updateSeries = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/series/${id}`, data, isFormData))
}
export const deleteSeries = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/series/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/series/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataSeriesClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};

export const getDataSettingClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/system/setting', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};

export const  createPermisstion = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/permisstion/permisstion', data))
}
export  const  updatePermisstion = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/permisstion/permisstion/${id}`, data))
}
export const deletePermisstion= (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/permisstion/permisstion/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/permisstion/permisstion/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataPermisstionClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};

export const getDataPermisstionClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/permisstion/permisstion', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  createSetting= (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/system/setting', data))
}

export  const  updateSetting = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/system/setting/${id}`, data, isFormData))
}
export const deleteSetting = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/system/setting/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/system/setting/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataSeriesClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};


export const getDataActionClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/permisstion/action', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  createAction = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/permisstion/action', data))
}

export  const  updateAction = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/permisstion/action/${id}`, data, isFormData))
}
export const deleteAction = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/permisstion/action/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/permisstion/action/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataSeriesClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};




export const getDataPermisstionDetailClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/permisstion/permisstion-detail', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};

export const  createPermisstionDetail = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/permisstion/permisstion-detail', data))
}

export  const  updatePermisstionDetail= (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/permisstion/action/${id}`, data, isFormData))
}
export const deletePermisstionDetail = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/permisstion/permisstion-detail/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/permisstion/permisstion-detail/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataSeriesClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};
export const getLangSystem = ( returnData :boolean = FALSE_VALUE_DEFAULT) => async (dispatch: AppDispatch) => {
    const data = await APILink.get('admin/system/setting/get-system-lang');
    if(returnData === true) {
        return data?.data;
    }
    
    dispatch(setLangsSystem(data?.data?.result))
};
export const getBannerPositionSystem  = ( returnData :boolean = FALSE_VALUE_DEFAULT) => async (dispatch: AppDispatch) => {
    const data = await APILink.get('admin/system/setting/get-position-banner');
    if(returnData === true) {
        return data?.data;
    }
    dispatch(setBannerPosition(data?.data))
};


export const getDataProductClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/product', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  createProduct = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/product', data))
}

export  const  updateProduct = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/product/${id}`, data, isFormData))
}
export const deleteProduct = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/product/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/product/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataProductClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};


export const getDataRoleClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/staff/role', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};

export const  createRole = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/staff/role', data))
}

export  const  updateRole = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/staff/role/${id}`, data, isFormData))
}
export const deleteRole = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/staff/role/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/staff/role/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataRoleClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};


export const getDataStaffClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/staff/staff', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};

export const  createStaff = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/staff/staff', data))
}

export  const  updateStaff= (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/staff/staff/${id}`, data, isFormData))
}
export const deleteStaff = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/staff/staff/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/staff/staff/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataStaffClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};

export const getDataImportExportClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/product/get-import-export', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};



export const getDataBannerClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/system/banner', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  createBanner = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/system/banner', data))
}

export  const  updateBanner = (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/system/banner/${id}`, data, isFormData))
}
export const deleteBanner = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/system/banner/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/system/banner/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataBannerClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};


export const getDataLogActiveClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/system/log-active', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const deleteLogActive = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/system/log-active/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/system/log-active/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataLogActiveClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};



export const getDataProductImportExportClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/product/get-import-export', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  createProductImportExport = (data: object | FormData)=> async (dispatch: AppDispatch) => {
    return await dispatch(createBase('admin/product/product/create-import-export', data))
}

export  const  updateProductImportExport= (id: number, data: object, isFormData: boolean = false) => async (dispatch: AppDispatch) =>  {
    return await dispatch(updateBase(`admin/product/product/update-import-export/${id}`, data, isFormData))
}
export const deleteProductImportExport = (id: number | string | number[], isDeleteMuti:boolean = true) => async (dispatch: AppDispatch) => {
    try {
        const data =isDeleteMuti ?await dispatch(deleteBase(`admin/product/product/delete-import-export/${`?id=${id}`}`) ): await dispatch(deleteBase(`admin/product/product/delete-import-export/${id}`));

        if (data?.status === 'success') {
            await dispatch(getDataStaffClient());
            toast.success(data?.message);
        }
    } catch (error) {
        console.error("Error deleting series:", error);
    }
};



export const getDataProductLogClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isSelectAll = FALSE_VALUE_DEFAULT,
    timeFilterBase64: string | null = NULL_VALUE_DEFAULT,
    queryOrderByBase64: string | null = NULL_VALUE_DEFAULT,
    filterBaseDecode: string | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: Dispatch) => {
    try {
        const data = await callListBaseClient('admin/product/product/get-log', page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode);
        if(returnData === true) {
            return data;
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching series data:", error);
    }
};


export const  loginAdmin = (data: object) => async (dispatch: Dispatch) =>  {
    const result = await methodPostBase(`admin/login`, data);
    if(result?.status === "success") {
      
        setCookie("admin_token", result.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        });

        setCookie("admin_user", JSON.stringify(result.user), {
        path: "/",
        maxAge: 60 * 60 * 24,
        });
        dispatch(setRouterRedirectTo("/admin/"));
    }
      toast.success(result.message || "Đăng nhập thành công!");
    return ;
}