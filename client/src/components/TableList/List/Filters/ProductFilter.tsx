'use client'

import React, { useState, useEffect } from 'react'
import Select from '@/components/form/Select'
import { useTranslations } from 'next-intl'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/redux/store'

import {
  setIsServerSide,
  setListPublisherAll,
  setListSeriesAll,
  setListAuthorAll,
  setListCategoryAll,
  upsertFilterObject,
  setLangsSystem,
} from '@/lib/redux/Features/Crud'

import {
  getDataCategoryClient,
  getDataAuthorClient,
  getDataPublisherClient,
  getDataSeriesClient,
  getLangSystem,
} from '@/lib/callAPI/ServiceReduxCallAPI'

import { FILTER_TYPE_COLUMN } from '@/constants/QueryFilter'

function ProductFilter() {
  const dispatch = useDispatch<AppDispatch>()
  const t = useTranslations('ManageInAdmin')

  const isServerSide = useSelector((state: RootState) => state.crud.isServerSide)
  const listCategoryAll = useSelector((state: RootState) => state.crud.listCategoryAll)
  const listAuthorAll = useSelector((state: RootState) => state.crud.listAuthorAll)
  const listPublisherAll = useSelector((state: RootState) => state.crud.listPublisherAll)
  const listSeriesAll = useSelector((state: RootState) => state.crud.listSeriesAll)
  const langsSystem = useSelector((state: RootState) => state.crud.langsSystem)

  const [valueStatus, setValueStatus] = useState<number | string | null>(null)
  const [valueCategory, setValueCategory] = useState<number | string | null>(null)
  const [valueAuthor, setValueAuthor] = useState<number | string | null>(null)
  const [valuePublisher, setValuePublisher] = useState<number | string | null>(null)
  const [valueSeries, setValueSeries] = useState<number | string | null>(null)
  const [valueLang, setValueLang] = useState<string | null>(null)

  const mapOptions = (list: any[]) =>
    list.map((item) => ({
      value: item.id,
      label: item.name,
    }))

  const categoryOptions = mapOptions(listCategoryAll)
  const authorOptions = mapOptions(listAuthorAll)
  const publisherOptions = mapOptions(listPublisherAll)
  const seriesOptions = mapOptions(listSeriesAll)
  // const langOptions = langsSystem.map((lang) => ({
  //   value: lang.key,
  //   label: lang.value,
  // }))

  const optionsIsActive = [
    { value: 1, label: t('Category.statusValue.active') },
    { value: 0, label: t('Category.statusValue.hideTemporarily') },
  ]

  // ====== TÁCH HÀM ======
  const changeFilter = (
    value: number | string | null,
    setter: (val: any) => void,
    code: string,
    column: string
  ) => {
    setter(value)
    if (!isServerSide) dispatch(setIsServerSide(true))
    dispatch(
      upsertFilterObject({
        code,
        type: FILTER_TYPE_COLUMN,
        column,
        value,
      })
    )
  }

  const changeStatus = (value: number | string) =>
    changeFilter(value, setValueStatus, 'product_filter_status', 'status')

  const changeCategory = (value: number | string) =>
    changeFilter(value, setValueCategory, 'product_filter_category', 'category_id')

  const changeAuthor = (value: number | string) =>
    changeFilter(value, setValueAuthor, 'product_filter_author', 'author_id')

  const changePublisher = (value: number | string) =>
    changeFilter(value, setValuePublisher, 'product_filter_publisher', 'publisher_id')

  const changeSeries = (value: number | string) =>
    changeFilter(value, setValueSeries, 'product_filter_series', 'series_id')

  const changeLang = (value: string) =>
    changeFilter(value, setValueLang, 'product_filter_lang', 'lang')

  // ====== useEffect call API ======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, authorRes, publisherRes, seriesRes, langsRes] = await Promise.all([
          dispatch(getDataCategoryClient(1, 10, null, null, true, null, null, null, true)),
          dispatch(getDataAuthorClient(1, 10, null, null, true, null, null, null, true)),
          dispatch(getDataPublisherClient(1, 10, null, null, true, null, null, null, true)),
          dispatch(getDataSeriesClient(1, 10, null, null, true, null, null, null, true)),
          dispatch(getLangSystem(true)),
        ])

        dispatch(setListCategoryAll(categoryRes.result || []))
        dispatch(setListAuthorAll(authorRes.result || []))
        dispatch(setListPublisherAll(publisherRes.result || []))
        dispatch(setListSeriesAll(seriesRes.result || []))
        // dispatch(setLangsSystem(langsRes.result || []))
      } catch (err) {
        console.error('Fetch data error:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
      <Select
        options={optionsIsActive}
        value={valueStatus}
        onChange={changeStatus}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeTimeStatus')}
      />

      <Select
        options={categoryOptions}
        value={valueCategory}
        onChange={changeCategory}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeCategory')}
      />

      <Select
        options={authorOptions}
        value={valueAuthor}
        onChange={changeAuthor}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeAuthor')}
      />

      <Select
        options={publisherOptions}
        value={valuePublisher}
        onChange={changePublisher}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangePublisher')}
      />

      <Select
        options={seriesOptions}
        value={valueSeries}
        onChange={changeSeries}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeSeries')}
      />

      {/* <Select
        options={langOptions}
        value={valueLang}
        onChange={changeLang}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeLanguage')}
      /> */}
    </div>
  )
}

export default ProductFilter
