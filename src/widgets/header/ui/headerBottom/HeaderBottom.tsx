import { Button, Flex, Image, Input } from 'antd';
import { MenuBtn } from 'shared/ui';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import './style.css';

const HeaderBottom = () => {
  return (
    <Flex align='center' className='header_bottom' wrap>
      <MenuBtn />
      <div className='logo-wrap'>
        <Link to={'/'}>
          <Image
            src='src\assets\images\logo-expanded.jpg'
            preview={false}
            className='header__logo'
          />
        </Link>
      </div>
      <Input.Search
        className='header__search'
        placeholder='Поиск'
        suffix={<SearchOutlined />}
        size='large'
      />
      <>
        <Button
          className='header__button'
          icon={<HeartOutlined style={{ color: '#8B96B1', fontSize: '20px' }} />}
          type='text'
        >
          Избранное
        </Button>
        <Button
          className='header__button header__button_login'
          icon={<LoginOutlined style={{ color: '#8B96B1', fontSize: '20px' }} />}
          type='text'
        >
          Войти
        </Button>
        <Button
          className='header__button header__button_cart'
          icon={<ShoppingCartOutlined style={{ color: '#8B96B1', fontSize: '20px' }} />}
          type='text'
        >
          Корзина
        </Button>
      </>
    </Flex>
  );
};

export default HeaderBottom;
