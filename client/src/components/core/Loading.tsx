'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "@/lib/redux/store";

function Loading() {
  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.crud.loading);
  const toastIdRef = useRef<string | number | null>(null);
  useEffect(() => {
    if (loading) {
      if (toastIdRef.current === null) {
        toastIdRef.current = toast.info(
          <div className="flex items-center">
            <ClipLoader color="#007bff" size={24} />
            <span className="ml-2">{t('loading')}</span>
          </div>,
          {
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            toastId: 'loading-toast',
          }
        );
      }
    } else {
      if (toastIdRef.current !== null) {
        toast.dismiss('loading-toast');
        toastIdRef.current = null;
      }
    }

    return () => {
      if (toastIdRef.current !== null) {
        toast.dismiss('loading-toast');
        toastIdRef.current = null;
      }
    };
  }, [loading, t]);

  return (
    <>
     {
      loading === true 
      &&
      (
         <div className="fixed top-0 left-0 w-full h-full z-10000" />
      )
     }
    </>
  );
}

export default Loading;
