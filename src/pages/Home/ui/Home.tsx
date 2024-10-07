import { Container } from 'shared/ui';
import { Header } from 'widgets/header';
import { Carousel } from 'widgets/carousel';
import { Typography } from 'antd';
import { ProductCard } from 'widgets/product-card';
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
        <div className='bg-gray'>
          <Container>
            <Typography.Title level={3} className='bestsellers__title'>
              Хиты продаж
            </Typography.Title>
            <ProductCard />
          </Container>
        </div>
      </main>
    </>
  );
};
