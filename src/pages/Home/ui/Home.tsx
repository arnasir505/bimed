import { Container, SeeAllBtn } from 'shared/ui';
import { Header } from 'widgets/header';
import { Carousel } from 'widgets/carousel';
import { Flex, Typography } from 'antd';
import { ProductCard } from 'widgets/product-card';
import { products } from 'data/products';
import './style.css';
import { PromotionsCarousel } from 'widgets/promotions-carousel';
import { NavHelp } from 'widgets/nav-help';

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
        <section className='bestsellers'>
          <Container>
            <Typography.Title level={3}>Хиты продаж</Typography.Title>
            <div className='bestsellers__wrapper'>
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
            <Flex justify='center'>
              <SeeAllBtn text='Посмотреть все' />
            </Flex>
          </Container>
        </section>
        <section className='promotions'>
          <Container>
            <Typography.Title level={3}>Акции</Typography.Title>
            <PromotionsCarousel />
            <Flex justify='center'>
              <SeeAllBtn text='Посмотреть все' />
            </Flex>
            <NavHelp />
          </Container>
        </section>
      </main>
    </>
  );
};
