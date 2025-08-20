import { CATEGORY_MANAGE, AUTHOR_MANAGE, PUBLISHER_MANAGE, SERIES_MANAGE, SETTING_MANAGE, PERMISSTION_MANAGE, ACTION_MANAGE, PERMISSTION_DETAIL_MANAGE, PRODUCT_MANAGE, ROLE_MANAGE, STAFF_MANAGE,PRODUCT_IMPORT_EXPORT_MANAGE ,BANNER_MANAGE, ACTIVE_LOG_MANAGE} from "@/constants/PageManageInAdmin"
export const getNamePageManageByQueryInAdmin = (query: string | null) => {
    switch (query) {
        case CATEGORY_MANAGE:
            return CATEGORY_MANAGE
        case AUTHOR_MANAGE:
            return AUTHOR_MANAGE
        case PUBLISHER_MANAGE:
            return PUBLISHER_MANAGE
        case SERIES_MANAGE:
            return SERIES_MANAGE
        case SETTING_MANAGE:
            return SETTING_MANAGE
        case PERMISSTION_MANAGE:
            return PERMISSTION_MANAGE
        case ACTION_MANAGE:
            return ACTION_MANAGE
        case PERMISSTION_DETAIL_MANAGE:
            return "permisstionDetail"
        case PRODUCT_MANAGE:
            return PRODUCT_MANAGE
        case ROLE_MANAGE:
            return ROLE_MANAGE
        case STAFF_MANAGE:
            return STAFF_MANAGE
        case PRODUCT_IMPORT_EXPORT_MANAGE:
            return 'productImportExport'
         case BANNER_MANAGE:
            return BANNER_MANAGE
         case ACTIVE_LOG_MANAGE:
            return 'logActive';
    }

}
export function formatNumberWithSpace(number: number | string): string {
    return Number(number).toLocaleString('fr-FR');
}
