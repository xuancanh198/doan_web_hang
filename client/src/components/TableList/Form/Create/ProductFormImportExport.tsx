"use client";
import React, { useRef, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { IMPORT, EXPORT, SELL, RENT } from "@/constants/DataDefault";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { createProductImportExport } from "@/lib/callAPI/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getDataCategoryClient, getDataProductClient, getDataPublisherClient, getLangSystem } from "@/lib/callAPI/ServiceReduxCallAPI"
import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT } from "@/constants/DataDefault";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { setListProductAll } from "@/lib/redux/Features/Crud";
import 'swiper/css';
import 'swiper/css/navigation';


export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const listProductAll = useSelector((state: RootState) => state.crud.listProductAll);
  const [check, setCheck] = useState<boolean>(false);
  const productImportExportSchema = Yup.object().shape({
    //   code: Yup.string()
    //   .required(t('Validation.RequiredField', { field: t('productImportExport.code') }))
    //   .min(2, t('Validation.MinLength', { field: t('productImportExport.code'), min: 2 }))
    //   .max(255, t('Validation.MaxLength', { field: t('productImportExport.code'), max: 255 })),

    // name: Yup.string()
    //   .required(t('Validation.RequiredField', { field: t('productImportExport.name') }))
    //   .min(2, t('Validation.MinLength', { field: t('productImportExport.name'), min: 2 }))
    //   .max(255, t('Validation.MaxLength', { field: t('productImportExport.name'), max: 255 })),


    description: Yup.string()
      .max(5000, t('Validation.MaxLength', { field: t('productImportExport.description'), max: 5000 })),

  });


  useEffect(() => {
    const callAPiDataAll = async () => {
      const [
        resCategory
      ] = await Promise.all([

        dispatch(getDataProductClient(
          PAGE_DEFAULT,
          LIMIT_DEFAULT,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          true,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          true
        )),
      ]);

      dispatch(setListProductAll(resCategory?.result?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }))));
    };

    callAPiDataAll();
  }, []);

  const types = [
    { value: IMPORT, label: t('productImportExport.typeValue.import') },
    { value: EXPORT, label: t('productImportExport.typeValue.export') },
  ];

  const models = [
    { value: SELL, label: t('productImportExport.modeValue.sell') },
    { value: RENT, label: t('productImportExport.modeValue.rent') },
  ];


  const createData = async (values: any, resetForm: () => void) => {
    const data = await dispatch(createProductImportExport(values));
    if (data?.status === "success") {
      const result = await Swal.fire({
        title: t('Base.NotificationCreateSuccess'),
        text: t('Base.TitleWhenCreateModal'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        confirmButtonText: t('Base.Confirm'),
        cancelButtonText: t('Base.Cancel'),
      });

      if (result.isConfirmed) {
        router.push("/admin/manage-list?query=productImportExport");
      } else {
        resetForm();
      }
    }
  }

  return (
    <ComponentCard title={t('Base.CreateTitle', { field: t('Page.productImportExport') })}>
      <Formik
        initialValues={{
          type: IMPORT.toString(),
          mode: RENT.toString(),
          quantity: 0,
          import_price: 0,
          expected_sell_price: 0,
          expected_rent_price: "",
          actual_price_at_that_time: "",
          product_id: 0,
          note: null,
        }}
        validationSchema={productImportExportSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          return (
            <Form className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Label>{t('productImportExport.type')}</Label>
                <div className="relative">
                  <Select
                    value={values.type}
                    options={types}
                    placeholder={t('Category.changeTextPlaceholder', { field: t('Category.status') })}
                    onChange={(val: string | number) => setFieldValue("type", val)}
                    className="dark:bg-dark-900"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                  {touched.type && errors.type && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.type}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Label>{t('productImportExport.type')}</Label>
                <div className="relative">
                  <Select
                    value={values.product_id}
                    options={listProductAll}
                    placeholder={t('Category.changeTextPlaceholder', { field: t('Category.status') })}
                    onChange={(val: string | number) => setFieldValue("type", val)}
                    className="dark:bg-dark-900"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                  {touched.type && errors.type && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.type}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Label>{t('productImportExport.quantity')}</Label>
                <Input
                  name="quantity"
                  type="text"
                  value={values.quantity}
                  onChange={handleChange}
                  error={!!errors.quantity && touched.quantity}
                  hint={touched.quantity && errors.quantity ? errors.quantity : ""}
                />
              </div>
              {
               check === false
                  ?
                  (
                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                      <Label>{t('productImportExport.expected_sell_price')}</Label>
                      <Input
                        name="expected_sell_price"
                        type="text"
                        value={values.expected_sell_price}
                        onChange={handleChange}
                        error={!!errors.expected_sell_price && touched.expected_sell_price}
                        hint={touched.expected_sell_price && errors.expected_sell_price ? errors.expected_sell_price : ""}
                      />
                    </div>
                  ) : (
                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                      <Label>{t('productImportExport.expected_rent_price')}</Label>
                      <Input
                        name="expected_rent_price"
                        type="text"
                        value={values.expected_rent_price}
                        onChange={handleChange}
                        error={!!errors.expected_rent_price && touched.expected_rent_price}
                        hint={touched.expected_rent_price && errors.expected_rent_price ? errors.expected_rent_price : ""}
                      />
                    </div>
                  )
              }

              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Label>{t('productImportExport.actual_price_at_that_time')}</Label>
                <Input
                  name="actual_price_at_that_time"
                  type="text"
                  value={values.actual_price_at_that_time}
                   onChange={(e) => {
                      handleChange(e);      // cập nhật formik value
                         // toggle check mỗi khi thay đổi input
                    }}
                  error={!!errors.actual_price_at_that_time && touched.actual_price_at_that_time}
                  hint={touched.actual_price_at_that_time && errors.actual_price_at_that_time ? errors.actual_price_at_that_time : ""}
                />
              </div>

              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Label>{t('productImportExport.mode')}</Label>
                <div className="relative">
                  <Select
                    value={values.mode}
                    options={models}
                    placeholder={t('Category.changeTextPlaceholder', { field: t('Category.status') })}
                    onChange={(val: string | number) => {
                      setFieldValue("mode", val);  // cập nhật Formik value
                      setCheck(!check);            // toggle state check (hoặc xử lý logic khác)
                    }}
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                  {touched.mode && errors.mode && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.mode}</p>
                  )}
                </div>
              </div>
              <div className="col-span-12 ">
                <Label>{t('Category.description')}</Label>
                <TextArea
                  value={values.description}
                  onChange={(val) => setFieldValue("description", val)}
                  rows={6}
                  className="h-[160px]"
                />
                {touched.description && errors.description && (
                  <p className="text-red-500 text-sm mt-1.5">{errors.description}</p>
                )}
              </div>
              <div className="col-span-12">
                <Button size="sm" type="submit">
                  {t('Base.Create')}
                </Button>
                <Button
                  size="sm"
                  className="ms-[20px]"
                  variant="outline"
                  type="button"
                >
                  {t('Base.Cancel')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </ComponentCard>
  );
}
