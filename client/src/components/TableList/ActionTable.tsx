'use client';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChangeLimit from "@/components/TableList/ChangeLimit";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/lib/redux/store";
import { AppDispatch } from '@/lib/redux/store';
import { setPage, setSearch, setFilterBase64, setTimeRangeFilter } from '@/lib/redux/Features/Crud';
import {
  LIMIT_DEFAULT,
  FALSE_VALUE_DEFAULT,
  ARRAY_Object_DEFAULT,
  TIME_Now_VALUE_DEFAULT,
  Number_Zero_DEFAULT,
  PAGE_DEFAULT, NULL_VALUE_DEFAULT
} from "@/constants/DataDefault";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE, BANNER_MANAGE, ACTIVE_LOG_MANAGE, PRODUCT_IMPORT_EXPORT_MANAGE } from "@/constants/PageManageInAdmin"
import { Column_Created_at } from "@/constants/ColumnBackendQuery";
import { deleteCategory } from "@/lib/callAPI/admin/ServiceReduxCallAPI"
import { faPlus, faMagnifyingGlass, faFilter, faRotateLeft, faFileImport, faTrash } from "@fortawesome/free-solid-svg-icons";
interface TableListProps {
  query?: string | null;
}
function ActionTable({ query = null }: TableListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const deleteIds = useSelector((state: RootState) => state.crud.deleteIds);
  const t = useTranslations("ManageInAdmin");
  const returnLink = () => {
    switch (query) {
      case CATEGORY_MANAGE:
        return "/admin/manage-list/create?query=category";
      case AUTHOR_MANAGE:
        return "/admin/manage-list/create?query=author";
      case PUBLISHER_MANAGE:
        return "/admin/manage-list/create?query=publisher";
      case SERIES_MANAGE:
        return "/admin/manage-list/create?query=series";
      case SETTING_MANAGE:
        return "/admin/manage-list/create?query=setting";
      case PERMISSTION_MANAGE:
        return "/admin/manage-list/create?query=permisstion";
      case ACTION_MANAGE:
        return "/admin/manage-list/create?query=action";
      case PERMISSTION_DETAIL_MANAGE:
        return "/admin/manage-list/create?query=permisstion-detail";
      case PRODUCT_MANAGE:
        return "/admin/manage-list/create?query=product";
      case ROLE_MANAGE:
        return "/admin/manage-list/create?query=role";
      case ROLE_MANAGE:
        return "/admin/manage-list/create?query=role";
      case STAFF_MANAGE:
        return "/admin/manage-list/create?query=staff";
         case BANNER_MANAGE:
        return "/admin/manage-list/create?query=banner";
          case PRODUCT_IMPORT_EXPORT_MANAGE:
        return "/admin/manage-list/create?query=product-import-export";
          case ACTIVE_LOG_MANAGE:
        return "";
      default:
        return "";
    }
  }
  const returnLoadPage = () => {
    dispatch(setPage(PAGE_DEFAULT));
    dispatch(setSearch({
      value: NULL_VALUE_DEFAULT,
      status: FALSE_VALUE_DEFAULT
    }));
    dispatch(setTimeRangeFilter({
      status: FALSE_VALUE_DEFAULT,
      column: Column_Created_at,
      startTime: TIME_Now_VALUE_DEFAULT,
      endTime: TIME_Now_VALUE_DEFAULT,
    }));
    dispatch(setFilterBase64([]))
  }
  const deleteIdsArray = async () => {
    const result = await Swal.fire({
      title: t("Base.Delete") + " " + t("Page.category"),
      text: t("Base.TitleDeleteModalCategory"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: t("Base.Confirm"),
      cancelButtonText: t("Base.Cancel"),
    });

    if (result.isConfirmed) {
      await dispatch(deleteCategory(deleteIds));
    }
  };

  return (
    <div className=" block md:flex justify-between items-start">
      <div className="ms-[10px] flex gap-[10px] md:gap-[18px] mb-[40px] md:mb-[50px] cursor-pointer">
         {returnLink() !== "" && ( 
        <div className="w-[20px] h-[20px] flex justify-between items-center"> 
            <Link href={returnLink()}>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Link>
        </div>
       )}
        <div className="w-[20px] h-[20px] flex justify-between items-center">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </div>
        <div className="w-[20px] h-[20px] flex justify-between items-center">
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </div>
        <div onClick={returnLoadPage} className="w-[20px] h-[20px] flex justify-between items-center">
          <FontAwesomeIcon icon={faRotateLeft} size="lg" />
        </div>
        <div className="w-[20px] h-[20px] flex justify-between items-center">
          <FontAwesomeIcon icon={faFileImport} size="lg" />
        </div>
        <div className="w-[20px] h-[20px] flex justify-between items-center">
          <FontAwesomeIcon onClick={deleteIdsArray} icon={faTrash} size="lg" />
        </div>
        {/* <div className="w-[20px] h-[20px] flex justify-between items-center">
            <FontAwesomeIcon icon={faFileArrowDown}  size="lg"   />
            </div> */}
      </div>
      <div>
        <ChangeLimit />
      </div>
    </div>
  )
}

export default ActionTable