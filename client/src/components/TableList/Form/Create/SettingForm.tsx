"use client";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "@/components/form/input/TextArea";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { createSetting } from "@/lib/callAPI/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getDataSettingServer } from "@/lib/callAPI/ServiceReduxCallAPI"
import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import RenderViewByData from "@/components/common/RenderViewByData"
import {
  SETTING_TYPE_UPLOAD_IMAGE,
  SETTING_TYPE_UPLOAD_FILE,
  SETTING_TYPE_INPUT_TEXT,
  SETTING_TYPE_TEXT_AREA,
  SETTING_TYPE_RICH_TEXT,
  SETTING_TYPE_CODE_EDITOR,
  SETTING_TYPE_CHECKBOX,
  SETTING_TYPE_RADIO,
  SETTING_TYPE_SELECT,
  SETTING_TYPE_SELECT_MULTIPLE,
  SETTING_TYPE_NUMBER,
  SETTING_TYPE_DATE,
  SETTING_TYPE_COLOR,
  SETTING_TYPE_DATETIME,
  SETTING_TYPE_HIDDEN,
} from "@/constants/SettingType";
import Swal from 'sweetalert2';
export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const SettingSchema = Yup.object().shape({
    key: Yup.string()
       .required(t('Validation.RequiredField', { field: t('Setting.key') }))
       .min(2, t('Validation.MinLength', { field: t('Setting.key'), min: 2 }))
       .max(255, t('Validation.MaxLength', { field: t('Setting.key'), max: 255 })),
   
     name: Yup.string()
       .required(t('Validation.RequiredField', { field: t('Setting.name') }))
       .min(2, t('Validation.MinLength', { field: t('Setting.name'), min: 2 }))
       .max(255, t('Validation.MaxLength', { field: t('Setting.name'), max: 255 })),
   
     group: Yup.string()
       .nullable()
       .max(255, t('Validation.MaxLength', { field: t('Setting.group'), max: 255 })),
     description: Yup.string()
       .nullable()
       .max(5000, t('Validation.MaxLength', { field: t('Series.description'), max: 5000 })),
  });
  const setFieldValueRef = useRef<any>(null);

  const createData = async (values: any, resetForm: () => void) => {
    let dataJson:any = values;
    if(values?.type === SETTING_TYPE_UPLOAD_IMAGE || values?.type === SETTING_TYPE_UPLOAD_FILE) {
        const formData = new FormData();
        formData.append("key", values.key);
        formData.append("value", values.value);
        formData.append("group", values.group);
        formData.append("type", values.type);
        if (values.image) {
          formData.append("image", values.image);
        }
      dataJson = formData;
    }
    const data = await dispatch(createSetting(dataJson));
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
        router.push("/admin/manage-list?query=setting");
      } else {
        resetForm();
      }
    }
  }
  const dataSettingType = [
    {
      value: SETTING_TYPE_UPLOAD_IMAGE,
      label: t('Setting.typeValues.image')
    },
    {
      value: SETTING_TYPE_UPLOAD_FILE,
      label: t('Setting.typeValues.file')
    },
    {
      value: SETTING_TYPE_INPUT_TEXT,
      label: t('Setting.typeValues.text')
    },
    {
      value: SETTING_TYPE_TEXT_AREA,
      label: t('Setting.typeValues.text_area')
    },
    {
      value: SETTING_TYPE_RICH_TEXT,
      label: t('Setting.typeValues.rich_text_box')
    },

    {
      value: SETTING_TYPE_HIDDEN,
      label: t('Setting.typeValues.status')
    },
    {
      value: SETTING_TYPE_DATE,
      label: t('Setting.typeValues.date')
    },
    {
      value: SETTING_TYPE_DATETIME,
      label: t('Setting.typeValues.timestamp')
    },
    {
      value: SETTING_TYPE_COLOR,
      label: t('Setting.typeValues.color')
    },
  ];
  return (
    <ComponentCard title={t('Base.CreateTitle', { field: t('Page.setting') })}>
      <Formik
        initialValues={{
          name : "",
          description : "",
          key: "",
          value: "",
          type: SETTING_TYPE_INPUT_TEXT,
          group: null,
        }}
        validationSchema={SettingSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Setting.key')}</Label>
                  <Input
                    name="key"
                    type="text"
                    value={values.key}
                    onChange={handleChange}
                    error={!!errors.key && touched.key}
                    hint={touched.key && errors.key ? errors.key : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Setting.name')}</Label>
                  <Input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    error={!!errors.name && touched.name}
                    hint={touched.name && errors.name ? errors.name : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Setting.group')}</Label>
                  <Input
                    name="group"
                    type="text"
                    value={values.group}
                    onChange={handleChange}
                    error={!!errors.group && touched.group}
                    hint={touched.group && errors.group ? errors.group : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6 ">
                  <Label>{t('Setting.type')}</Label>
                  <div className="relative">
                    <Select
                      value={values.type}
                      options={dataSettingType}
                      placeholder={t('Base.changeTextPlaceholder', { field: t('Setting.type') })}
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
                <div className="col-span-12">
                  <Label>{t('Setting.value')}</Label>
                       <RenderViewByData
                          value={values.type}
                          content={values.value}
                          valueName ={'value'}
                          setContent={(val: any) => setFieldValue("value", val)}
                        />
                  {values.value}
                </div>
                 <div className="col-span-12">
                                  <Label>{t('Series.description')}</Label>
                                  <TextArea
                                    value={values.description}
                                    onChange={(val) => setFieldValue("description", val)}
                                    rows={6}
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </ComponentCard>
  );
}
