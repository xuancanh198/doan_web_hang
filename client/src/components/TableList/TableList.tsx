import React from 'react'
import FilterTime from "@/components/TableList/FilterTime";
import FilterQueryTable from "@/components/TableList/FilterQueryTable";
import ActionTable from "@/components/TableList/ActionTable";
import ComponentCard from "@/components/common/ComponentCard";
import SearchForm from "@/components/TableList/Search";
import TableListComponent from "@/components/TableList/TableListComponent";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getTranslations } from 'next-intl/server';
import { getNamePageManageByQueryInAdmin } from "@/services/FunctionInWeb";

// Định nghĩa kiểu props
interface TableListProps {
  query: string;
  page: number;
  total: number;
  data: any[];
}

async function TableList({ query, page, total, data }: TableListProps) {
  const t = await getTranslations('ManageInAdmin');

  return (
    <>
      <PageBreadcrumb
        pageTitle={t('ManageTitleText') + " " + t("Page." + getNamePageManageByQueryInAdmin(query))}
      />
      <ComponentCard
        title={t('ListTitleText') + " " + t("Page." + getNamePageManageByQueryInAdmin(query))}
      >
        <ActionTable query={query} />
        <div>
          <SearchForm />
          <FilterTime />
          <FilterQueryTable query={query} />
        </div>
        <TableListComponent
          totalServer={total}
          pageServer={page}
          dataServer={data}
          query={query}
        />
      </ComponentCard>
    </>
  );
}

export default TableList;
