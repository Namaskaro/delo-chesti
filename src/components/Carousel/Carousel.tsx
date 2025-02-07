import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FreeMode, Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';
import React from 'react';
import './Carousel.model.css';
import Slide from '../Slide/Slide';
type Slide = {
  name?: string;
  age?: number;
  location?: string;
  title?: string;
  imgSrc?: string;
  shortDesc?: string;
  description?: string;
  collectedSum?: number | undefined;
  needToCollect?: number;
  slug?: string;
  programm?: string | undefined;
  p1?: string | undefined;
  financialTitle?: string | undefined;
  financialp1?: string | undefined;
  financialp2?: string | undefined;
  requisites?: string[] | undefined;
  informationTitle?: string | undefined;
  informationalDescription?: string | undefined;
  note?: string | undefined;
  formType?: 'charity' | 'help';
};
type CarouselProps = {
  slides: Slide[];
  perView: {};
};

function Carousel(props: CarouselProps) {
  const { slides, perView } = props;
  const styles = {
    width: '100%',
    height: ' 100%',
    objectFit: 'cover',
  };

  return (
    <Swiper
      // effect="fade"
      className="swiper"
      loop={true}
      spaceBetween={10}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: true,
      // }}
      pagination={{
        clickable: true,
        type: 'progressbar',
      }}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      slidesPerView={1}
      breakpoints={perView}>
      {slides.map(({ ...slide }) => (
        <SwiperSlide key={slide.slug}>
          <Slide {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
