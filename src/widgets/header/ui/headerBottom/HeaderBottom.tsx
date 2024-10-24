import { Button, Flex, Image, Select, Space } from 'antd';
import { MenuBtn } from 'shared/ui';
import { Link } from 'react-router-dom';
import {
  HeartOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { handleChange, handleSearch } from 'widgets/header/api/search';
import { products } from 'data/products';
import { useState } from 'react';
import { CartModal } from 'widgets/cart-modal';
import { MenuModal } from 'widgets/menu-modal';
import LogoExpanded from 'assets/images/logo-expanded.svg';
import { useAppSelector } from 'shared/config';
import { selectCartItems } from 'entities/cart';
import './style.css';

const HeaderBottom = () => {
  const cartItems = useAppSelector(selectCartItems);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  return (
    <>
      <MenuModal open={menuModalOpen} closeModal={() => setMenuModalOpen(false)} />
      <CartModal open={cartModalOpen} closeModal={() => setCartModalOpen(false)} />
      <Flex align='center' className='header_bottom'>
        <MenuBtn onClick={() => setMenuModalOpen(true)} />
        <div className='logo-wrap'>
          <Link to='/'>
            <Image src={LogoExpanded} preview={false} className='header__logo' />
          </Link>
        </div>
        <Select
          showSearch
          onSearch={handleSearch}
          onChange={handleChange}
          className='header__search'
          placeholder='Поиск'
          optionFilterProp='label'
          defaultActiveFirstOption={false}
          suffixIcon={<SearchOutlined />}
          size='large'
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={(products || []).map((p) => ({
            value: p.id,
            label: p.name,
          }))}
          optionRender={(option) => <Space className='search__option'>{option.label}</Space>}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Link to={'/'} className='search__link'>
                Не нашли то, что искали?
              </Link>
            </>
          )}
        />
        <Flex className='header__buttons_wrap'>
          <Button
            className='header__button'
            icon={<HeartOutlined style={{ color: '#8B96B1', fontSize: '20px' }} />}
            type='text'
          >
            Избранное
          </Button>
          <Link to='/sign-in'>
            <Button
              className='header__button header__button_login'
              icon={<LoginOutlined style={{ color: '#8B96B1', fontSize: '20px' }} />}
              type='text'
            >
              Войти
            </Button>
          </Link>
          <Button
            className='header__button header__button_cart'
            icon={
              <ShoppingCartOutlined
                className={cartItems.length > 0 ? 'cart-has-items' : ''}
                style={{ color: '#8B96B1', fontSize: '20px' }}
              />
            }
            type='text'
            onClick={() => setCartModalOpen(true)}
          >
            Корзина
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default HeaderBottom;
