<?php

namespace App\Enums;

enum SettingType
{
    const SETTING_TYPE_UPLOAD_IMAGE = "image";
    const SETTING_TYPE_UPLOAD_FILE = "file";
    const SETTING_TYPE_INPUT_TEXT = "text";
    const SETTING_TYPE_TEXT_AREA = "text_area";
    const SETTING_TYPE_RICH_TEXT = "rich_text_box";
    const SETTING_TYPE_CODE_EDITOR = "code_editor";
    const SETTING_TYPE_CHECKBOX = "checkbox";
    const SETTING_TYPE_RADIO = "radio_btn";
    const SETTING_TYPE_SELECT = "select_dropdown";
    const SETTING_TYPE_SELECT_MULTIPLE = "select_multiple";
    const SETTING_TYPE_NUMBER = "number";
    const SETTING_TYPE_DATE = "date";
    const SETTING_TYPE_DATETIME = "timestamp";
    const SETTING_TYPE_COLOR = "color";
    const SETTING_TYPE_HIDDEN = "hidden";
}
