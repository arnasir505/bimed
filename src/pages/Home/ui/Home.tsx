import { Flex, Typography } from 'antd';
import { Container, Layout, SeeAllBtn } from 'shared/ui';
import { Carousel } from 'widgets/carousel';
import { ProductCard } from 'widgets/product-card';
import { PromotionsCarousel } from 'widgets/promotions-carousel';
import { NavHelp } from 'widgets/nav-help';
import { NewsCard } from 'widgets/news-card';
import { products } from 'data/products';
import { news } from 'data/news';
import './style.css';

export const Home = () => {
  return (
    <Layout>
      <main>
        <Container>
          <Carousel />
        </Container>
        <section className='bestsellers'>
          <Container>
            <Typography.Title level={3}>Хиты продаж</Typography.Title>
            <div className='bestsellers__wrapper'>
              {[...products]
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 10)
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
            <Flex justify='center'>
              <SeeAllBtn text='Посмотреть все' path='/catalog' />
            </Flex>
          </Container>
        </section>
        <section className='promotions'>
          <Container>
            <Typography.Title level={3}>Акции</Typography.Title>
            <PromotionsCarousel />
            <Flex justify='center'>
              <SeeAllBtn text='Посмотреть все' path='/promotions' />
            </Flex>
            <NavHelp />
          </Container>
        </section>
        <section className='news'>
          <Container>
            <Typography.Title level={3}>Новости</Typography.Title>
            <div className='news__wrapper'>
              {news.slice(0, 8).map((item) => (
                <NewsCard key={item.id} news={item} length={news.length} />
              ))}
            </div>
            <Flex justify='center'>
              <SeeAllBtn text='Все новости' path='/news' />
            </Flex>
          </Container>
        </section>
      </main>
    </Layout>
  );
};
