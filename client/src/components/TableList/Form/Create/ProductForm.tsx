"use client";
import React, { useRef, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { STATUS_ACTIVE, STATUS_NOT_ACTIVE } from "@/constants/DataDefault";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { ChevronDownIcon } from "@/icons";
import { createProduct } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useTranslations } from "next-intl";
import { getDataCategoryClient, getDataAuthorClient, getDataPublisherClient, getLangSystem } from "@/lib/callAPI/admin/ServiceReduxCallAPI"
import { PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT } from "@/constants/DataDefault";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { setListCategoryAll, setListPublisherAll, setListAuthorAll, setLangsSystem } from "@/lib/redux/Features/Crud";
import DatePicker from 'react-datepicker';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { TagsInput } from "react-tag-input-component";

export default function DefaultInputs() {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const listCategoryAll = useSelector((state: RootState) => state.crud.listCategoryAll);
  const listAuthorAll = useSelector((state: RootState) => state.crud.listAuthorAll);
  const listPublisherAll = useSelector((state: RootState) => state.crud.listPublisherAll);
  const langsSystem = useSelector((state: RootState) => state.crud.langsSystem);

 const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];
  const ProductSchema = Yup.object().shape({
      code: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Product.code') }))
      .min(2, t('Validation.MinLength', { field: t('Product.code'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Product.code'), max: 255 })),

    name: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Product.name') }))
      .min(2, t('Validation.MinLength', { field: t('Product.name'), min: 2 }))
      .max(255, t('Validation.MaxLength', { field: t('Product.name'), max: 255 })),

    category_id: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Page.category') })),

    author_id: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Page.author') })),

    publisher_id: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Page.publisher') })),

    price: Yup.number()
      .typeError(t('Validation.MustBeNumber', { field: t('Product.price') }))
      .required(t('Validation.RequiredField', { field: t('Product.price') }))
      .min(0, t('Validation.MinValue', { field: t('Product.price'), min: 0 })),

    pages: Yup.number()
      .typeError(t('Validation.MustBeNumber', { field: t('Product.pages') }))
      .required(t('Validation.RequiredField', { field: t('Product.pages') }))
      .min(1, t('Validation.MinValue', { field: t('Product.pages'), min: 1 })),

    lang: Yup.string()
      .required(t('Validation.RequiredField', { field: t('Product.lang') })),

    published_ad: Yup.date()
      .required(t('Validation.RequiredField', { field: t('Product.published_ad') })),

    started_ad: Yup.date()
      .required(t('Validation.RequiredField', { field: t('Product.started_ad') })),

    ended_ad: Yup.date()
      .required(t('Validation.RequiredField', { field: t('Product.ended_ad') }))
      .min(Yup.ref('started_ad'), t('Validation.EndDateMustBeAfterStartDate')),

   images: Yup.mixed<File[]>()
    .test('is-files', t('Validation.MustSelectImage'), (value) => {
      return value && Array.isArray(value) && value.length > 0;
    })
    .test(
      'file-size',
      t('Validation.FileTooLarge', { maxSize: `${MAX_FILE_SIZE / 1024 / 1024}MB` }),
      (value) => {
        return value ? value.every(file => file.size <= MAX_FILE_SIZE) : true;
      }
    )
    .test('file-format', t('Validation.InvalidFileType'), (value) => {
      return value ? value.every(file => SUPPORTED_FORMATS.includes(file.type)) : true;
    }),

  coverPhoto: Yup.mixed<File>()
    .required(t('Validation.RequiredField', { field: t('Product.coverPhoto') }))
    .test(
      'file-size',
      t('Validation.FileTooLarge', { maxSize: `${MAX_FILE_SIZE / 1024 / 1024}MB` }),
      (value) => {
        return value ? value.size <= MAX_FILE_SIZE : true;
      }
    )
    .test('file-format', t('Validation.InvalidFileType'), (value) => {
      return value ? SUPPORTED_FORMATS.includes(value.type) : true;
    }),
    description: Yup.string()
      .max(5000, t('Validation.MaxLength', { field: t('Product.description'), max: 5000 })),

  });
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const setCoverPhotoValueRef = useRef<any>(null);

  const [images, setImages] = useState<string[]>([]);
  const setImagesValueRef = useRef<any>(null);


 useEffect(() => {
  // Nếu cả 4 list đều đã có dữ liệu thì bỏ qua
  if (
    listCategoryAll.length > 0 &&
    listAuthorAll.length > 0 &&
    listPublisherAll.length > 0 &&
    langsSystem.length > 0
  ) {
    return;
  }

  const callAPiDataAll = async () => {
    const [
      resCategory,
      resAuthor,
      resPublisher,
      resLangs
    ] = await Promise.all([
      dispatch(getDataCategoryClient(
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      )),
      dispatch(getDataAuthorClient(
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      )),
      dispatch(getDataPublisherClient(
        PAGE_DEFAULT,
        LIMIT_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        NULL_VALUE_DEFAULT,
        true
      )),
      dispatch(getLangSystem(true))
    ]);

    if (resCategory?.result) {
      dispatch(setListCategoryAll(
        resCategory.result.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }))
      ));
    }

    if (resAuthor?.result) {
      dispatch(setListAuthorAll(
        resAuthor.result.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }))
      ));
    }

    if (resPublisher?.result) {
      dispatch(setListPublisherAll(
        resPublisher.result.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }))
      ));
    }

    if (resLangs?.result) {
      dispatch(setLangsSystem(
        resLangs.result.map((item: any) => ({
          value: item?.value,
          label: item?.name,
        }))
      ));
    }
  };

  callAPiDataAll();
}, [
  listCategoryAll.length,
  listAuthorAll.length,
  listPublisherAll.length,
  langsSystem.length
]);
  console.log(langsSystem)
  const options = [
    { value: STATUS_ACTIVE, label: t('Product.statusValue.active') },
    { value: STATUS_NOT_ACTIVE, label: t('Product.statusValue.hideTemporarily') },
  ];

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file));
      setCoverPhotoValueRef.current?.("coverPhoto", file);
    }
  };

  const onDropImages = (acceptedFiles: File[]) => {
    const imageURLs = acceptedFiles.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageURLs]);
    setImagesValueRef.current?.("images", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "coverPhoto/*": [],
    },
  });

  const {
    getRootProps: getRootPropsImages,
    getInputProps: getInputPropsImages,
    isDragActive: isDragActiveImages,
  } = useDropzone({
    onDrop: onDropImages,
    multiple: true, // ✅ bật multiple
    accept: { "images/*": [] },
  });

  const createData = async (values: any, resetForm: () => void) => {
    const formData = new FormData();
 
    formData.append("code", values.code);
    formData.append("name", values.name);
    formData.append("status", values.status);
    formData.append("category_id", values.category_id ?? "");
    formData.append("author_id", values.author_id ?? "");
    formData.append("publisher_id", values.publisher_id ?? "");
    formData.append("price", values.price);
    formData.append("pages", values.pages);
    formData.append("lang", values.lang ?? "");
    formData.append("figures", values.figures);
    formData.append("published_ad", values.published_ad);
    formData.append("started_ad", values.started_ad);
    formData.append("ended_ad", values.ended_ad);
    formData.append("tags", values.tags);
    formData.append("description", values.description);
    formData.append("coverPhoto", values.coverPhoto);
    formData.append("images", values.images);

    if (values.images && Array.isArray(values.images)) {
      values.images.forEach((file: File, index: number) => {
        formData.append(`images[${index}]`, file);
      });
    }
    formData.append("figures", JSON.stringify(values.attributes ?? []));

    const data = await dispatch(createProduct(formData));
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
        router.push("/admin/manage-list?query=product");
      } else {
        resetForm();
        setCoverPhoto(null);
        setCoverPhoto([]);
      }
    }
  }

  return (
    <ComponentCard title={t('Base.CreateTitle', { field: t('Page.product') })}>
      <Formik
        initialValues={{
          code: "",
          name: "",
          status: STATUS_ACTIVE.toString(),
          category_id: null,
          author_id: null,
          publisher_id: null,
          price: "",
          pages: "",
          lang: null,
          figures: [],
          published_ad: new Date().toISOString().split('T')[0],
          started_ad: new Date().toISOString().split('T')[0],
          ended_ad: new Date().toISOString().split('T')[0],
          images: null,
          coverPhoto: null,
          description: "",
          attributes: [],
          tags: [],
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => createData(values, resetForm)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          setCoverPhotoValueRef.current = setFieldValue;
          setImagesValueRef.current = setFieldValue;
          return (
            <Form>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.code')}</Label>
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
                  <Label>{t('Product.name')}</Label>
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
                  <Label>{t('Product.price')}</Label>
                  <Input
                    name="price"
                    type="text"
                    value={values.price}
                    onChange={handleChange}
                    error={!!errors.price && touched.price}
                    hint={touched.price && errors.price ? errors.price : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.pages')}</Label>
                  <Input
                    name="pages"
                    type="text"
                    value={values.pages}
                    onChange={handleChange}
                    error={!!errors.pages && touched.pages}
                    hint={touched.pages && errors.pages ? errors.pages : ""}
                  />
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.status')}</Label>
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

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Page.category')}</Label>
                  <div className="relative">
                    <Select
                      value={values.category_id}
                      options={listCategoryAll}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Page.category') })}
                      onChange={(val) => setFieldValue("category_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>

                  {touched.category_id && errors.category_id && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.category_id}
                    </div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Page.author')}</Label>
                  <div className="relative">
                    <Select
                      value={values.author_id}
                      options={listAuthorAll}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Page.author') })}
                      onChange={(val) => setFieldValue("author_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {touched.author_id && errors.author_id && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.author_id}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Page.publisher')}</Label>
                  <div className="relative">
                    <Select
                      value={values.publisher_id}
                      options={listPublisherAll}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Page.publisher') })}
                      onChange={(val) => setFieldValue("publisher_id", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {touched.publisher_id && errors.publisher_id && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.publisher_id}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.lang')}</Label>
                  <div className="relative">
                    <Select
                      value={values.lang}
                      options={langsSystem}
                      placeholder={t('Category.changeTextPlaceholder', { field: t('Product.lang') })}
                      onChange={(val) => setFieldValue("lang", val)}
                      className="dark:bg-dark-900"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {touched.lang && errors.lang && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.lang}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.started_ad')}</Label>
                  <DatePicker
                    selected={values.started_ad ? new Date(values.started_ad) : null}
                    onChange={(date: Date | null) => {
                      setFieldValue('started_ad', date ? date.toISOString().split('T')[0] : "");
                    }}
                    className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
                    dateFormat="yyyy-MM-dd"
                  />
                  {touched.started_ad && errors.started_ad && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.started_ad}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.ended_ad')}</Label>
                  <DatePicker
                    selected={values.ended_ad ? new Date(values.ended_ad) : null}
                    onChange={(date: Date | null) => {
                      setFieldValue('ended_ad', date ? date.toISOString().split('T')[0] : "");
                    }}
                    className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
                    dateFormat="yyyy-MM-dd"
                  />
                  {touched.ended_ad && errors.ended_ad && (
                    <div className="mt-1 text-sm text-red-500">
                      {errors.ended_ad}
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 xl:col-span-4">
                  <Label>{t('Product.published_ad')}</Label>
                  <DatePicker
                    selected={values.published_ad ? new Date(values.published_ad) : null}
                    onChange={(date: Date | null) => {
                      setFieldValue('published_ad', date ? date.toISOString().split('T')[0] : "");
                    }}
                    className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div className="col-span-12 md:col-span-6 ">
                  <Label>{t('Category.description')}</Label>
                  <TextArea
                    value={values.description}
                    onChange={(val) => setFieldValue("description", val)}
                    rows={6}
                    className="h-[160px]"
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.description}</p>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6 ">
                  <Label>{t('Product.coverPhoto')}</Label>
                  <div
                    {...getRootProps()}
                    className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-brand-500 transition"
                  >
                    <input {...getInputProps()} name="coverPhoto" />
                    {coverPhoto ? (
                      <img
                        src={coverPhoto}
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
                    {touched.coverPhoto && errors.coverPhoto && (
                      <div className="mt-1 text-sm text-red-500">{errors.coverPhoto as string}</div>
                    )}
                </div>
                <div className="col-span-12 girl gap-6">
                  <div
                    onClick={() => setFieldValue("attributes", [...values.attributes, { name: "", value: "" }])}
                    className="mb-[20px] max-w-[200px] flex justify-center px-[16px] py-[12px] cursor-pointer rounded-[12px] bg-green-500"
                  >
                    <label className="font-medium text-white">{t("Product.attribute.Create")}</label>
                  </div>

                  {/* Duyệt attributes */}
                  {values.attributes.map((attr, i) => (
                    <div key={i} className="col-span-12 grid grid-cols-12 gap-6">
                      <div className="col-span-12 md:col-span-6">
                        <Label>{t("Product.attribute.name")}</Label>
                        <Input
                          name={`attributes[${i}].name`}
                          type="text"
                          value={attr.name}
                          onChange={(e) => setFieldValue(`attributes[${i}].name`, e.target.value)}
                          error={!!errors.attributes?.[i]?.name && touched.attributes?.[i]?.name}
                          hint={touched.attributes?.[i]?.name && errors.attributes?.[i]?.name ? errors.attributes[i].name : ""}
                        />
                      </div>

                      <div className="col-span-12 md:col-span-6">
                        <Label>{t("Product.attribute.value")}</Label>
                        <TextArea
                          rows={6}
                          value={attr.value}
                          onChange={(val) => setFieldValue(`attributes[${i}].value`, val)}
                          error={!!errors.attributes?.[i]?.value && touched.attributes?.[i]?.value}
                          hint={touched.attributes?.[i]?.value && errors.attributes?.[i]?.value ? errors.attributes[i].value : ""}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-span-12">
                  <Label>{t('Product.tags')}</Label>
                  <TagsInput
                    value={values.tags}
                    onChange={(tags) => setFieldValue("tags", tags)}
                    name="tags"
                    placeHolder="Nhập tag và nhấn Enter"
                  />
                </div>
                <div className="col-span-12">
                  <Label>{t('Product.images')}</Label>
                  <div
                    {...getRootPropsImages()}
                    className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-brand-500 transition"
                  >
                    <input {...getInputPropsImages()} name="images" />
                    {images.length > 0 ? (
                      <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full h-full">
                        {images.map((item, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={item}
                              alt={`Preview ${index}`}
                              className="object-cover h-full w-full rounded-md"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        {isDragActiveImages ? t('Base.dropHere') : t('Base.dragOrClick')}
                      </p>
                    )}
                  </div>
                  {touched.images && errors.images && (
                      <div className="mt-1 text-sm text-red-500">{errors.images as string}</div>
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
