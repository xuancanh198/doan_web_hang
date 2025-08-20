import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    PAGE_DEFAULT,
    LIMIT_DEFAULT,
    NULL_VALUE_DEFAULT,
    FALSE_VALUE_DEFAULT,
    ARRAY_Object_DEFAULT,
    TIME_Now_VALUE_DEFAULT,
    Number_Zero_DEFAULT
} from "@/constants/DataDefault";
import { Column_Created_at } from "@/constants/ColumnBackendQuery";
interface FilterObject {
    code: string;
    type: string;
    column: string;
    value: any;
}
interface typeColumnFilter {
    column : string,
    value : string | null
}
interface ExampleState {
    data: object[],
    page: number,
    limit: number,
    total: number,
    search: SearchValue | null,
    queryFilterTime: QueryFilterTime | null,
    isSelectAll: boolean,
    exportExcel: boolean,
    timeRangeFilter: TimeRangeFilter | null,
    queryOrderByBase64: string | null,
    filterBase64: FilterObject[],
    listCategory: any[],
    listAuthorAll: any[],
    listPublisherAll: any[],
    listSeriesAll: any[],
    listProductAll: any[],
    loading: boolean,
    listCategoryAll: any[],
    isServerSide: boolean,
    deleteIds: number[],
    langsSystem: LangSystem[],
    filterQueryArray : typeColumnFilter[],
    bannerPosition : BannerPositionSystem[]
}

interface TimeRangeFilter {
    status: boolean,
    column: string,
    startTime: string,
    endTime: string,
}

interface QueryFilterTime {
    value: string | null,
    status: boolean,
    column: string,
}

interface SearchValue {
    value: string | null,
    status: boolean,
}

interface LangSystem {
    name: string | null,
    value: string | null;
}
interface BannerPositionSystem {
    name: string | null,
    value: string | null;
}

const initialState: ExampleState = {
    data: ARRAY_Object_DEFAULT,
    total: Number_Zero_DEFAULT,
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT,
    isSelectAll: FALSE_VALUE_DEFAULT,
    search: {
        value: NULL_VALUE_DEFAULT,
        status: FALSE_VALUE_DEFAULT,
    },
    queryFilterTime: {
        column: Column_Created_at,
        value: TIME_Now_VALUE_DEFAULT,
        status: FALSE_VALUE_DEFAULT,
    },
    exportExcel: FALSE_VALUE_DEFAULT,
    timeRangeFilter: {
        status: FALSE_VALUE_DEFAULT,
        column: Column_Created_at,
        startTime: TIME_Now_VALUE_DEFAULT,
        endTime: TIME_Now_VALUE_DEFAULT,
    },
    listCategory: ARRAY_Object_DEFAULT,
    queryOrderByBase64: NULL_VALUE_DEFAULT,
    filterBase64: [],
    loading: false,
    listCategoryAll: [],
    listAuthorAll:  [],
    listPublisherAll:  [],
    listSeriesAll : [],
    isServerSide: false,
    deleteIds: [],
    langsSystem: [],
    filterQueryArray : [],
    bannerPosition : [],
    listProductAll : []
};

export const exampleSlice = createSlice({
    name: "Curd",
    initialState,
    reducers: {
         setBannerPosition(state, action: PayloadAction<BannerPositionSystem[]>) {
            state.bannerPosition = action.payload;
        },
        setData(state, action: PayloadAction<object[]>) {
            state.data = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setTotal(state, action: PayloadAction<number>) {
            state.total = action.payload;
        },
        setSearch(state, action: PayloadAction<SearchValue>) {
            state.search = action.payload;
        },
        setListCategory(state, action: PayloadAction<object[]>) {
            state.listCategory = action.payload;
        },
        setExportExcel(state, action: PayloadAction<boolean>) {
            state.exportExcel = action.payload;
        },
        setIsSelectAll(state, action: PayloadAction<boolean>) {
            state.isSelectAll = action.payload;
        },
        upsertFilterObject: (state, action: PayloadAction<FilterObject>) => {
            const newFilter = action.payload;

            const existingIndex = state.filterBase64.findIndex(
                (item) => item.code === newFilter.code
            );

            if (existingIndex !== -1) {
                state.filterBase64[existingIndex] = newFilter;
            } else {
                state.filterBase64.push(newFilter);
            }

        },
        upsertFilterQueryObject: (state, action: PayloadAction<typeColumnFilter>) => {

            const newFilter = action.payload;
            const existingIndex = state.filterQueryArray.findIndex(
                (item) => item.column === newFilter.column
            );

            if (existingIndex !== -1) {
                state.filterQueryArray[existingIndex] = newFilter;
            } else {
                state.filterQueryArray.push(newFilter);
            }
        },

        setQueryFilterTime(state, action: PayloadAction<QueryFilterTime>) {
            state.queryFilterTime = action.payload;
        },
        setTimeRangeFilter(state, action: PayloadAction<TimeRangeFilter>) {
            state.timeRangeFilter = action.payload;
        },
        setQueryOrderByBase64(state, action: PayloadAction<string | null>) {
            state.queryOrderByBase64 = action.payload;
        },
        setFilterBase64(state, action: PayloadAction<string | null | object | any>) {
            state.filterBase64 = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setListCategoryAll(state, action: PayloadAction<any[]>) {
            state.listCategoryAll = action.payload;
        },
        setListPublisherAll(state, action: PayloadAction<any[]>) {
            state.listPublisherAll = action.payload;
        },
        setListSeriesAll(state, action: PayloadAction<any[]>) {
            state.listSeriesAll = action.payload;
        },
        setListAuthorAll(state, action: PayloadAction<any[]>) {
            state.listAuthorAll = action.payload;
        },
        setListProductAll(state, action: PayloadAction<any[]>) {
            state.listProductAll = action.payload;
        },
        setIsServerSide(state, action: PayloadAction<boolean>) {
            state.isServerSide = action.payload;
        },
        addDeleteId: (state, action: PayloadAction<number>) => {
            if (!state.deleteIds.includes(action.payload)) {
                state.deleteIds.push(action.payload);
            }
        },
        removeDeleteId: (state, action: PayloadAction<number>) => {
            state.deleteIds = state.deleteIds.filter(id => id !== action.payload);
        },
        setDeleteIds: (state, action: PayloadAction<number[]>) => {
            state.deleteIds = action.payload;
        },
        setLangsSystem: (state, action: PayloadAction<LangSystem[]>) => {
            state.langsSystem = action.payload;
        },
    },
});

export const {
    setData,
    setPage,
    setLimit,
    setTotal,
    setSearch,
    setListCategory,
    setExportExcel,
    setQueryFilterTime,
    setTimeRangeFilter,
    setQueryOrderByBase64,
    setFilterBase64,
    setIsSelectAll,
    setLoading,
    setListCategoryAll,
    setIsServerSide,
    setDeleteIds,
    addDeleteId,
    removeDeleteId,
    upsertFilterObject,
    setLangsSystem,
    setListPublisherAll,
    setListSeriesAll,
    setListAuthorAll,
    upsertFilterQueryObject,
    setListProductAll,
    setBannerPosition
} = exampleSlice.actions;

export default exampleSlice.reducer;
