"use client";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { STATUS_ACTIVE, STATUS_NOT_ACTIVE } from "@/constants/DataDefault";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { updateAction } from "@/lib/callAPI/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch  } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
export default function DefaultInputs({ dataDetail }: { dataDetail: any }) {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
   const router = useRouter(); 
  const ActionSchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Action.code') }))
      .min(2, t('Validation.MinLength', { field: t('Action.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Action.code'), max: 20 })),

    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Action.name') }))
      .min(2, t('Validation.MinLength', { field: t('Action.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Action.name'), max: 50 })),

    status: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Action.status') })),
  });

  const setFieldValueRef = useRef<any>(null);

  const options = [
    { value: STATUS_ACTIVE, label: t('Action.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Action.statusValue.hideTemporarily') },
  ];

  const createData = async (values: any, resetForm: () => void) => {
    const data = await dispatch(updateAction(dataDetail?.id, values, true));
    if(data?.status === "success") {
   const result = await Swal.fire({
      title: t('Base.NotificationCreateSuccess'),
      text: t('Base.TitleWhenUpdateModal'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: t('Base.Confirm'),
      cancelButtonText: t('Base.Cancel'),
    });

     if (result.isConfirmed) {
        router.push("/admin/manage-list?query=action");
      } else {
        resetForm();
      }
    } 
  }
  return (
    <ComponentCard title={t('Base.EditTitle', { field: t('Page.action') })}>
      <Formik
       enableReinitialize
      initialValues={{
        code: dataDetail?.code || "",
        name: dataDetail?.name || "",
        status: dataDetail?.status || STATUS_ACTIVE.toString(),
        description: dataDetail?.description || "",
      }}
        validationSchema={ActionSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Action.code')}</Label>
                  <Input
                    name="code"
                    type="text"
                    value={values.code}
                    onChange={handleChange}
                    error={Boolean(touched.code && errors.code)}
                    hint={typeof errors.code === "string" && touched.code ? errors.code : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Action.name')}</Label>
                  <Input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(!!errors.name && touched.name)}
                    hint={typeof errors.name === "string" &&touched.name && errors.name ? errors.name : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Action.status')}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t('Action.changeTextPlaceholder', { field: t('Action.status') })}
                      onChange={(val: string | number) => setFieldValue("status", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  {touched.status && typeof errors.status === 'string' && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.status}</p>
                  )}

                  </div>
                </div>
                <div className="col-span-12">
                  <Label>{t('Action.description')}</Label>
                  <TextArea
                    value={values.description}
                    onChange={(val) => setFieldValue("description", val)}
                    rows={6}
                  />
                  {touched.description && typeof errors.description === 'string' && errors.description && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.description}</p>
                  )}
                </div>
                <div className="col-span-12">
                  <Button size="sm" type="submit">
                    {t('Base.Update')}
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
