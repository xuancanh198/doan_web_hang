'use client';

import dynamic from 'next/dynamic';
import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE, PRODUCT_IMPORT_EXPORT_MANAGE, BANNER_MANAGE } from "@/constants/PageManageInAdmin";
import { Suspense } from 'react';
import LoadingSpinner from '@/components/core/LoadingSpinner';
type Props = {
  query?: string;
};

const componentMap: Record<string, ReturnType<typeof dynamic>> = {
  [CATEGORY_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/CategoryForm')),
  [AUTHOR_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/AuthorForm')),
  [PUBLISHER_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/PublisherForm')),
  [SERIES_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/SeriesForm')),
  [SETTING_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/SettingForm')),
  [PERMISSTION_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/PermisstionForm')),
  [ACTION_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/ActionForm')),
  [PERMISSTION_DETAIL_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/PermisstionDetailForm')),
  [PRODUCT_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/ProductForm')),
  [PRODUCT_IMPORT_EXPORT_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/ProductFormImportExport')),
  [ROLE_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/RoleForm')),
  [STAFF_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/StaffForm')),
  [BANNER_MANAGE]: dynamic(() => import('@/components/TableList/Form/Create/BannerForm')),
};

export default function DynamicCreateForm({ query }: Props) {
  const FormComponent = query ? componentMap[query] : null;

  if (!FormComponent) {
    return <div className="text-gray-500">Không tìm thấy form phù hợp</div>;
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <FormComponent />
    </Suspense>
  );
}
