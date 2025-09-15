"use client";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  STATUS_ACTIVE,
  STATUS_NOT_ACTIVE,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
  NULL_VALUE_DEFAULT
} from "@/constants/DataDefault";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { createPermisstionDetail} from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getDataActionServer, getDataPermisstionServer } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setFieldValueRef = useRef<any>(null);
const [optionsPermisstion, setOptionPermisstion] = useState<any[]>([]);
const [optionsAction, setOptionAction] = useState<any[]>([]);
useEffect(() => {
  const callAPiDataAll = async () => {
    try {
      const [resAction, resPermisstion] = await Promise.all([
        getDataActionServer(
          false,
          PAGE_DEFAULT,
          LIMIT_DEFAULT,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          true
        ),
        getDataPermisstionServer(
          false,
          PAGE_DEFAULT,
          LIMIT_DEFAULT,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          true
        ),
      ]);

      const dataPermisstionAll = resPermisstion?.result?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }));

      const dataActionAll = resAction?.result?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }));

      setOptionPermisstion(dataPermisstionAll);
      setOptionAction(dataActionAll);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  callAPiDataAll();
}, []);


  const PermisstionDetailSchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('PermisstionDetail.code') }))
      .min(2, t('Validation.MinLength', { field: t('PermisstionDetail.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('PermisstionDetail.code'), max: 20 })),
    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('PermisstionDetail.name') }))
      .min(2, t('Validation.MinLength', { field: t('PermisstionDetail.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('PermisstionDetail.name'), max: 50 })),
  });

  const options = [
    { value: STATUS_ACTIVE, label: t('PermisstionDetail.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('PermisstionDetail.statusValue.hideTemporarily') },
  ];

  const createData = async (values: any, resetForm: () => void) => {
    const data = await dispatch(createPermisstionDetail(values));
    if (data?.status === "success") {
      const result = await Swal.fire({
        title: t('Base.NotificationCreateSuccess'),
        text: t('Base.TitleWhenCreateModal'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: t("Base.Confirm"),
        cancelButtonText: t("Base.Cancel"),
      });

      if (result.isConfirmed) {
        router.push("/admin/manage-list?query=permisstion=detail");
      } else {
        resetForm();
      }
    }
  };

  return (
    <ComponentCard title={t("Base.CreateTitle", { field: t("Page.permisstionDetail") })}>
      <Formik
        initialValues={{
          code: "",
          url : "",
          name: "",
          action_id : 1,
          permisstion_id: 1,
          status: STATUS_ACTIVE.toString(),
          description: "",
        }}
        validationSchema={PermisstionDetailSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;
          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.code")}</Label>
                  <Input
                    name="code"
                    type="text"
                    value={values.code}
                    onChange={handleChange}
                    error={!!errors.code && touched.code}
                    hint={touched.code && errors.code ? errors.code : ""}
                  />
                </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.url")}</Label>
                  <Input
                    name="url"
                    type="text"
                    value={values.url}
                    onChange={handleChange}
                    error={!!errors.url && touched.url}
                    hint={touched.url && errors.url ? errors.url : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.name")}</Label>
                  <Input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    error={!!errors.name && touched.name}
                    hint={touched.name && errors.name ? errors.name : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.status")}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t("PermisstionDetail.changeTextPlaceholder", { field: t("PermisstionDetail.status") })}
                      onChange={(val: string | number) => setFieldValue("status", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                    {touched.status && errors.status && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.status}</p>
                    )}
                  </div>
                </div>
<div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.permisstion")}</Label>
                  <div className="relative">
                    <Select
                      value={values.permisstion_id}
                      options={optionsPermisstion}
                      placeholder={t("PermisstionDetail.changeTextPlaceholder", { field: t("PermisstionDetail.status") })}
                      onChange={(val: string | number) => setFieldValue("permisstion_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                    {touched.permisstion_id && errors.permisstion_id && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.permisstion_id}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.action")}</Label>
                  <div className="relative">
                    <Select
                      value={values.action_id}
                      options={optionsAction}
                      placeholder={t("PermisstionDetail.changeTextPlaceholder", { field: t("PermisstionDetail.status") })}
                      onChange={(val: string | number) => setFieldValue("action_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                    {touched.action_id && errors.action_id && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.action_id}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-12">
                  <Label>{t("PermisstionDetail.description")}</Label>
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
                    {t("Base.Create")}
                  </Button>
                  <Button
                    size="sm"
                    className="ms-[20px]"
                    variant="outline"
                    type="button"
                  >
                    {t("Base.Cancel")}
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
