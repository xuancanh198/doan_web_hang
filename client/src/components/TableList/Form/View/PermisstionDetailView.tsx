import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface ViewPermisstionDetailProp {
  data: any;
}
export default async function DefaultInputs({ data }: ViewPermisstionDetailProp) {
  const t = await getTranslations('ManageInAdmin');
  console.log(data)
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.permisstionDetail') })}>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-12">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.code')} : </Label>
            <p> {data?.code} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.name')}</Label>
            <p> {data?.name} </p>
          </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status === 1 ? "success" : "error"
              }
            >
              {data?.status === 1 ? t('PermisstionDetail.statusValue.active') : t('PermisstionDetail.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.created_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.created_at} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header" className="w-full"
              >
                <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Permisstion.name')} : </Label>
                  <p> {data?.permisstion?.name}</p>
                </div></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Permisstion.code')} : </Label>
                  <p>{data?.permisstion?.code}</p>
                </div>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Permisstion.name')} : </Label>
                  <p> {data?.permisstion?.name}</p>
                </div>

              </AccordionDetails>
            </Accordion>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header" className="w-full"
              >
                <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Action.name')} : </Label>
                  <p> {data?.action?.name} </p>
                </div></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Action.code')} : </Label>
                  <p> {data?.action?.code}</p>
                </div>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">

                  <Label className="font-bold mb-0">{t('Action.name')} : </Label>
                  <p> {data?.action?.name}</p>
                </div>

              </AccordionDetails>
            </Accordion>
          </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('PermisstionDetail.description')} : </Label>
            <p> {data?.description} </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
