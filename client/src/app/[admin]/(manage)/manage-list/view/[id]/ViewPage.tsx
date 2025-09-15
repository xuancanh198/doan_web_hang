import CategoryView from '@/components/TableList/Form/View/CategoryView';
import AuthorView from '@/components/TableList/Form/View/AuthorView';
import PublisherView from '@/components/TableList/Form/View/PublisherView';
import SeriesView from '@/components/TableList/Form/View/SeriesView';
import SettingView from '@/components/TableList/Form/View/SettingView';
import PermisstionView from '@/components/TableList/Form/View/PermisstionView';
import ActionView from '@/components/TableList/Form/View/ActionView';
import PermisstionDetailView from '@/components/TableList/Form/View/PermisstionDetailView';
import ProductView from '@/components/TableList/Form/View/ProductView';
import RoleView from '@/components/TableList/Form/View/RoleView';
import StaffView from '@/components/TableList/Form/View/StaffView';
import BannerView from '@/components/TableList/Form/View/BannerView';
import LogActiveView from '@/components/TableList/Form/View/LogActiveView';
import LogProductView from '@/components/TableList/Form/View/LogProduct';
import ImportExportProductView from '@/components/TableList/Form/View/ImportExportProduct';

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
  BANNER_MANAGE,
  ACTIVE_LOG_MANAGE,
  PRODUCT_IMPORT_EXPORT_MANAGE,
  PRODUCT_LOG_MANAGE
} from '@/constants/PageManageInAdmin';

type Props = {
  query?: string;
  data: any;
};

export default function DynamicViewForm({ query, data }: Props) {
  switch (query) {
    case CATEGORY_MANAGE:
      return <CategoryView data={data} />;
    case AUTHOR_MANAGE:
      return <AuthorView data={data} />;
    case PUBLISHER_MANAGE:
      return <PublisherView data={data} />;
    case SERIES_MANAGE:
      return <SeriesView data={data} />;
    case SETTING_MANAGE:
      return <SettingView data={data} />;
    case PERMISSTION_MANAGE:
      return <PermisstionView data={data} />;
    case ACTION_MANAGE:
      return <ActionView data={data} />;
    case PERMISSTION_DETAIL_MANAGE:
      return <PermisstionDetailView data={data} />;
    case PRODUCT_MANAGE:
      return <ProductView data={data} />;
    case ROLE_MANAGE:
      return <RoleView data={data} />;
    case STAFF_MANAGE:
      return <StaffView data={data} />;
    case BANNER_MANAGE:
      return <BannerView data={data} />;
    case ACTIVE_LOG_MANAGE:
      return <LogActiveView data={data} />;
      case PRODUCT_IMPORT_EXPORT_MANAGE:
      return <ImportExportProductView data={data} />;
    case PRODUCT_LOG_MANAGE:
      return <LogProductView data={data} />;
    default:
      return <div className="text-gray-500">Không tìm thấy form phù hợp</div>;
  }
}
