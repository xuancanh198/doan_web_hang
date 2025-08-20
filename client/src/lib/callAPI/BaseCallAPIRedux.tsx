import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import APILink from "@/connect/APILink";
import { setLoading } from "@/lib/redux/Features/Crud";
import { AppDispatch } from '@/lib/redux/store';
import {callListCore, findCore, createCore, updateCore, callListClientCore} from "@/lib/callAPI/CoreAPIConnect";
export async function callListBase(
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
  return  await callListCore(link, page, limit, search, filter, isSelectAll, timeFilterBase64, queryOrderByBase64, filterBaseDecode, isServerCall);
}

export async function findBase(link: string, isServerCall: boolean = FALSE_VALUE_DEFAULT) {
  const data = await findCore(link, isServerCall);
  return data;
}
export const createBase = (link: string, data: object) => async (dispatch: AppDispatch) => {
  await dispatch(setLoading(true));
  try {
    const result = await createCore(link, data);
    return result?.data;
  } catch (error: any) {
    // Nếu cần trả về lỗi để xử lý tại form
    return error?.response?.data;
  } finally {
    await dispatch(setLoading(false));
  }
};

export const updateBase = (
  link: string,
  data: object,
  isFormData: boolean = FALSE_VALUE_DEFAULT
) => async (dispatch: AppDispatch) => {
  await dispatch(setLoading(true));
  try {
    const result = await updateCore(link, data, isFormData);
    return result?.data;
  } catch (error: any) {
    return error?.response?.data;
  } finally {
    await dispatch(setLoading(false));
  }
};

export const deleteBase = (link: string) => async (dispatch: AppDispatch) => {
  await dispatch(setLoading(true));
  try {
    const result = await APILink.delete(link);
    return result?.data;
  } catch (error: any) {
    return error?.response?.data;
  } finally {
    await dispatch(setLoading(false));
  }
};


export async function callAPIListClient(
  link: string,
  page: number = PAGE_DEFAULT,
  limit: number = LIMIT_DEFAULT,
  search: Record<string, any> | null = NULL_VALUE_DEFAULT,
  filter: Record<string, any> | null = NULL_VALUE_DEFAULT,
  isServerCall: boolean = FALSE_VALUE_DEFAULT
) {

  return  await callListClientCore(link, page, limit, search, filter,isServerCall);

}