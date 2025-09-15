"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { useTranslations } from "next-intl";
import Badge from "../../../ui/badge/Badge";
import { AuthorListTable } from "@/constants/Interface";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteAuthor } from "@/lib/callAPI/admin/ServiceReduxCallAPI";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { RootState } from "@/lib/redux/store";
import { addDeleteId, removeDeleteId, setDeleteIds } from "@/lib/redux/Features/Crud";
import ClickComponent from "@/components/TableList/ui/TdInTable"
import { LuArrowUp ,LuArrowDown } from "react-icons/lu";
interface PropAuthorTable {
  data?: AuthorListTable | any[];
}

export default function AuthorTableFrom({ data = [] }: PropAuthorTable) {
  const t = useTranslations("ManageInAdmin");
  const dispatch = useDispatch<AppDispatch>();
  const deleteIds = useSelector((state: RootState) => state.crud.deleteIds);
  const [checkAll, setCheckAll] = useState(false);

  const deleteAction = async (id: number) => {
    const result = await Swal.fire({
      title: t("Base.Delete") + " " + t("Page.author"),
      text: t("Base.TitleDeleteModal",{field : t('Page.author')}),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: t("Base.Confirm"),
      cancelButtonText: t("Base.Cancel"),
    });

    if (result.isConfirmed) {
      await dispatch(deleteAuthor(id));
    }
  };

  const handleCheckAll = (checked: boolean) => {
    setCheckAll(checked);
    const allIds = checked ? data.map((item) => item.id) : [];
    dispatch(setDeleteIds(allIds));
  };

  const handleCheckItem = (checked: boolean, id: number) => {
    if (checked) {
      dispatch(addDeleteId(id));
    } else {
      dispatch(removeDeleteId(id));
      setCheckAll(false); 
    }
  };

  useEffect(() => {
    if (deleteIds.length === data.length && data.length > 0) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [deleteIds, data]);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start">
                    <input
                      type="checkbox"
                      checked={checkAll}
                      onChange={(e) => handleCheckAll(e.target.checked)}
                    />
                  </TableCell>
       <TableCell isHeader className="px-5 py-3 text-start">
                  <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center">
                    <ClickComponent  
                      column= "name"
                        className="cursor-pointer"
                        value ="asc" >
                      <LuArrowUp />
                      </ClickComponent>
                      <ClickComponent  
                      column= "name"
                        className="cursor-pointer"
                        value ="desc" >
                      <LuArrowDown/>
                      </ClickComponent>
                      </div>
                     <p> {t("Author.name")}</p>
                    </div>
                    </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">     <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center">
                      <ClickComponent  
                      column= "code"
                        className="cursor-pointer"
                        value ="asc" >
                      <LuArrowUp />
                      </ClickComponent>
                      <ClickComponent  
                      column= "code"
                        className="cursor-pointer"
                        value ="desc" >
                      <LuArrowDown/>
                      </ClickComponent>
                      </div>
                     <p> {t("Author.code")}</p>
                    </div>
                    </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start">{t("Author.status")}</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-center">{t("Base.Action")}</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <input
                        type="checkbox"
                        checked={deleteIds.includes(item.id)}
                        onChange={(e) =>
                          handleCheckItem(e.target.checked, item.id)
                        }
                      />
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {item.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-gray-500 dark:text-gray-400">
                      {item.code}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge
                        size="sm"
                        color={item.status === 1 ? "success" : "error"}
                      >
                        {item.status === 1
                          ? t("Author.statusValue.active")
                          : t("Author.statusValue.hideTemporarily")}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 flex gap-2 justify-center">
                      <Link
                        href={`/admin/manage-list/edit/${item.id}?query=author`}
                        className="bg-orange-500 hover:bg-orange-800 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        {t("Base.Update")}
                      </Link>
                      <Link
                        href={`/admin/manage-list/view/${item.id}?query=author`}
                        className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        {t("Base.View")}
                      </Link>
                      <div
                        onClick={() => deleteAction(item.id)}
                        className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                      >
                        {t("Base.Delete")}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
