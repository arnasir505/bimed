import { Carousel as AntCarousel, Flex, Image, Typography } from 'antd';
import './style.css';

export const Carousel = () => {
  return (
    <AntCarousel className='carousel' draggable autoplay>
      {[...Array(6)].map((_e, i) => (
        <div className='carousel-item' key={i}>
          <Flex vertical className='carousel-item__text' align='start' justify='space-between'>
            <Image src='static/images/logo-white.svg' preview={false} height={66} />
            <Typography.Title className='carousel-item__title'>
              Lorem ipsum dolor sit amet, consectetur
            </Typography.Title>
            <Typography.Text className='carousel-item__subtitle'>
              Lorem ipsum dolor sit amet, consectetur
            </Typography.Text>
          </Flex>
        </div>
      ))}
    </AntCarousel>
  );
};
