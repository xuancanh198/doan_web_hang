'use client'
import React, {useState, useEffect} from 'react'
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/lib/redux/store";
import { AppDispatch } from '@/lib/redux/store';
import { useTranslations } from "next-intl";
import { setIsServerSide, setPage, setSearch } from '@/lib/redux/Features/Crud';
function Search() {
    const t = useTranslations("ManageInAdmin");
    const [searchData , setSearchData] = useState<string>("");
   const dispatch = useDispatch<AppDispatch>();
     const isServerSide = useSelector((state: RootState) => state.crud.isServerSide);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchData?.length > 0) {
        dispatch(setSearch({
          value : searchData,
          status : true
        }));
        dispatch(setPage(1)); 
        if(isServerSide !== true){
          dispatch(setIsServerSide(true))
        }
      }
    }, 500);

    return () => clearTimeout(timer); 
  }, [searchData]);
     return (
        <div className='w-full mb-[30px]'>
          <div className="relative w-full">
            <Input
              placeholder={t('Base.DataSearchText')}
              type="text"
              className="pl-[62px]"
              onChange={(e)=> setSearchData(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                 <FontAwesomeIcon icon={faMagnifyingGlass} size="xs" />
            </span>
          </div>
        </div>
  )
}

export default Search