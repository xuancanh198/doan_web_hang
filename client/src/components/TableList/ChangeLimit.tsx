"use client";
import React from "react";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { setLimit, setIsServerSide } from "@/lib/redux/Features/Crud";
import { useTranslations } from "next-intl";

function ChangeLimit() {
  const dispatch = useDispatch<AppDispatch>();
  const limit = useSelector((state: RootState) => state.crud.limit);
 const t = useTranslations("ManageInAdmin");
   const isServerSide = useSelector((state: RootState) => state.crud.isServerSide);
 
  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
     { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const handleSelectChange = (value: string | number) => {
    dispatch(setLimit(Number(value)));
    if(isServerSide !== true) {
    dispatch(setIsServerSide(true));
    }
  };

  return (
    <div className="relative">
      <Select
        options={options}
        onChange={handleSelectChange}
        value={limit}
        className="dark:bg-dark-900"
        placeholder={t('Base.ChangeLimit')}
      />
      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <ChevronDownIcon />
      </span>
    </div>
  );
}

export default ChangeLimit;
