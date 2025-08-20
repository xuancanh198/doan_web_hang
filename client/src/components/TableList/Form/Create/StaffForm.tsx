"use client";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  STATUS_ACTIVE,
  STATUS_NOT_ACTIVE,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
  NULL_VALUE_DEFAULT,
} from "@/constants/DataDefault";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { createStaff } from "@/lib/callAPI/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getDataRoleServer
} from "@/lib/callAPI/ServiceReduxCallAPI";
import { useDropzone } from "react-dropzone";

type OptionType = { value: string | number; label: string };

interface StaffFormValues {
  code: string;
  name: string;
  status: string;
  description: string
}

export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setFieldValueRef = useRef<any>(null);

    const [preview, setPreview] = useState<string | null>(null);
 const [roles, setRoles] = useState<any[]>([]);
 
useEffect(() => {
  const callAPiDataAll = async () => {
    try {
      const [resRoles] = await Promise.all([
        getDataRoleServer(
          false,
          PAGE_DEFAULT,
          LIMIT_DEFAULT,
          NULL_VALUE_DEFAULT,
          NULL_VALUE_DEFAULT,
          true
        )
      ]);

      const dataRolesAll = resRoles?.result?.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }));

      setRoles(dataRolesAll);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  callAPiDataAll();
}, []);

const StaffSchema = Yup.object().shape({
  // code: Yup.string()
  //   .required(t("Validation.RequiredField", { field: t("Staff.code") }))
  //   .min(2, t("Validation.MinLength", { field: t("Staff.code"), min: 2 }))
  //   .max(20, t("Validation.MaxLength", { field: t("Staff.code"), max: 20 })),
  // username: Yup.string().required(t("Validation.RequiredField", { field: t("Staff.username") })),
  // fullname: Yup.string().required(t("Validation.RequiredField", { field: t("Staff.fullname") })),
  // email: Yup.string().email(t("Validation.InvalidEmail")).required(t("Validation.RequiredField", { field: t("Staff.email") })),
  // phone: Yup.string().required(t("Validation.RequiredField", { field: t("Staff.phone") })),
  // address: Yup.string().required(t("Validation.RequiredField", { field: t("Staff.address") })),
  // role_id: Yup.number().required(t("Validation.RequiredField", { field: t("Staff.role") })),
  // status: Yup.string().required(t("Validation.RequiredField", { field: t("Staff.status") })),
  // description: Yup.string(),
  // avatar: Yup.mixed().nullable()
});


  const options = [
    { value: STATUS_ACTIVE, label: t("Staff.statusValue.active") },
    { value: STATUS_NOT_ACTIVE, label: t("Staff.statusValue.hideTemporarily") },
  ];

  const createData = async (
    values: any,
    resetForm: () => void
  ) => {
    const formData = new FormData();

    formData.append("code", values.code);
    formData.append("username", values.username);
    formData.append("fullname", values.fullname);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("role_id", values.role_id.toString());
    formData.append("status", values.status);
    formData.append("description", values.description);
  
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    const data = await dispatch(createStaff(formData));
    if (data?.status === "success") {
      const result = await Swal.fire({
        title: t("Base.NotificationCreateSuccess"),
        text: t("Base.TitleWhenCreateModal"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: t("Base.Confirm"),
        cancelButtonText: t("Base.Cancel"),
      });

      if (result.isConfirmed) {
        router.push("/admin/manage-list?query=Staff");
      } else {
        resetForm();
      }
    }
  };
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValueRef.current?.("avatar", file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });
  return (
    <ComponentCard title={t("Base.CreateTitle", { field: t("Page.staff") })}>
      <Formik
        initialValues={{
          code: "",
          username: "",
          fullname : "",
          email: "",
          phone: "",
          avatar: "",
          address : "",
          role_id : 0,
          status: STATUS_ACTIVE.toString(),
          description: "",
        }}
        validationSchema={StaffSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Staff.code")}</Label>
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
                  <Label>{t("Staff.username")}</Label>
                  <Input
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    error={!!errors.username && touched.username}
                    hint={touched.username && errors.username ? errors.username : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Staff.fullname")}</Label>
                  <Input
                    name="fullname"
                    type="text"
                    value={values.fullname}
                    onChange={handleChange}
                    error={!!errors.fullname && touched.fullname}
                    hint={touched.fullname && errors.fullname ? errors.fullname : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Staff.email")}</Label>
                  <Input
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email && touched.email}
                    hint={touched.email && errors.email ? errors.email : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Staff.phone")}</Label>
                  <Input
                    name="phone"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    error={!!errors.phone && touched.phone}
                    hint={touched.phone && errors.phone ? errors.phone : ""}
                  />
                </div>
                
     <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("PermisstionDetail.action")}</Label>
                  <div className="relative">
                    <Select
                      value={values.role_id}
                      options={roles}
                      placeholder={t("PermisstionDetail.changeTextPlaceholder", { field: t("PermisstionDetail.status") })}
                      onChange={(val: string | number) => setFieldValue("role_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                    {touched.role_id && errors.role_id && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.role_id}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Staff.status")}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t("Staff.changeTextPlaceholder", {
                        field: t("Staff.status"),
                      })}
                      onChange={(val: string | number) =>
                        setFieldValue("status", val)
                      }
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                    {touched.status && errors.status && (
                      <p className="text-red-500 text-sm mt-1.5">
                        {errors.status}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-8">
                  <Label>{t("Staff.address")}</Label>
                  <Input
                    name="address"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    error={!!errors.address && touched.address}
                    hint={touched.address && errors.address ? errors.address : ""}
                  />
                </div>
                <div className="col-span-12">
                  <Label>{t("Staff.description")}</Label>
                  <TextArea
                    value={values.description}
                    onChange={(val) =>
                      setFieldValue("description", val as string)
                    }
                    rows={6}
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mt-1.5">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="col-span-12">
                  <Label>{t('Staff.avatar')}</Label>
                  <div
                    {...getRootProps()}
                    className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-brand-500 transition"
                  >
                    <input {...getInputProps()} name="avatar" />
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
