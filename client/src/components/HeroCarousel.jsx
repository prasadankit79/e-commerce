import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const bannerImages = [
  'https://i.imgur.com/DzmPCFi.jpg',
  'https://i.imgur.com/gkQDyVw.jpg',
];

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000 }}
      loop={true}
      pagination={{ clickable: true }}
    >
      {bannerImages.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url}
            alt={`Slide ${index}`}
            style={{
              width: '100%',
              height: '60vh',
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
