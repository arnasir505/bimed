import { Container, Layout } from 'shared/ui';
import './style.css';
import { Breadcrumb, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { promotions } from 'data/promotions';

export const Promotions = () => {
  return (
    <Layout>
      <main>
        <Container>
          <Breadcrumb
            className='promotions__breadcrumb'
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/promotions'>Акции</Link> },
            ]}
          />
          <Typography.Title level={4} className='promotions__title'>
            Акции
          </Typography.Title>
          <div className='promotions__wrapper'>
            {promotions.map((item) => (
              <Link to={'/'} key={item.id} className='promotions__item-link'>
                <div className='promotions-carousel__wrap'>
                  <Flex align='center' className={`promotions-carousel__item item-${item.id}`}>
                    <img src={item.img} alt='' className='promotions-carousel__img' />
                    <Typography.Title className='promotions-carousel__title'>
                      <span>до</span>
                      {item.discountPercentage}%
                    </Typography.Title>
                  </Flex>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
    </Layout>
  );
};
