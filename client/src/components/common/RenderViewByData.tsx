"use client";

import { useDropzone } from "react-dropzone";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useState } from 'react';
import InputColor from 'react-input-color';
import TextArea from "@/components/form/input/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "@/components/form/switch/Switch";

import {
    SETTING_TYPE_UPLOAD_IMAGE,
    SETTING_TYPE_INPUT_TEXT,
    SETTING_TYPE_TEXT_AREA,
    SETTING_TYPE_RICH_TEXT,
    SETTING_TYPE_UPLOAD_FILE,
    SETTING_TYPE_COLOR,
    SETTING_TYPE_DATE,
    SETTING_TYPE_DATETIME,
    SETTING_TYPE_HIDDEN
} from '@/constants/SettingType';

import Input from "@/components/form/input/InputField";
import { useTranslations } from "next-intl";

interface RenderViewByDataProp {
    value: string | null;
    content: any;
    setContent: (value: any) => void;
    valueName: string;
}

function RenderViewByData({ value = null, content, setContent, valueName }: RenderViewByDataProp) {
    const t = useTranslations("ManageInAdmin");
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setContent(file);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "image/*": [],
        },
    });

    const handleSwitchChange = (checked: boolean) => {
        setContent(checked ? "1" : "0");
    };

    return (
        <>
            {(() => {
                switch (value) {
                    case SETTING_TYPE_UPLOAD_IMAGE:
                        return (
                            <div
                                {...getRootProps()}
                                className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 hover:border-brand-500 transition"
                            >
                                <input {...getInputProps()} name={valueName} />
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
                        );

                    case SETTING_TYPE_UPLOAD_FILE:
                        return (
                            <Input
                                name="file"
                                type="file"
                                onChange={(e: any) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setContent(file);
                                    }
                                }}
                            />
                        );

                    case SETTING_TYPE_INPUT_TEXT:
                        return (
                            <Input
                                name="text"
                                type="text"
                                value={content}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                            />
                        );

                    case SETTING_TYPE_TEXT_AREA:
                        return (
                            <TextArea
                                rows={6}
                                value={content}
                                onChange={(val: string) => setContent(val)}
                            />
                        );

                    case SETTING_TYPE_COLOR:
                        return (
                            <InputColor
                                initialValue={content || "#5e72e4"}
                                onChange={(color) => setContent(color.hex)}
                                placement="right"
                            />
                        );

                    case SETTING_TYPE_DATE:
                        return (
                            <DatePicker
                                selected={content ? new Date(content) : null}
                                onChange={(date: Date | null) =>
                                    setContent(date ? date.toISOString().split("T")[0] : "")
                                }
                                dateFormat="yyyy-MM-dd"
                                className="input-class border p-2 rounded w-full"
                            />
                        );

                    case SETTING_TYPE_DATETIME:
                        return (
                            <DatePicker
                                selected={content ? new Date(content) : null}
                                onChange={(date: Date | null) =>
                                    setContent(date ? date.toISOString() : "")
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                className="input-class border p-2 rounded w-full"
                            />
                        );

                    case SETTING_TYPE_HIDDEN:
                        return (
                            <Switch
                                label="Default"
                                defaultChecked={content === "1"}
                                onChange={handleSwitchChange}
                            />
                        );

                    case SETTING_TYPE_RICH_TEXT:
                        return (
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                                config={{
                                    toolbar: [
                                        'heading', '|',
                                        'bold', 'italic', 'link',
                                        'bulletedList', 'numberedList', 'blockQuote'
                                    ],
                                    ckfinder: {
                                        uploadUrl: '/path/to/your/upload/url'
                                    }
                                }}
                            />
                        );

                    default:
                        return null;
                }
            })()}
        </>
    );
}

export default RenderViewByData;
