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
import { createPublisher, getDataPublisherServer } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [optionsPublisher, setOptionPublisher] = useState<any[]>([]);
  const setFieldValueRef = useRef<any>(null);

  useEffect(() => {
    const callAPiDataAll = async () => {
      const res = await getDataPublisherServer(
        false,
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      );
      const dataPublisherAll = res?.result?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }));
      setOptionPublisher(dataPublisherAll);
    };
    callAPiDataAll();
  }, []);

  const PublisherSchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Publisher.code') }))
      .min(2, t('Validation.MinLength', { field: t('Publisher.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Publisher.code'), max: 20 })),
    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Publisher.name') }))
      .min(2, t('Validation.MinLength', { field: t('Publisher.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Publisher.name'), max: 50 })),
  });

  const options = [
    { value: STATUS_ACTIVE, label: t('Publisher.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Publisher.statusValue.hideTemporarily') },
  ];

  const createData = async (values: any, resetForm: () => void) => {
    const data = await dispatch(createPublisher(values));
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
        router.push("/admin/manage-list?query=publisher");
      } else {  
        resetForm();
      }
    }
  };

  return (
    <ComponentCard title={t("Base.CreateTitle", { field: t("Page.publisher") })}>
      <Formik
        initialValues={{
          code: "",
          name: "",
          status: STATUS_ACTIVE.toString(),
          description: "",
        }}
        validationSchema={PublisherSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;
          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Publisher.code")}</Label>
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
                  <Label>{t("Publisher.name")}</Label>
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
                  <Label>{t("Publisher.status")}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t("Publisher.changeTextPlaceholder", { field: t("Publisher.status") })}
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

                <div className="col-span-12">
                  <Label>{t("Publisher.description")}</Label>
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
