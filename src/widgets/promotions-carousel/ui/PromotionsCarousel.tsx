import { Carousel } from 'antd';
import { promotions } from 'data/promotions';
import './style.css';

export const PromotionsCarousel = () => {
  return (
    <Carousel draggable slidesToShow={3} slidesToScroll={1} className='promotions__carousel'>
      {promotions.map((item) => (
        <div key={item.id} className='promotions-carousel__item'>
          {item.discountPercentage}
        </div>
      ))}
    </Carousel>
  );
};
