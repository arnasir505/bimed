import { Button, Flex, Typography } from 'antd';
import './style.css';
import { selectCartItemsTotal, selectCartItemsTotalPrice } from 'entities/cart';
import { selectUser, selectIsUserLoggedIn } from 'entities/user';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/config';

export const CartOrder = () => {
  const totalItemsInCart = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  return (
    <Flex vertical className='order-wrap'>
      <Flex vertical className='order'>
        <Typography.Title level={4} className='order__title'>
          Оформление заказа
        </Typography.Title>
      </Flex>
      <div className='cart-total'>
        <Flex vertical gap={'20px'}>
          <Typography.Title level={4} className='cart-total__title'>
            Итого
          </Typography.Title>
          <Flex vertical gap={'8px'}>
            <Flex className='cart-total__info'>
              <Typography.Text className='cart-total__info-text'>
                Товаров в корзине:
              </Typography.Text>
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
          <Typography.Text className='cart-total__delivery-terms'>
            Оплата за доставку оплачивается отдельно <br />
            <Link to={'/delivery-terms'}>Подробнее</Link>
          </Typography.Text>
          <Flex vertical gap={'8px'}>
            <Link to={'/cart/order'} style={{ width: '100%' }}>
              <Button type='primary' block size='large'>
                Заказать
              </Button>
            </Link>
            <Link to={'/cart'} style={{ width: '100%' }}>
              <Button block size='large' style={{ color: '#032D80' }}>
                Отменить оформление заказа
              </Button>
            </Link>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};
