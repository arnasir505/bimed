import { Carousel, Flex, Typography } from 'antd';
import { promotions } from 'data/promotions';
import { Link } from 'react-router-dom';
import './style.css';

export const PromotionsCarousel = () => {
  const windowInnerWidth = window.innerWidth;
  return (
    <Carousel
      arrows
      autoplay
      slidesToShow={windowInnerWidth > 1350 ? 3 : 3}
      className={`promotions__carousel ${windowInnerWidth > 1350 ? 'arrows-outside' : ''}`}
    >
      {promotions.map((item) => (
        <Link to={'/'} key={item.id}>
          <div className='promotions-carousel__wrap'>
            <Flex align='center' className={`promotions-carousel__item item-${item.id}`}>
              <img src={item.img} alt='' className='promotions-carousel__img' />
              <Typography.Title className='promotions-carousel__title'>
                <span>до</span>
                {item.discountPercentage}%
              </Typography.Title>
            </Flex>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};
