import { Button, Flex, Typography } from 'antd';
import { selectCartItemsTotal, selectCartItemsTotalPrice } from 'entities/cart';
import { selectUser, selectIsUserLoggedIn } from 'entities/user';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/config';
import './style.css';

export const CartTotal = () => {
  const totalItemsInCart = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  return (
    <div className='cart-total'>
      <Flex vertical gap={'20px'}>
        <Typography.Title level={4} className='cart-total__title'>
          Итого
        </Typography.Title>
        <Flex vertical gap={'8px'}>
          <Flex className='cart-total__info'>
            <Typography.Text className='cart-total__info-text'>Товаров в корзине:</Typography.Text>
            <Typography.Text>{totalItemsInCart}</Typography.Text>
          </Flex>
          {user && isLoggedIn && (
            <Flex className='cart-total__info'>
              <Typography.Text className='cart-total__info-text cart-total__info-text-orange'>
                Будет начислено баллов:
              </Typography.Text>
              <Typography.Text>{45}</Typography.Text>
            </Flex>
          )}
          <Flex className='cart-total__info'>
            <Typography.Text className='cart-total__info-text'>Ваша скидка:</Typography.Text>
            <Typography.Text>{100} c</Typography.Text>
          </Flex>
          <Flex className='cart-total__info'>
            <Typography.Text className='cart-total__info-text'>Общая сумма:</Typography.Text>
            <Typography.Text>{totalPrice} c</Typography.Text>
          </Flex>
        </Flex>
        <Link to={'/cart/order'} style={{ width: '100%' }}>
          <Button type='primary' block size='large'>
            Оформить заказ
          </Button>
        </Link>
        {!(user && isLoggedIn) && (
          <Flex vertical className='cart-total__sign-up'>
            <Typography.Text>
              Если Вы авторизуетесь, то получите <br />
              <span style={{ color: '#fd9b08' }}>50 баллов</span> при покупке
            </Typography.Text>
            <Link to={'/sign-in'} style={{ width: '100%' }}>
              <Button size='large' block className='cart-total__sign-up-link'>
                Авторизоваться
              </Button>
            </Link>
            <Link to={'/'}>
              <Typography.Text className='cart-total__bonuses-link'>
                Что такое баллы?
              </Typography.Text>
            </Link>
          </Flex>
        )}
      </Flex>
    </div>
  );
};
