import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import ActionTable from "@/components/TableList/ActionTable";
import ComponentCard from "@/components/common/ComponentCard";
import SearchForm from "@/components/TableList/Search";
import TableListComponent from "@/components/TableList/TableListComponent";
import { getTranslations } from 'next-intl/server';
import { getNamePageManageByQueryInAdmin } from "@/services/FunctionInWeb";
import { getDataCategoryServer, getDataAuthorServer, getDataPublisherServer, getDataSeriesServer, getDataSettingServer, getDataPermisstionServer, getDataActionServer, getDataPermisstionDetailServer, getDataProductServer, getDataRoleServer, getDataStaffServer, getDataProductImportExportServer, getDataBannerServer, getDataLogActiveServer } from "@/lib/callAPI/ServiceReduxCallAPI";
import FilterTime from "@/components/TableList/FilterTime";
import FilterQueryTable from "@/components/TableList/FilterQueryTable";
import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE, PRODUCT_IMPORT_EXPORT_MANAGE, BANNER_MANAGE, ACTIVE_LOG_MANAGE } from "@/constants/PageManageInAdmin"

export const metadata: Metadata = {
  title: "",
  description:
    "Danh sacsh",
};

export default async function TableListPage({ searchParams }: { searchParams: { [key: string]: string } }) {
  const t = await getTranslations('ManageInAdmin');
  let page = searchParams.page ? parseInt(searchParams.page) : 1;
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  const query = searchParams.query;
  let res;
  let data: any[] = [];
  let total: any = null;
  switch (query) {
    case CATEGORY_MANAGE:
      res = await getDataCategoryServer(true, page);
      break;
    case AUTHOR_MANAGE:
      res = await getDataAuthorServer(true, page);
      break;
    case PUBLISHER_MANAGE:
      res = await getDataPublisherServer(true, page);
      break;
    case SERIES_MANAGE:
      res = await getDataSeriesServer(true, page);
      break;
    case SETTING_MANAGE:
      res = await getDataSettingServer(true, page);
      break;
    case PERMISSTION_MANAGE:
      res = await getDataPermisstionServer(true, page);
      break;
    case ACTION_MANAGE:
      res = await getDataActionServer(true, page);
      break;
    case PERMISSTION_DETAIL_MANAGE:
      res = await getDataPermisstionDetailServer(true, page);
      break;
    case PRODUCT_MANAGE:
      res = await getDataProductServer(true, page);
      break;
    case ROLE_MANAGE:
      res = await getDataRoleServer(true, page);
      break;
    case STAFF_MANAGE:
      res = await getDataStaffServer(true, page);
      break;
    case PRODUCT_IMPORT_EXPORT_MANAGE:
      res = await getDataProductImportExportServer(true, page);
      break;
      case BANNER_MANAGE:
      res = await getDataBannerServer(true, page);
      break;
          case ACTIVE_LOG_MANAGE:
      res = await getDataLogActiveServer  (true, page);
      break;
      
    default:
      console.log("No matching query");
  }
  data = res?.result?.data;
  total = res?.result?.total;

  return (
    <div>
      <PageBreadcrumb pageTitle={t('ManageTitleText') + " " + t("Page." + getNamePageManageByQueryInAdmin(query))} />
      <ComponentCard title={t('ListTitleText') + " " + t("Page." + getNamePageManageByQueryInAdmin(query))}>
        <ActionTable query={query} />
        <div>
          <SearchForm />
          <FilterTime />
          <FilterQueryTable query={query} />
        </div>
        <TableListComponent totalServer={total} pageServer={page} dataServer={data} query={query} />
      </ComponentCard>
    </div>
  );
}
