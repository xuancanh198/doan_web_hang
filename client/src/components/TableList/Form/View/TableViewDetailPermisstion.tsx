'use client';

import React, { useEffect, useState } from 'react';
import {
  getDataPermisstionServer,
  getDataActionServer,
  getDataPermisstionDetailServer
} from '@/lib/callAPI/admin/ServiceReduxCallAPI';
import {
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
  NULL_VALUE_DEFAULT
} from '@/constants/DataDefault';
import { useTranslations } from 'next-intl';
interface OptionType {
  id: number;
  name: string;
  code: string;
}

interface PermisstionDetailType {
  id: number;
  name: string;
  code: string;
  action_id: number;
  permisstion_id: number;
}

function TableViewDetailPermisstion({ data }: { data: any }) {
  const t = useTranslations('ManageInAdmin');
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<OptionType[]>([]);
  const [actions, setActions] = useState<OptionType[]>([]);
  const [permissionDetails, setPermissionDetails] = useState<PermisstionDetailType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resAction, resPermission, resPermissionDetail] = await Promise.all([
          getDataActionServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
          getDataPermisstionServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true),
          getDataPermisstionDetailServer(false, PAGE_DEFAULT, LIMIT_DEFAULT, NULL_VALUE_DEFAULT, NULL_VALUE_DEFAULT, true)
        ]);

        setActions(resAction?.result || []);
        setPermissions(resPermission?.result || []);
        setPermissionDetails(resPermissionDetail?.result || []);
        setLoading(true)
      } catch (err) {
        console.error('Error fetching data:', err);
      }finally {
        setLoading(false); // Tắt loading dù thành công hay lỗi
      }
    };

    fetchData();
  }, []);
  function hasPermission(code: string): boolean {
    return data?.[code] === true;
  }
  

  return (
    <div className="col-span-12">
      <div className="overflow-auto border rounded mt-6">
        <table className="min-w-full border-collapse">
          {loading === true ? "loading" : (
            <>
              <thead>
                <tr className="bg-gray-100 dark:bg-dark-800 text-left">
                  <th className="p-3 border-b text-center">
                    <div className="flex justify-center">
                      <span className="text-sm">{t('Page.permisstion')} \ {t('Page.action')}</span>
                    </div>
                  </th>
                  {actions && actions?.length > 0 && actions?.map((action) => (
                    <th key={action.id} className="p-3 border-b text-center">
                      <span>{action.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions && permissions?.length > 0 && permissions?.map((perm) => (
                  <tr key={perm?.id} className="even:bg-gray-50 dark:even:bg-dark-900">
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <span>{perm?.name}</span>
                      </div>
                    </td>
                    {actions?.length > 0 && permissionDetails?.length > 0 ? (
                      actions.map((action) => {
                        const detail = permissionDetails?.find(
                          (pd) => pd?.permisstion_id === perm?.id && pd?.action_id === action?.id
                        );
                        if (!detail) {
                          return <td key={action?.id} className="p-3 border-b text-center">—</td>;
                        }
                        console.log(hasPermission(detail.code))
                        return (
                          <td key={action.id} className="p-3 border-b text-center">
                            <input
                              type="checkbox"
                               checked={hasPermission(detail.code)}
                              readOnly
                              disabled 
                            />
                          </td>
                        );
                      })
                    ) : (
                      <td className="p-3 border-b text-center" colSpan={actions.length || 1}>No actions</td>
                    )}

                  </tr>
                ))}
              </tbody>
            </>
          )}

        </table>
      </div>
    </div>
  );
}

export default TableViewDetailPermisstion;
