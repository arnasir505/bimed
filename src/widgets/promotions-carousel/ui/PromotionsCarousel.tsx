import { Carousel, Flex, Typography } from 'antd';
import { promotions } from 'data/promotions';
import './style.css';
import { Link } from 'react-router-dom';

export const PromotionsCarousel = () => {
  return (
    <Carousel arrows autoplay slidesToShow={3} className='promotions__carousel'>
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
