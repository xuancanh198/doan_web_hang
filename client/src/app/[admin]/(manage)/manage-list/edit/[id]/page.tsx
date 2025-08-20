// app/admin/update/[id]/page.tsx (ví dụ)
import { Metadata } from 'next';
import DynamicEditForm from '@/app/[admin]/(manage)/manage-list/edit/[id]/EditPage';
import {
  findIdCategory,
  findIdAuthor,
  findIdPublisher,
  findIdSeries,
  findIdSetting,
  findIdPermisstion,
  findIdAction,
  findIdPermisstionDetail,
  findIdProduct,
  findIdRole,
  findIdStaff,
  findIdBanner
} from '@/lib/callAPI/ServiceReduxCallAPI';

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
  BANNER_MANAGE
} from '@/constants/PageManageInAdmin';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next.js Form Update',
    description: 'Trang chỉnh sửa nội dung',
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) {
  const id = params.id;
  const query = searchParams.query?.toLowerCase();

  let data: any = [];
  let res;

  switch (query) {
    case CATEGORY_MANAGE:
      res = await findIdCategory(+id, true);
      break;
    case AUTHOR_MANAGE:
      res = await findIdAuthor(+id, true);
      break;
    case PUBLISHER_MANAGE:
      res = await findIdPublisher(+id, true);
      break;
    case SERIES_MANAGE:
      res = await findIdSeries(+id, true);
      break;
    case SETTING_MANAGE:
      res = await findIdSetting(+id, true);
      break;
    case PERMISSTION_MANAGE:
      res = await findIdPermisstion(+id, true);
      break;
    case ACTION_MANAGE:
      res = await findIdAction(+id, true);
      break;
    case PERMISSTION_DETAIL_MANAGE:
      res = await findIdPermisstionDetail(+id, true);
      break;
    case PRODUCT_MANAGE:
      res = await findIdProduct(+id, true);
      break;
    case ROLE_MANAGE:
      res = await findIdRole(+id, true);
      break;
    case STAFF_MANAGE:
      res = await findIdStaff(+id, true);
      break;
       case BANNER_MANAGE:
      res = await findIdBanner(+id, true);
      break;
    default:
      return <p className="text-red-500">Không tìm thấy dữ liệu</p>;
  }

  data = res?.result ?? [];

  return (
    <div>
      <DynamicEditForm query={query!} dataDetail={data} />
    </div>
  );
}
