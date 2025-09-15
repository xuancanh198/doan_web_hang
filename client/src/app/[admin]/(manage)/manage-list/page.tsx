import { Metadata } from "next";
import React from "react";
import TableList from "@/components/TableList/TableList";
import { getTranslations } from 'next-intl/server';
import { getDataCategoryServer, getDataAuthorServer, getDataPublisherServer, getDataSeriesServer, getDataSettingServer, getDataPermisstionServer, getDataActionServer, getDataPermisstionDetailServer, getDataProductServer, getDataRoleServer, getDataStaffServer, getDataProductImportExportServer, getDataBannerServer, getDataLogActiveServer, getDataProductLogServer } from "@/lib/callAPI/admin/ServiceServerCallAPI";
import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE, PRODUCT_IMPORT_EXPORT_MANAGE, BANNER_MANAGE, ACTIVE_LOG_MANAGE, PRODUCT_LOG_MANAGE  } from "@/constants/PageManageInAdmin"
export const metadata: Metadata = {
  title: "",
  description:
    "Danh sacsh",
};

export default async function TableListPage({ searchParams, req, res }: { 
  searchParams: { [key: string]: string }, 
  req: any, 
  res: any 
}) {
    const t = await getTranslations('ManageInAdmin');
  let page = searchParams.page ? parseInt(searchParams.page) : 1;
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  const query = searchParams.query;
  let resData;
  let data: any[] = [];
  let total: any = null;
  switch (query) {
    case CATEGORY_MANAGE:
      resData = await getDataCategoryServer(true, page);
      break;
    case AUTHOR_MANAGE:
      resData = await getDataAuthorServer( true, page);
      break;
    case PUBLISHER_MANAGE:
      resData = await getDataPublisherServer( true, page);
      break;
    case SERIES_MANAGE:
      resData = await getDataSeriesServer( true, page);
      console.log(res)
      break;
    case SETTING_MANAGE:
      resData = await getDataSettingServer( true, page);
      break;
    case PERMISSTION_MANAGE:
      resData = await getDataPermisstionServer( true, page);
      break;
    case ACTION_MANAGE:
      resData = await getDataActionServer( true, page);
      break;
    case PERMISSTION_DETAIL_MANAGE:
      resData = await getDataPermisstionDetailServer( true, page);
      break;
    case PRODUCT_MANAGE:
      resData = await getDataProductServer( true, page);
      break;
    case ROLE_MANAGE:
      resData = await getDataRoleServer( true, page);
      break;
    case STAFF_MANAGE:
      resData = await getDataStaffServer( true, page);
      break;
    case PRODUCT_IMPORT_EXPORT_MANAGE:
      resData = await getDataProductImportExportServer( true, page);
      break;
      case BANNER_MANAGE:
      resData = await getDataBannerServer(true, page);
      break;
    case ACTIVE_LOG_MANAGE:
      resData = await getDataLogActiveServer( true, page);
      break;
    case PRODUCT_LOG_MANAGE:
      resData = await getDataProductLogServer(true, page);
      break;
    default:
      console.log("No matching query");
  }
  data = resData?.result?.data;
  total = resData?.result?.total;
  console.log(data)
  return (
    <div>
     <TableList query={query} page={page} total={total} data={data} />
    </div>
  );
}
