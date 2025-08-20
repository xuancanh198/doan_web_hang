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
import { updateStaff } from "@/lib/callAPI/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getDataRoleServer
} from "@/lib/callAPI/ServiceReduxCallAPI";
import { useDropzone } from "react-dropzone";
import {
  getDataPermisstionServer,
  getDataActionServer,
  getDataPermisstionDetailServer
} from "@/lib/callAPI/ServiceReduxCallAPI";
type OptionType = { value: string | number; label: string };

interface StaffFormValues {
  code: string;
  name: string;
  status: string;
  description: string
}

export default function DefaultInputs({ dataDetail }: { dataDetail: any }) {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setFieldValueRef = useRef<any>(null);

  const [preview, setPreview] = useState<string | null>(null);
 const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<OptionType[]>([]);
   const [actions, setActions] = useState<OptionType[]>([]);
   const [permisstionDetail, setpPrmisstionDetail] = useState<OptionType[]>([]);
   useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          resAction,
          resPermission,
          resPermissionDetail,
          resRoles
        ] = await Promise.all([
          getDataActionServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
          getDataPermisstionServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
          getDataPermisstionDetailServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
          getDataRoleServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
        ]);
  
        // Permissions
        const dataPermissions: OptionType[] = resPermission?.result?.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          code: item?.code,
        })) || [];
  
        // Actions
        const dataActions: OptionType[] = resAction?.result?.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          code: item?.code,
        })) || [];
  
        // Permission Details
        const dataPermissionDetails: OptionType[] = resPermissionDetail?.result?.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          code: item?.code,
          action_id: item?.action_id,
          permisstion_id: item?.permisstion_id,
        })) || [];
  
        // Roles
        const dataRoles: OptionType[] = resRoles?.result?.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })) || [];
  
        // Set state
        setPermissions(dataPermissions);
        setActions(dataActions);
        setpPrmisstionDetail(dataPermissionDetails);
        setRoles(dataRoles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAllData();
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
    formData.append("permisstion_detail", values.permisstion_detail);
    if (values.avatar) {
      formData.append("avatar", values.avatar);
    }
    const data = await dispatch(updateStaff(dataDetail?.id , formData, true));
    if (data?.status === "success") {
      const result = await Swal.fire({
        title: t("Base.NotificationCreateSuccess"),
        text: t("Base.TitleWhenUpdateModal"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: t("Base.Confirm"),
        cancelButtonText: t("Base.Cancel"),
      });

      if (result.isConfirmed) {
        router.push("/admin/manage-list?query=staff");
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
useEffect(() => {
    if (dataDetail?.avatar) {
      setPreview(dataDetail.avatar);
    }
  }, [dataDetail]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });
  return (
    <ComponentCard title={t("Base.EditTitle", { field: t("Page.staff") })}>
      <Formik
      enableReinitialize
        initialValues={{
          code: dataDetail?.code || "",
          username: dataDetail?.username || "",
          fullname : dataDetail?.fullname || "",
          email: dataDetail?.email || "",
          phone: dataDetail?.phone || "",
          address : dataDetail?.address || "",
          role_id :  dataDetail?.role_id,
          status: STATUS_ACTIVE.toString(),
          description: dataDetail?.description || "",
          permisstion_detail: dataDetail?.permisstion_detail
          ? Object.entries(dataDetail.permisstion_detail)
              .filter(([_, value]) => value === true)
              .map(([key]) => key)
          : [],
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
                  <Label>{t("Page.role")}</Label>
                  <div className="relative">
                    <Select
                      value={values.role_id}
                      options={roles}
                      placeholder={t("Staff.changeTextPlaceholder", { field: t("Staff.status") })}
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
                  <div className="overflow-auto border rounded mt-6">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-dark-800 text-left">
                          <th className="p-3 border-b text-center">
                            <div className="flex  ">
                              <input
                                type="checkbox"
                                checked={permissions.every((perm: any) =>
                                  actions.every((action: any) => {
                                    const match = permisstionDetail.find(
                                      (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                                    );
                                    return match && values.permisstion_detail.includes(match.code);
                                  })
                                )}
                                onChange={(e) => {
                                  const allCodes = permissions.flatMap((perm: any) =>
                                    actions.map((action: any) =>
                                      permisstionDetail.find(
                                        (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                                      )
                                    )
                                  ).filter((pd: any) => pd).map((pd: any) => pd.code);

                                  if (e.target.checked) {
                                    const updated = [...new Set([...values.permisstion_detail, ...allCodes])];
                                    setFieldValue("permisstion_detail", updated);
                                  } else {
                                    const updated = values.permisstion_detail.filter(
                                      (code: string) => !allCodes.includes(code)
                                    );
                                    setFieldValue("permisstion_detail", updated);
                                  }
                                }}
                              />
                              <span className="text-sm ms-2">{t('Page.permisstion')} \ {t('Page.action')}</span>
                            </div>
                          </th>

                          {actions.map((action: any) => {
                            const allChecked = permissions.every((perm: any) => {
                              const match = permisstionDetail.find(
                                (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                              );
                              return match && values.permisstion_detail.includes(match.code);
                            });

                            return (
                              <th key={action.id} className="p-3 border-b text-center">
                                <div className="flex  justify-center">
                                  <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={(e) => {
                                      const newCodes = permissions
                                        .map((perm: any) =>
                                          permisstionDetail.find(
                                            (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                                          )
                                        )
                                        .filter((pd: any) => pd)
                                        .map((pd: any) => pd.code);

                                      const current = values.permisstion_detail || [];

                                      if (e.target.checked) {
                                        const updated = [...new Set([...current, ...newCodes])];
                                        setFieldValue("permisstion_detail", updated);
                                      } else {
                                        const updated = current.filter((item: string) => !newCodes.includes(item));
                                        setFieldValue("permisstion_detail", updated);
                                      }
                                    }}
                                  />
                                  <span className="ms-2">{action.name}</span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {permissions.map((perm: any) => {
                          const isAllChecked = actions.every((action: any) => {
                            const match = permisstionDetail.find(
                              (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                            );
                            return match && values.permisstion_detail.includes(match.code);
                          });

                          return (
                            <tr key={perm.id} className="even:bg-gray-50 dark:even:bg-dark-900">
                              <td className="p-3 border-b">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={(e) => {
                                      const newCodes = actions
                                        .map((action: any) =>
                                          permisstionDetail.find(
                                            (pd: any) => pd.permisstion_id === perm.id && pd.action_id === action.id
                                          )
                                        )
                                        .filter((pd: any) => pd)
                                        .map((pd: any) => pd.code);

                                      const current = values.permisstion_detail || [];

                                      if (e.target.checked) {
                                        const updated = [...new Set([...current, ...newCodes])];
                                        setFieldValue("permisstion_detail", updated);
                                      } else {
                                        const updated = current.filter((item: string) => !newCodes.includes(item));
                                        setFieldValue("permisstion_detail", updated);
                                      }
                                    }}
                                  />
                                  <span>{perm.name}</span>
                                </div>
                              </td>
                              {actions.map((action: any) => {
                                const matchedDetail = permisstionDetail.find(
                                  (pd: any) =>
                                    pd.permisstion_id === perm.id && pd.action_id === action.id
                                );
                                if (!matchedDetail) {
                                  return <td key={action.id} className="p-3 border-b text-center">—</td>;
                                }
                                const isChecked = values.permisstion_detail.includes(matchedDetail.code);
                                return (
                                  <td key={action.id} className="p-3 border-b text-center">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={(e) => {
                                        const current = values.permisstion_detail || [];
                                        if (e.target.checked) {
                                          setFieldValue("permisstion_detail", [...current, matchedDetail.code]);
                                        } else {
                                          setFieldValue(
                                            "permisstion_detail",
                                            current.filter((item: string) => item !== matchedDetail.code)
                                          );
                                        }
                                      }}
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-span-12">
                  <Button size="sm" type="submit">
                    {t("Base.Update")}
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
