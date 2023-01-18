import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './Slider.module.scss';
import { CarouselRef } from 'antd/es/carousel';

interface SliderProps {
  photos: string[];
}

const Slider: React.FC<SliderProps> = ({ photos }) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  return (
    <>
      <Carousel
        ref={carouselRef}
        dotPosition="bottom"
        arrows={true}
        autoplay
        swipeToSlide
        dots={{ className: styles.dotsForPhotos }}
        pauseOnHover
        pauseOnDotsHover
        className={styles.carousel}
      >
        {photos.map((photo) => {
          return (
            <div className={styles.photoContainer}>
              <img src={photo} alt="item-photo" />
            </div>
          );
        })}
      </Carousel>
      <ul className={styles.gallery}>
        {photos.map((photo, index) => {
          return (
            <li className={styles.photoInGallery} key={photo} onClick={() => carouselRef.current?.goTo(index, false)}>
              <img src={photo} alt={photo} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Slider;
