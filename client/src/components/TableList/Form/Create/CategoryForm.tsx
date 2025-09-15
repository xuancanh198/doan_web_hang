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
import { createCategory } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getDataCategoryServer } from "@/lib/callAPI/admin/ServiceServerCallAPI"
import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT } from "@/constants/DataDefault";
import { useDispatch } from 'react-redux';
import {  AppDispatch  } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
   const router = useRouter(); 
  const [optionsCategory, setOptionCategory] = useState<any[]>([]);
  const CategorySchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Category.code') }))
      .min(2, t('Validation.MinLength', { field: t('Category.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Category.code'), max: 20 })),
    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Category.name') }))
      .min(2, t('Validation.MinLength', { field: t('Category.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Category.name'), max: 50 })),
       image: Yup.mixed()
    .required(t('Validation.RequiredField', { field: t('Category.image') }))
    .test("fileType", t('Validation.InvalidImageType'), (value) => {
      const file = value as File;
      if (!file) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    })
  });

  const [preview, setPreview] = useState<string | null>(null);
  const setFieldValueRef = useRef<any>(null);

  useEffect(() => {
    const callAPiDataAll = async () => {
      const res = await getDataCategoryServer(
        false,
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      );
      const dataCategoryAll = res?.result?.map((item: any, index: number) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });

      setOptionCategory(dataCategoryAll);
    };
    callAPiDataAll();
  }, [])

  const options = [
    { value: STATUS_ACTIVE, label: t('Category.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Category.statusValue.hideTemporarily') },
  ];
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValueRef.current?.("image", file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });
  const createData = async (values: any, resetForm: () => void) => {
    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("name", values.name);
    formData.append("status", values.status);
    formData.append("parent_id", values.parent || null);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.parent !== null && values.parent !== "") {
      formData.append("parent_id", values.parent);
    }
    const data = await dispatch(createCategory(formData));
    if(data?.status === "success") {
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
        router.push("/admin/manage-list?query=category");
      } else {
        setPreview(null);
      }
       resetForm();
    } 
  }
  return (
    <ComponentCard title={t('Base.CreateTitle', { field: t('Page.category') })}>
      <Formik
        initialValues={{
          code: "",
          name: "",
          status: STATUS_ACTIVE.toString(),
          parent: null,
          description: "",
          image: null,
        }}
        validationSchema={CategorySchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Category.code')}</Label>
                  <Input
                    name="code"
                    type="text"
                    value={values.code}
                    onChange={handleChange}
                    error={!!errors.code && touched.code}
                    hint={touched.code && errors.code ? errors.code : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Category.name')}</Label>
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
                  <Label>{t('Category.status')}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Category.status') })}
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

                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Category.parent')}</Label>
                  <div className="relative">
                    <Select
                      value={values.parent}
                      options={optionsCategory}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Category.parent') })}
                       onChange={(val) => setFieldValue("parent", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                <div className="col-span-12">
                  <Label>{t('Category.description')}</Label>
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
                  <Label>{t('Category.image')}</Label>
                  <div
                    {...getRootProps()}
                    className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-brand-500 transition"
                  >
                    <input {...getInputProps()} name="image" />
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-cover h-full w-full rounded-md"
                      />
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        {isDragActive
                          ? t('Base.dropHere')
                          : t('Base.dragOrClick')}
                      </p>
                    )}
                  </div>
                  {touched.image && errors.image && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.image}</p>
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
