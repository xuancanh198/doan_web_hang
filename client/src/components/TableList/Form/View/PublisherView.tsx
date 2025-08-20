import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
interface ViewPublisherProp {
  data: any;
}
export default async function DefaultInputs({ data }: ViewPublisherProp) {
   const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.publisher') })}>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-12 ">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.code')} : </Label>
            <p> {data?.code} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.name')}</Label>
            <p> {data?.name} </p>
          </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status === 1 ? "success" : "error"
              }
            >
              {data?.status === 1 ? t('Publisher.statusValue.active') : t('Publisher.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.created_at')} : </Label>
              <p> <ConvertYYMMDD date={data?.created_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Publisher.description')} : </Label>
            <p> {data?.description} </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
