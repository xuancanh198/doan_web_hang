"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import {loginAdmin} from "@/lib/callAPI/admin/ServiceReduxCallAPI"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("ManageInAdmin"); // 🟢 giữ namespace gốc
const dispatch = useDispatch<AppDispatch>();
  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("auth.usernameRequired")),
    password: Yup.string()
      .required(t("auth.passwordRequired")),
    remember: Yup.boolean(),
  });
   const loginCallAPI = async (data : any) =>{
    await dispatch(loginAdmin(data))
   }
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t("auth.title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.subtitle")}
            </p>
          </div>

          <Formik
            initialValues={{ username: "", password: "", remember: false }}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
               loginCallAPI(values)
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue }) => (
              <Form>
                <div className="space-y-6">
                  <div>
                    <Label>
                      {t("auth.username")}{" "}
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      name="username"
                      placeholder="info@gmail.com"
                      type="username"
                      value={values.username}
                      onChange={handleChange}
                      error={!!errors.username && touched.username}
                      hint={touched.username && errors.username ? errors.username : ""}
                    />
                  </div>

                  <div>
                    <Label>
                      {t("auth.password")}{" "}
                      <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.password")}
                        value={values.password}
                        onChange={handleChange}
                        error={!!errors.password && touched.password}
                        hint={
                          touched.password && errors.password
                            ? errors.password
                            : ""
                        }
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={values.remember}
                        onChange={(val) => setFieldValue("remember", val)}
                      />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        {t("auth.remember")}
                      </span>
                    </div>
                    <Link
                      href="/reset-password"
                      className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>

                  <div>
                    <Button className="w-full" size="sm" type="submit">
                      {t("auth.signIn")}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              {t("auth.noAccount")}{" "}
              <Link
                href="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                {t("auth.signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
