import { Flex, Typography } from 'antd';
import './style.css';

export const NavHelp = () => {
  return (
    <Flex gap='14px'>
      <div className='nav-help pharmacy-map'>
        <Typography.Text className='nav-help__text nav-help__text_green'>
          Карта аптек
        </Typography.Text>
      </div>
      <div className='nav-help how-to-order'>
        <Typography.Text className='nav-help__text nav-help__text_blue'>
          Как оформить заказ
        </Typography.Text>
      </div>
      <div className='nav-help free-delivery'>
        <Typography.Text className='nav-help__text nav-help__text_orange'>
          Бесплатная доставка
        </Typography.Text>
      </div>
    </Flex>
  );
};
