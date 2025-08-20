'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/core/LoadingSpinner';

import {
  CATEGORY_MANAGE,
  AUTHOR_MANAGE,
  PUBLISHER_MANAGE,
  SERIES_MANAGE,
  SETTING_MANAGE,
  PERMISSTION_MANAGE,
  ACTION_MANAGE,
  PERMISSTION_DETAIL_MANAGE,
  PRODUCT_MANAGE,
  ROLE_MANAGE,
  STAFF_MANAGE,
  PRODUCT_IMPORT_EXPORT_MANAGE,
  BANNER_MANAGE,
} from '@/constants/PageManageInAdmin';

// ✅ Đây là type props chuẩn cho các form
type FormComponentProps = {
  dataDetail: any;
};

type Props = {
  query?: string;
  dataDetail: any;
};

// ✅ Gán đúng kiểu và dùng dynamic + loading component (optional)
const componentMap: Record<string, React.ComponentType<FormComponentProps>> = {
  [CATEGORY_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/CategoryForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [AUTHOR_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/AuthorForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [PUBLISHER_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/PublisherForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [SERIES_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/SeriesForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [SETTING_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/SettingForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [PERMISSTION_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/PermisstionForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [ACTION_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/ActionForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [PERMISSTION_DETAIL_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/PermisstionFormDetail'), {
    loading: () => <LoadingSpinner />,
  }),
  [PRODUCT_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/ProductForm'), {
    loading: () => <LoadingSpinner />,
  }),
  // ✅ Bổ sung nếu có file form này
//   [PRODUCT_IMPORT_EXPORT_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/ProductImportExportForm'), {
//     loading: () => <LoadingSpinner />,
//   }),
  [ROLE_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/RoleForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [STAFF_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/StaffForm'), {
    loading: () => <LoadingSpinner />,
  }),
  [BANNER_MANAGE]: dynamic(() => import('@/components/TableList/Form/Edit/BannerForm'), {
    loading: () => <LoadingSpinner />,
  }),
};

export default function DynamicEditForm({ query, dataDetail }: Props) {
  const FormComponent = query ? componentMap[query] : null;

  if (!FormComponent) {
    return <div className="text-gray-500">Không tìm thấy form phù hợp</div>;
  }
  return <FormComponent dataDetail={dataDetail} />;
}
