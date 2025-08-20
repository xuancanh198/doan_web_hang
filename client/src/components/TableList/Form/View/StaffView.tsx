import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
import TableViewDetailPermisstion from "./TableViewDetailPermisstion";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface ViewStaffProp {
  data: any;
}

type OptionType = { value: string | number; label: string };

export default async function DefaultInputs({ data }: ViewStaffProp) {
   const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.staff') })}>
      <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.code')} : </Label>
            <p> {data?.code} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.username')}</Label>
            <p> {data?.username} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.fullname')} : </Label>
            <p> {data?.fullname} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.email')}</Label>
            <p> {data?.email} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.phone')}</Label>
            <p> {data?.phone} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status === 1 ? "success" : "error"
              }
            >
              {data?.status === 1 ? t('Staff.statusValue.active') : t('Staff.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>
          
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.created_at')} : </Label>
              <p> <ConvertYYMMDD date={data?.created_at}/></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at}/></p>
          </div>
          <div className="col-span-12  mb-[30px] flex justify-start gap-[10px] items-center">
                      <Accordion className="w-full">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2-content"
                          id="panel2-header" className="w-full"
                        >
                          <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                            <Label className="font-bold mb-0">{t('Role.name')} : </Label>
                            <p> {data?.role?.name} </p>
                          </div></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                            <Label className="font-bold mb-0">{t('Role.code')} : </Label>
                            <p> {data?.role?.code}</p>
                          </div>
                          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
          
                            <Label className="font-bold mb-0">{t('Role.name')} : </Label>
                            <p> {data?.role?.name}</p>
                          </div>
          
                        </AccordionDetails>
                      </Accordion>
                    </div>
          <div className="col-span-12  mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Staff.description')} : </Label>
            <p> {data?.description} </p>
          </div>
          <TableViewDetailPermisstion data={data?.permisstion_detail}/>
        </div>
    </ComponentCard>
  );
}
