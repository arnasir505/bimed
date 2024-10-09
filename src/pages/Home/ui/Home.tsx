import { Container, SeeAllBtn } from 'shared/ui';
import { Header } from 'widgets/header';
import { Carousel } from 'widgets/carousel';
import { Flex, Typography } from 'antd';
import { ProductCard } from 'widgets/product-card';
import { products } from 'data/products';
import './style.css';

export const Home = () => {
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main>
        <Container>
          <Carousel />
        </Container>
        <div className='bestsellers'>
          <Container>
            <Typography.Title level={3} className='bestsellers__title'>
              Хиты продаж
            </Typography.Title>
            <div className='bestsellers__wrapper'>
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
            <Flex justify='center'>
              <SeeAllBtn text='Посмотреть все' />
            </Flex>
          </Container>
        </div>
      </main>
    </>
  );
};
