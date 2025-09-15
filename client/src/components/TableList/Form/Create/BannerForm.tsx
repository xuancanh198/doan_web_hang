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
import { createBanner } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getBannerPositionSystem } from "@/lib/callAPI/admin/ServiceReduxCallAPI"
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [optionsBanner, setOptionBanner] = useState<any[]>([]);
  const BannerSchema = Yup.object().shape({
    // name: Yup.string()
    //   .required(t('Validation.RequiredField', { field: t('Banner.name') }))
    //   .min(2, t('Validation.MinLength', { field: t('Banner.name'), min: 2 }))
    //   .max(50, t('Validation.MaxLength', { field: t('Banner.name'), max: 50 })),

    // title: Yup.string()
    //   .min(2, t('Validation.MinLength', { field: t('Banner.title'), min: 2 }))
    //   .max(100, t('Validation.MaxLength', { field: t('Banner.title'), max: 100 })),

    // status: Yup.string()
    //   .required(t('Validation.RequiredField', { field: t('Banner.status') })),

    // link: Yup.string()
    //   .url(t('Validation.InvalidURL', { field: t('Banner.link') }))
    //   .nullable()
    //   .notRequired(),

    // order: Yup.number()
    //   .typeError(t('Validation.MustBeNumber', { field: t('Banner.order') }))
    //   .min(0, t('Validation.MinNumber', { field: t('Banner.order'), min: 0 }))
    //   .required(t('Validation.RequiredField', { field: t('Banner.order') })),

    // position: Yup.number()
    //   .typeError(t('Validation.MustBeNumber', { field: t('Banner.position') }))
    //   .required(t('Validation.RequiredField', { field: t('Banner.position') })),

    // start_time: Yup.date()
    //   .nullable()
    //   .notRequired(),

    // end_time: Yup.date()
    //   .nullable()
    //   .min(
    //     Yup.ref('start_time'),
    //     t('Validation.EndTimeAfterStartTime', {
    //       start: t('Banner.start_time'),
    //       end: t('Banner.end_time'),
    //     })
    //   )
    //   .notRequired(),

    // description: Yup.string()
    //   .max(500, t('Validation.MaxLength', { field: t('Banner.description'), max: 500 }))
    //   .nullable()
    //   .notRequired(),

    // image: Yup.mixed()
    //   .nullable()
    //   .required(t('Validation.RequiredField', { field: t('Banner.image') }))
  });

  const [preview, setPreview] = useState<string | null>(null);
  const setFieldValueRef = useRef<any>(null);

  useEffect(() => {
    const callAPiDataAll = async () => {
      const res = await dispatch(getBannerPositionSystem(true));
      const dataBannerAll = res?.data?.result.map((item: any, index: number) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });

      setOptionBanner(dataBannerAll);
    };
    callAPiDataAll();
  }, [])

  const options = [
    { value: STATUS_ACTIVE, label: t('Banner.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Banner.statusValue.hideTemporarily') },
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
    console.log(values)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("title", values.title);
    formData.append("status", values.status);
    formData.append("link", values.link || "");
    formData.append("position", values.position.toString());
    formData.append("order", values.order || "");
    formData.append("start_time", values.start_time || "");
    formData.append("end_time", values.end_time || "");
    formData.append("description", values.description || "");

    if (values.image) {
      formData.append("image", values.image);
    }
    const data = await dispatch(createBanner(formData));
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
        router.push("/admin/manage-list?query=banner");
      } else {
        resetForm();
        setPreview(null);
      }
    }
  }
  return (
    <ComponentCard title={t('Base.CreateTitle', { field: t('Page.banner') })}>
      <Formik
        initialValues={{
           title: "",
                    status: STATUS_ACTIVE.toString(),
                    link: "",
                    position: 1,
                    order: "",
                    start_time: "",
                    end_time: "",
                    description: "",
                    image: null,

        }}
        validationSchema={BannerSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Banner.title')}</Label>
                  <Input
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    error={!!errors.title && touched.title}
                    hint={touched.title && errors.title ? errors.title : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Banner.link')}</Label>
                  <Input
                    name="link"
                    type="text"
                    value={values.link}
                    onChange={handleChange}
                    error={!!errors.link && touched.link}
                    hint={touched.link && errors.link ? errors.link : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Banner.order')}</Label>
                  <Input
                    name="order"
                    type="text"
                    value={values.order}
                    onChange={handleChange}
                    error={!!errors.order && touched.order}
                    hint={touched.order && errors.order ? errors.order : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>{t('Banner.status')}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t('Banner.changeTextPlaceholder', { field: t('Banner.status') })}
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
                  <Label>{t('Banner.position')}</Label>
                  <div className="relative">
                    <Select
                      value={values.position}
                      options={optionsBanner}
                      placeholder={t('Banner.changeTextPlaceholder', { field: t('Banner.position') })}
                      onChange={(val) => setFieldValue("position", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-6">
                  <Label>{t('Banner.start_time')}</Label>
                  <DatePicker
                    selected={values.start_time ? new Date(values.start_time) : null}
                    onChange={(date: Date | null) => {
                      setFieldValue('start_time', date ? date.toISOString().split('T')[0] : "");
                    }}
                    className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-6">
                  <Label>{t('Banner.end_time')}</Label>
                  <DatePicker
                    selected={values.end_time ? new Date(values.end_time) : null}
                    onChange={(date: Date | null) => {
                      setFieldValue('end_time', date ? date.toISOString().split('T')[0] : "");
                    }}
                    className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="col-span-12">
                  <Label>{t('Banner.description')}</Label>
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
                  <Label>{t('Banner.image')}</Label>
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
