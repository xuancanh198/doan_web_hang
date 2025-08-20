import { Metadata } from "next";
import DynamicViewForm from '@/app/[admin]/(manage)/manage-list/view/[id]/ViewPage';

import { findIdCategory, findIdAuthor, findIdPublisher, findIdSeries, findIdSetting, findIdPermisstion, findIdAction, findIdPermisstionDetail, findIdProduct, findIdRole, findIdStaff , findIdBanner, findIdLogActive} from "@/lib/callAPI/ServiceReduxCallAPI";
import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE, BANNER_MANAGE, ACTIVE_LOG_MANAGE } from "@/constants/PageManageInAdmin"
import React from "react";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
    description:
      "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
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
  const query = searchParams.query;
  if (isNaN(Number(id))) {

  }
  let data :any= null
  let res;

  switch (query) {
    case CATEGORY_MANAGE:
      res = await findIdCategory(Number(id), true);
      data = res?.result ?? null;
      break;
    case AUTHOR_MANAGE:
      res = await findIdAuthor(Number(id), true);
      data = res?.result ?? null;
   break
    case PUBLISHER_MANAGE:
      res = await findIdPublisher(Number(id), true);
      data = res?.result ?? null;
      break;
    case SERIES_MANAGE:
      res = await findIdSeries(Number(id), true);
      data = res?.result ?? null;
      break;
    case SETTING_MANAGE:
      res = await findIdSetting(Number(id), true);
      data = res?.result ?? null;
      break;
    case PERMISSTION_MANAGE:
      res = await findIdPermisstion(Number(id), true);
      data = res?.result ?? null;
      break;
    case ACTION_MANAGE:
      res = await findIdAction(Number(id), true);
      data = res?.result ?? null;
      break;
    case PERMISSTION_DETAIL_MANAGE:
      res = await findIdPermisstionDetail(Number(id), true);
      data = res?.result ?? null;
      break;
    case PRODUCT_MANAGE:
      res = await findIdProduct(Number(id), true);
      data = res?.result ?? null;
      break;
    case ROLE_MANAGE:
      res = await findIdRole(Number(id), true);
      data = res?.result ?? null;
      break;
    case STAFF_MANAGE:
      res = await findIdStaff(Number(id), true);
      data = res?.result ?? null;
      break;
    case BANNER_MANAGE:
      res = await findIdBanner(Number(id), true);
      data = res?.result ?? null;
      break;
     case ACTIVE_LOG_MANAGE:
      res = await findIdLogActive(Number(id), true);
      data = res?.result ?? null;
      break;
    default:
      console.log("No matching query");
  }
  return (
   <div>
      <DynamicViewForm query={query!} data={data} />
     </div>
  );
}
