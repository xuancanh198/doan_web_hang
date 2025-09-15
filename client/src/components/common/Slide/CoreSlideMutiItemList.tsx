'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Link from 'next/link';
import { FreeMode, Pagination } from 'swiper/modules';
import AppImage from "@/components/core/ImageCore"
export default function ProductSlider({
  data,
  link,
  isUseImage
}: {
  data: any[];
  link?: string | null;
  isUseImage? : boolean
}) {    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
        >
            {data.map((item:any , index:number) => (
                <SwiperSlide key={index}>

                    <div className="relative group">
                        {
                            item?.image && isUseImage === true
                            &&
                            (
                                 <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                    <AppImage className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src={item?.image} alt={item?.name} />
                                </div>
                            )
                        }
                       
                        <div className="flex items-start justify-between mt-4 space-x-4">
                            <div>
                             {
                                link && link !== null && link !== ""  && item?.slug !== null && item?.slug !== ""
                                ?
                                (
                                       <Link href={`/${link + "/" + item?.slug}`} className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                            {item?.name}
                                        </Link>
                                ) : (
                                     <span className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                            {item?.name}
                                        </span>
                                )
                             }
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
