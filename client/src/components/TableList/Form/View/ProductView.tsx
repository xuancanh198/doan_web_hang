import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { getTranslations } from 'next-intl/server';
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import ConvertYYMMDD from "@/components/common/Date/ConvertYYMMDD";
import { formatNumberWithSpace } from "@/services/FunctionInWeb"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageCarousel from "@/components/common/SliderSwipper";
interface ViewProductProp {
  data: any;
}
export default async function DefaultInputs({ data }: ViewProductProp) {
  const t = await getTranslations('ManageInAdmin');
  return (
    <ComponentCard title={t('Base.ViewDetailTitle', { field: t('Page.product') })}>
      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-12 md:col-span-4">
         <div>
          <Label className="font-bold mb-4">{t('Product.coverPhoto')} : </Label>
            <Image
              src={data?.coverPhoto}
              alt={data?.coverPhoto}
              width={400}
              height={300}
              className="w-full"
            />
         </div>
          <div className="col-span-12 md:col-span-6 mt-[30px] ">
          <Label className="font-bold mb-0">{t('Product.images')} : </Label>
             <ImageCarousel images={data?.images} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.code')} : </Label>
            <p> {data?.code} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.name')}</Label>
            <p> {data?.name} </p>
          </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.status')}</Label>
            <p> <Badge
              size="sm"
              color={
                data?.status === 1 ? "success" : "error"
              }
            >
              {data?.status === 1 ? t('Product.statusValue.active') : t('Product.statusValue.hideTemporarily')}
            </Badge> </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.add_card_view')} : </Label>
            <p> {data?.add_card_view && formatNumberWithSpace(data?.add_card_view)} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.view_count')} : </Label>
            <p> {data?.view_count && formatNumberWithSpace(data?.view_count)} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.quantity')} : </Label>
            <p> {data?.quantity && formatNumberWithSpace(data?.quantity)} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.pages')} : </Label>
            <p> {data?.pages && formatNumberWithSpace(data?.pages)} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.price')} : </Label>
            <p> {data?.price && formatNumberWithSpace(data?.price) + " VNĐ"} </p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.lang')}</Label>
            <p> {data?.lang} </p>
        </div>
        <div className="col-span-12 md:col-span-6 mb-[30px]">
          <Label className="font-bold mb-1">{t('Product.tags')} :</Label>
          <div className="flex flex-wrap gap-x-[5px] text-sm">
            {data?.tags?.map((item: string, index: number) => (
              <span key={index}>
                {item}{index < data.tags.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.started_ad')} : </Label>
            <p> <ConvertYYMMDD date={data?.created_at} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.ended_ad')} : </Label>
            <p> <ConvertYYMMDD date={data?.ended_ad} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.published_ad')} : </Label>
            <p> <ConvertYYMMDD date={data?.published_ad} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.created_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.created_at} /></p>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
            <Label className="font-bold mb-0">{t('Product.updated_at')} : </Label>
            <p> <ConvertYYMMDD date={data?.updated_at} /></p>
          </div>
          {
            data?.figures && (
              <div className="col-span-12 grid gap-[30px] mb-[30px] ">
                <Label className="font-bold">{t('Product.attribute.text')} : </Label>
                {data.figures.map((item: any, index: number) => (
                  <Accordion key={index} className="w-full">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header" className="w-full"
                    >
                      <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                        <Label className="font-bold mb-0">{t('Product.attribute.name')} : </Label>
                        <p> {item?.name}</p>
                      </div></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="col-span-12 md:col-span-6 mb-[30px]">
                        <Label className="font-bold mb-0">{t('Product.attribute.value')} : </Label>
                        <p> {item?.value}</p>
                      </div>

                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )
          }
          <div className="col-span-12 md:col-span-6 mb-[30px]">
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header" className="w-full"
              >
                <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Author.name')} : </Label>
                  <p> {data?.author?.name}</p>
                </div></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Author.code')}  : </Label>
                  <p> {data?.author?.code}</p>
                </div>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Author.name')}  : </Label>
                  <p> {data?.author?.name}</p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px]">
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header" className="w-full"
              >
                <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Category.name')} : </Label>
                  <p> {data?.category?.name}</p>
                </div></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Category.code')}  : </Label>
                  <p> {data?.category?.code}</p>
                </div>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Category.name')}  : </Label>
                  <p> {data?.category?.name}</p>
                </div>
              </AccordionDetails>
            </Accordion>

          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px]">
            <Accordion className="w-full">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header" className="w-full"
              >
                <Typography className="w-full" component="span"> <div className="flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Publisher.name')} : </Label>
                  <p> {data?.publisher?.name}</p>
                </div></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Publisher.code')}  : </Label>
                  <p> {data?.publisher?.code}</p>
                </div>
                <div className="col-span-12 md:col-span-6 mb-[30px] flex justify-start gap-[10px] items-center">
                  <Label className="font-bold mb-0">{t('Publisher.name')}  : </Label>
                  <p> {data?.publisher?.name}</p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="col-span-12 md:col-span-6 mb-[30px]">
            <Label className="font-bold mb-0">{t('Product.description')} : </Label>
            <div>
              <p> {data?.description} </p>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
