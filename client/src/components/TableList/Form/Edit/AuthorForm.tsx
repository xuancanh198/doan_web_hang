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
import { updateAuthor } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getDataAuthorServer } from "@/lib/callAPI/admin/ServiceReduxCallAPI"
import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, FALSE_VALUE_DEFAULT } from "@/constants/DataDefault";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch  } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
export default function DefaultInputs({ dataDetail }: { dataDetail: any }) {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
   const router = useRouter(); 
  const [optionsAuthor, setOptionAuthor] = useState<any[]>([]);
  const AuthorSchema = Yup.object().shape({
    code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Author.code') }))
      .min(2, t('Validation.MinLength', { field: t('Author.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Author.code'), max: 20 })),

    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Author.name') }))
      .min(2, t('Validation.MinLength', { field: t('Author.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Author.name'), max: 50 })),

    status: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Author.status') })),
  });

  const [preview, setPreview] = useState<string | null>(null);
  const setFieldValueRef = useRef<any>(null);

  useEffect(() => {
    const callAPiDataAll = async () => {
      const res = await getDataAuthorServer(
        false,
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      );
      const dataAuthorAll = res?.result?.map((item: any, index: number) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });

      setOptionAuthor(dataAuthorAll);
    };
    callAPiDataAll();
  }, [])

  const options = [
    { value: STATUS_ACTIVE, label: t('Author.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Author.statusValue.hideTemporarily') },
  ];
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValueRef.current?.("image", file);
    }
  };
  useEffect(() => {
    if (dataDetail?.image) {
      setPreview(dataDetail.image);
    }
  }, [dataDetail]);

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
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }
    const data = await dispatch(updateAuthor(dataDetail?.id, formData, true));
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
        router.push("/admin/manage-list?query=author");
      } else {
        resetForm();
        setPreview(null);
      }
    } 
  }
  return (
    <ComponentCard title={t('Base.EditTitle', { field: t('Page.author') })}>
      <Formik
       enableReinitialize
      initialValues={{
        code: dataDetail?.code || "",
        name: dataDetail?.name || "",
        status: dataDetail?.status || STATUS_ACTIVE.toString(),
        description: dataDetail?.description || "",
        image: null,
      }}
        validationSchema={AuthorSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;
          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Author.code')}</Label>
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
                  <Label>{t('Author.name')}</Label>
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
                  <Label>{t('Author.status')}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t('Author.changeTextPlaceholder', { field: t('Author.status') })}
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
                  <Label>{t('Author.description')}</Label>
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
                  <Label>{t('Author.image')}</Label>
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
