'use client'
import React, { useState } from 'react'
import Select from '@/components/form/Select';
import { useTranslations } from 'next-intl';
import { AppDispatch } from '@/lib/redux/store';
import { setTimeRangeFilter, setIsServerSide } from '@/lib/redux/Features/Crud';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/lib/redux/store";
import { upsertFilterObject } from '@/lib/redux/Features/Crud';
import {FILTER_TYPE_COLUMN} from "@/constants/QueryFilter"; 
function CategoryFilter() {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations('ManageInAdmin');

    const optionsIsActive = [
        { value: 1, label: t('Category.statusValue.active') },
        { value: 0, label: t('Category.statusValue.hideTemporarily') },
    ];

    const isServerSide = useSelector((state: RootState) => state.crud.isServerSide);
    const listCategoryAll = useSelector((state: RootState) => state.crud.listCategoryAll);
    const [value, setValue] = useState<number | string | null>(null)
    const [valueCategoryParent, setValueCategoryParent] = useState<number | string | null>(null)
    const changeIsActive = (data: number | string) => {
        setValue(data)
        if (isServerSide !== true) {
            dispatch(setIsServerSide(true))
        }
        dispatch(upsertFilterObject({
            code: "category_filter_status",
            type: FILTER_TYPE_COLUMN,
            column: "status",
            value: data
        }));
    };
    const changeCategoryParent = (data: number | string) => {
        setValueCategoryParent(data)
        if (isServerSide !== true) {
            dispatch(setIsServerSide(true))
        }
        dispatch(upsertFilterObject({
            code: "category_filter_parent",
            type: FILTER_TYPE_COLUMN,
            column: "parent_id",
            value: data
        }));
    };
    return (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
            <div className="w-full">
                <Select
                    options={optionsIsActive}
                    value={value}
                    onChange={(value) => changeIsActive(value)}
                    className="dark:bg-dark-900"
                    placeholder={t('Base.ChangeTimeStatus')}
                />

            </div>
            <div className="w-full">
                <Select
                    options={listCategoryAll}
                    value={valueCategoryParent}
                    onChange={(value) => changeCategoryParent(value)}
                    className="dark:bg-dark-900"
                    placeholder={t('Base.ChangeCategory')}
                />
            </div>
        </div>
    )
}

export default CategoryFilter
