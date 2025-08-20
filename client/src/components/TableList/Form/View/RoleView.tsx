import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
import TableViewDetailPermisstion from "./TableViewDetailPermisstion";
interface ViewRoleProp {
  data: any;
}

type OptionType = { value: string | number; label: string };

export default async function DefaultInputs({ data }: ViewRoleProp) {
   const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.role') })}>
      <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.code')} : </Label>
            <p> {data?.code} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.name')}</Label>
            <p> {data?.name} </p>
          </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status === 1 ? "success" : "error"
              }
            >
              {data?.status === 1 ? t('Role.statusValue.active') : t('Role.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.created_at')} : </Label>
              <p> <ConvertYYMMDD date={data?.created_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Role.description')} : </Label>
            <p> {data?.description} </p>
          </div>
          <TableViewDetailPermisstion data={data?.permisstion_detail}/>
        </div>
    </ComponentCard>
  );
}
