import { Container, Layout } from 'shared/ui';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

export const Cart = () => {
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
          <div className='cart'>
            <div className='cart-items'>
              <Typography.Title level={4}>Корзина </Typography.Title>
            </div>
            <div className='cart-total'></div>
          </div>
        </Container>
      </main>
    </Layout>
  );
};
