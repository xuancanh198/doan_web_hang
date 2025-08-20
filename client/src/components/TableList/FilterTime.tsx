'use client';

import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '@/components/form/Select';
import { useTranslations } from 'next-intl';
import { AppDispatch } from '@/lib/redux/store';
import { setTimeRangeFilter, setIsServerSide } from '@/lib/redux/Features/Crud';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/lib/redux/store";

function FilterTime() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('ManageInAdmin');

  const options = [
    { value: 'created_at', label: t('Base.created_at') },
    { value: 'updated_at', label: t('Base.updated_at') },
  ];

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [typeTime, setTypeTime] = useState<string>(options[0].value);
  const [isUserChange, setIsUserChange] = useState<boolean>(false);

  const isServerSide = useSelector((state: RootState) => state.crud.isServerSide);

  useEffect(() => {
    if (!isUserChange) return;

    dispatch(setTimeRangeFilter({
      status: true,
      column: typeTime,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    }));

    if (!isServerSide) {
      dispatch(setIsServerSide(true));
    }

    setIsUserChange(false);
  }, [isUserChange, typeTime, startDate, endDate]);

  const handleSelectChange = (value: string | number) => {
    if (typeof value === 'string') {
      setTypeTime(value);
      setIsUserChange(true);
    }
  };

  const changeValue = (date: Date, type: boolean = false) => {
    if (type === true) {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
    setIsUserChange(true);
  };

  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3">
      <div className="w-full">
        <Select
          options={options}
          onChange={handleSelectChange}
          value={typeTime}
          className="dark:bg-dark-900"
          placeholder={t('Base.ChangeTimeType')}
        />
      </div>
      <div className="w-full">
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            if (date) changeValue(date);
          }}
          className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
        />
      </div>
      <div className="w-full">
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => {
            if (date) changeValue(date, true);
          }}
          className="w-full px-[20px] h-[44px] border outline-0 border-[#ccc] rounded-lg"
        />
      </div>
    </div>
  );
}

export default FilterTime;
