'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/redux/store";
import { encodeToBase64 } from "@/helpers/ConvertDate";
import {
  setData, setLoading, setTotal, setPage, setIsServerSide
} from "@/lib/redux/Features/Crud";
import Pagination from '@/components/tables/PaginationMUI';
import LoadingSpinner from '../core/LoadingSpinner';

import {
  CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE,
  PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE,
  ROLE_MANAGE, STAFF_MANAGE, BANNER_MANAGE, ACTIVE_LOG_MANAGE
} from "@/constants/PageManageInAdmin";

import {
  getDataCategoryClient, getDataAuthorClient, getDataPublisherClient, getDataSeriesClient,
  getDataSettingClient, getDataPermisstionClient, getDataActionClient, getDataPermisstionDetailClient,
  getDataProductClient, getDataRoleClient, getDataStaffClient, getDataBannerClient, getDataLogActiveClient
} from "@/lib/callAPI/ServiceReduxCallAPI";

// ----------------- COMPONENT MAP -----------------
const componentMap: Record<string, any> = {
  [CATEGORY_MANAGE]: dynamic(() => import('./List/table/CategoryTableFrom'), { loading: () => <LoadingSpinner /> }),
  [AUTHOR_MANAGE]: dynamic(() => import('./List/table/AuthorTableFrom'), { loading: () => <LoadingSpinner /> }),
  [PUBLISHER_MANAGE]: dynamic(() => import('./List/table/PublisherTableFrom'), { loading: () => <LoadingSpinner /> }),
  [SERIES_MANAGE]: dynamic(() => import('./List/table/SeriesTableFrom'), { loading: () => <LoadingSpinner /> }),
  [SETTING_MANAGE]: dynamic(() => import('./List/table/SettingTableFrom'), { loading: () => <LoadingSpinner /> }),
  [PERMISSTION_MANAGE]: dynamic(() => import('./List/table/PermisstionTableFrom'), { loading: () => <LoadingSpinner /> }),
  [ACTION_MANAGE]: dynamic(() => import('./List/table/ActionTableFrom'), { loading: () => <LoadingSpinner /> }),
  [PERMISSTION_DETAIL_MANAGE]: dynamic(() => import('./List/table/PermisstionDetailTableFrom'), { loading: () => <LoadingSpinner /> }),
  [PRODUCT_MANAGE]: dynamic(() => import('./List/table/ProductTableFrom'), { loading: () => <LoadingSpinner /> }),
  [ROLE_MANAGE]: dynamic(() => import('./List/table/RoleTableFrom'), { loading: () => <LoadingSpinner /> }),
  [STAFF_MANAGE]: dynamic(() => import('./List/table/StaffTableFrom'), { loading: () => <LoadingSpinner /> }),
  [BANNER_MANAGE]: dynamic(() => import('./List/table/BannerTableFrom'), { loading: () => <LoadingSpinner /> }),
  [ACTIVE_LOG_MANAGE]: dynamic(() => import('./List/table/LogActiveTableFrom'), { loading: () => <LoadingSpinner /> }),
};

// ----------------- API MAP -----------------
const fetchMap: Record<string, any> = {
  [CATEGORY_MANAGE]: getDataCategoryClient,
  [AUTHOR_MANAGE]: getDataAuthorClient,
  [PUBLISHER_MANAGE]: getDataPublisherClient,
  [SERIES_MANAGE]: getDataSeriesClient,
  [SETTING_MANAGE]: getDataSettingClient,
  [PERMISSTION_MANAGE]: getDataPermisstionClient,
  [ACTION_MANAGE]: getDataActionClient,
  [PERMISSTION_DETAIL_MANAGE]: getDataPermisstionDetailClient,
  [PRODUCT_MANAGE]: getDataProductClient,
  [ROLE_MANAGE]: getDataRoleClient,
  [STAFF_MANAGE]: getDataStaffClient,
  [BANNER_MANAGE]: getDataBannerClient,
   [ACTIVE_LOG_MANAGE]: getDataLogActiveClient,
};

// ----------------- PROPS -----------------
interface TableListProps {
  query?: string | null;
  dataServer?: any[];
  pageServer: number;
  totalServer: number;
}

// ----------------- MAIN COMPONENT -----------------
function TableListComponent({ query = null, dataServer = [], pageServer = 1, totalServer = 0 }: TableListProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data, page, limit, total, search,
    queryFilterTime, timeRangeFilter,
    filterQueryArray, queryOrderByBase64,
    filterBase64, loading, isServerSide
  } = useSelector((state: RootState) => state.crud);

  const DynamicComponent = componentMap[query || ''];
  const fetchDataFn = fetchMap[query || ''];

  // Load initial server data
  useEffect(() => {
    dispatch(setData(dataServer));
    dispatch(setPage(pageServer));
    dispatch(setTotal(totalServer));
  }, [query]);
  // Fetch client-side data
  useEffect(() => {
    const fetchData = async () => {
      if (!fetchDataFn) return;
      const filterQueryBase64 = filterQueryArray?.length ? encodeToBase64(filterQueryArray) : null;
      const filterBase64Encoded = filterBase64?.length ? encodeToBase64(filterBase64) : null;

      dispatch(setLoading(true));
      try {
        await dispatch(fetchDataFn(
          page,
          limit,
          search,
          timeRangeFilter,
          false,
          filterQueryBase64,
          queryOrderByBase64,
          filterBase64Encoded
        ));
      } catch (error) {
        console.error("Fetch error:", error);
      }
      dispatch(setLoading(false));
    };

    if (isServerSide && fetchDataFn) {
      fetchData();
    }
  }, [query, page, limit, search, queryFilterTime, timeRangeFilter, filterQueryArray, queryOrderByBase64, filterBase64]);

  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
    if (!isServerSide) {
      dispatch(setIsServerSide(true));
    }
  };

  return (
    <div className="grid grid-cols-1">
      {loading ? (
        <LoadingSpinner />
      ) : DynamicComponent ? (
        <DynamicComponent data={data} />
      ) : (
        <span className="text-gray-500">Không xác định</span>
      )}

      {Math.ceil(total / limit) > 1 && !loading && (
        <div className="flex justify-center mt-[100px]">
          <Pagination
            limit={limit}
            page={page}
            total={total}
            onPageChange={changePage}
          />
        </div>
      )}
    </div>
  );
}

export default TableListComponent;
