import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const HeaderTop = () => {
  return (
    <Flex justify='space-between' align='center' className='header_top' wrap>
      <Flex gap='24px' wrap>
        <Link to={'/faq'} className='header__links'>
          О нас
        </Link>
        <Link to={'/faq/help'} className='header__links'>
          Помощь
        </Link>
        <Link to={'/branches'} className='header__links'>
          Филиалы
        </Link>
        <Link to={'/faq/contacts'} className='header__links header__links_contacts'>
          Контакты
        </Link>
      </Flex>
      <Flex align='center' wrap>
        <Text className='header__phone'>
          Тел: <span className='header__phoneNumber'>+996 555 55 55 55</span>
        </Text>
        <Link to={'/'} className='header__links header__links_wholesalePrice active'>
          Оптовые цены
        </Link>
        <Link to={'/'} className='header__links header__links_retailPrice inactive'>
          Розничные цены
        </Link>
        <Button type='primary' className='header__feedback-btn'>
          Обратная связь
        </Button>
      </Flex>
    </Flex>
  );
};

const { Text } = Typography;

export default HeaderTop;
