import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { callListBase, createBase, updateBase, findBase, deleteBase ,callAPIListClient} from "@/lib/callAPI/BaseCallAPIRedux";
import { setData, setListCategoryAll ,setListPublisherAll, setListAuthorAll, setTotal, setLangsSystem} from "@/lib/redux/Features/Crud";
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import APILink from "@/connect/APILink";
import { AppDispatch } from '@/lib/redux/store'; 


export const getDataCategoryClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    isServer :boolean = FALSE_VALUE_DEFAULT,
) => async () => {
    try {
        const data = await callAPIListClient('client/category', page, limit, search,filter);
        if(isServer === true) {
            return data;
        };
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};

export const getDataAuthorClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT,
    isServer :boolean = FALSE_VALUE_DEFAULT,
) => async (dispatch: Dispatch) => {
    try {
        const data = await callAPIListClient('client/author', page, limit, search,filter);
        if(returnData === true) {
            return data;
        }else if(returnData === false && isServer === true){
            dispatch(setListCategoryAll(data?.result))
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};

export const getDataSeriesClient = (
    page: number = PAGE_DEFAULT,
    limit: number = LIMIT_DEFAULT,
    search: Record<string, any> | null = NULL_VALUE_DEFAULT,
    filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
    returnData :boolean = FALSE_VALUE_DEFAULT,
    isServer :boolean = FALSE_VALUE_DEFAULT,
) => async (dispatch: Dispatch) => {
    try {
        const data = await callAPIListClient('client/series', page, limit, search,filter);
        if(returnData === true) {
            return data;
        }else if(returnData === false && isServer === true){
            dispatch(setListCategoryAll(data?.result))
        }
        dispatch(setData(data?.result?.data));
        dispatch(setTotal(data?.result?.total));
    } catch (error) {
        console.error("Error fetching category data:", error);
    }
};