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
import { updateRole } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getDataPermisstionServer,
  getDataActionServer,
  getDataPermisstionDetailServer
} from "@/lib/callAPI/admin/ServiceReduxCallAPI";

type OptionType = { value: string | number; label: string };

interface RoleFormValues {
  code: string;
  name: string;
  status: string;
  description: string;
  permissionDetails: {
    resourceId: string | number;
    actionId: string | number;
  }[];
}

export default function DefaultInputs({ dataDetail }: { dataDetail: any }) {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const setFieldValueRef = useRef<any>(null);
  const [permissions, setPermissions] = useState<OptionType[]>([]);
  const [actions, setActions] = useState<OptionType[]>([]);
  const [permisstionDetail, setpPrmisstionDetail] = useState<OptionType[]>([]);
  useEffect(() => {
    const callApiDataAll = async () => {
      try {
        const [resAction, resPermission, resPermisstionDetail] = await Promise.all([
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
          getDataPermisstionDetailServer(
            false,
            PAGE_DEFAULT,
            LIMIT_DEFAULT,
            NULL_VALUE_DEFAULT,
            NULL_VALUE_DEFAULT,
            true
          ),
        ]);

        const dataPermissionAll: OptionType[] =
          resPermission?.result?.map((item: any) => ({
            id: item?.id,
            name: item?.name,
            code: item?.code,
          })) || [];

        const dataActionAll: OptionType[] =
          resAction?.result?.map((item: any) => ({
            id: item?.id,
            name: item?.name,
            code: item?.code,
          })) || [];
        const dataPermisstionDetailAll: OptionType[] =
          resPermisstionDetail?.result?.map((item: any) => ({
            id: item?.id,
            name: item?.name,
            code: item?.code,
            action_id: item?.action_id,
            permisstion_id: item?.permisstion_id,
          })) || [];
        setPermissions(dataPermissionAll);
        setActions(dataActionAll);
        setpPrmisstionDetail(dataPermisstionDetailAll);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    callApiDataAll();
  }, []);

  const RoleSchema = Yup.object().shape({
    code: Yup.string()
      .required(t("Validation.RequiredField", { field: t("Role.code") }))
      .min(2, t("Validation.MinLength", { field: t("Role.code"), min: 2 }))
      .max(20, t("Validation.MaxLength", { field: t("Role.code"), max: 20 })),
    name: Yup.string()
      .required(t("Validation.RequiredField", { field: t("Role.name") }))
      .min(2, t("Validation.MinLength", { field: t("Role.name"), min: 2 }))
      .max(50, t("Validation.MaxLength", { field: t("Role.name"), max: 50 })),
    status: Yup.string().required(),
    description: Yup.string(),
  });

  const options = [
    { value: STATUS_ACTIVE, label: t("Role.statusValue.active") },
    { value: STATUS_NOT_ACTIVE, label: t("Role.statusValue.hideTemporarily") },
  ];

  const createData = async (
    values: RoleFormValues,
    resetForm: () => void
  ) => {
    const data = await dispatch(updateRole(dataDetail?.id ,values));
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
        router.push("/admin/manage-list?query=role");
      } else {
        resetForm();
      }
    }
  };

  return (
    <ComponentCard title={t("Base.EditTitle", { field: t("Page.role") })}>
      <Formik
      enableReinitialize
        initialValues={{
          code: dataDetail?.code || "",
          name: dataDetail?.name || "",
          status: dataDetail?.status || STATUS_ACTIVE.toString(),
          description: dataDetail?.description || "",
          permisstion_detail: dataDetail?.permisstion_detail
          ? Object.entries(dataDetail.permisstion_detail)
              .filter(([_, value]) => value === true)
              .map(([key]) => key)
          : [],
        }}
        validationSchema={RoleSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setFieldValueRef.current = setFieldValue;

          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t("Role.code")}</Label>
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
                  <Label>{t("Role.name")}</Label>
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
                  <Label>{t("Role.status")}</Label>
                  <div className="relative">
                    <Select
                      value={values.status}
                      options={options}
                      placeholder={t("Role.changeTextPlaceholder", {
                        field: t("Role.status"),
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

                <div className="col-span-12">
                  <Label>{t("Role.description")}</Label>
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
