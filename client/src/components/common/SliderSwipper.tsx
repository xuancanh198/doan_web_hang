'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>Không có hình ảnh để hiển thị</p>;
  }

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper w-full h-full"
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item}
            alt={`Preview ${index}`}
            className="object-cover h-full w-full rounded-md"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
