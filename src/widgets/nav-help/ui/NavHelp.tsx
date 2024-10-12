import { Flex, Typography } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

export const NavHelp = () => {
  return (
    <Flex gap='14px'>
      <Link to={'/'} className='nav-help pharmacy-map'>
        <Typography.Text className='nav-help__text nav-help__text_green'>
          Карта аптек
        </Typography.Text>
      </Link>
      <Link to={'/'} className='nav-help how-to-order'>
        <Typography.Text className='nav-help__text nav-help__text_blue'>
          Как оформить заказ
        </Typography.Text>
      </Link>
      <Link to={'/'} className='nav-help free-delivery'>
        <Typography.Text className='nav-help__text nav-help__text_orange'>
          Бесплатная доставка
        </Typography.Text>
      </Link>
    </Flex>
  );
};
