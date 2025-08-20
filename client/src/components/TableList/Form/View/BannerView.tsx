import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
interface ViewBannerProp {
  data: any;
}
export default async function DefaultInputs({ data }: ViewBannerProp) {
   const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.banner') })}>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-12 md:col-span-4">
          <Image
            src={data?.image}
            alt={data?.name}
            width={400}
            height={300}
            className="w-full"
          />
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.title')} : </Label>
            <p> {data?.title} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.link')}</Label>
            <p> {data?.link} </p>
          </div>
             <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.position')} : </Label>
            <p> {data?.position} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.order')}</Label>
            <p> {data?.order} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status && Number(data?.status) === 1 ? "success" : "error"
              }
            >
              { data?.status && Number(data?.status) === 1? t('Banner.statusValue.active') : t('Banner.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>

        <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.start_time')} : </Label>
              <p> <ConvertYYMMDD date={data?.start_time}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.end_time')} : </Label>
            <p> <ConvertYYMMDD date={data?.end_time}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.created_at')} : </Label>
              <p> <ConvertYYMMDD date={data?.created_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Banner.description')} : </Label>
            <p> {data?.description} </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
