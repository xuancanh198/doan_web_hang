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
interface ViewLogActiveProp {
  data: any;
}

type OptionType = { value: string | number; label: string };

export default async function DefaultInputs({ data }: ViewLogActiveProp) {
   const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.logActive') })}>
      <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-12  mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('LogActive.log_name')} : </Label>
            <p> {data?.log_name} </p>
          </div>
          <div className="col-span-12  mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('LogActive.description')}</Label>
            <p> {data?.description} </p>
          </div>
          <div className="col-span-12  mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('LogActive.subject_type')} : </Label>
            <p> {data?.subject_type} </p>
          </div>
      
        </div>
    </ComponentCard>
  );
}
