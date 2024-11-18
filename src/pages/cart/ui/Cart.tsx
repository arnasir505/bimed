import { Container, Empty, Layout } from 'shared/ui';
import { Breadcrumb, Flex, Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import './style.css';
import { useAppSelector } from 'shared/config';
import { selectCartItems, selectCartItemsTotal } from 'entities/cart';
import { CartItem } from 'widgets/cart-item';

export const Cart = () => {
  const totalItemsInCart = useAppSelector(selectCartItemsTotal);
  const cartItems = useAppSelector(selectCartItems);

  const morph = (int: number, array: string[]) => {
    return (
      (array = array || ['товар', 'товара', 'товаров']) &&
      array[int % 100 > 4 && int % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]]
    );
  };

  return (
    <Layout>
      <main className='cart-main'>
        <Container>
          <Breadcrumb
            className='cart__breadcrumb'
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/cart'>Корзина</Link> },
            ]}
          />
          {cartItems.length > 0 ? (
            <div className='cart'>
              <div className='cart-items'>
                <Flex className='cart-items__title-wrap'>
                  <Typography.Title level={4} className='cart__title'>
                    Корзина
                    <span className='cart-items__totalCount'>
                      (
                      {totalItemsInCart +
                        ' ' +
                        morph(totalItemsInCart, ['товар', 'товара', 'товаров'])}
                      )
                    </span>
                  </Typography.Title>
                  <Link to={'/delivery-terms'} className='delivery-terms__link'>
                    <Typography.Text>Условия доставки</Typography.Text>
                  </Link>
                </Flex>
                <Flex vertical className='cart-items__wrap'>
                  {cartItems.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </Flex>
              </div>
              <Outlet />
            </div>
          ) : (
            <Empty title='Корзина' text='В корзине пока нет товаров' btnText='На главную' />
          )}
        </Container>
      </main>
    </Layout>
  );
};
