import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Breadcrumb, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { products } from 'data/products';
import { ProductCard } from 'widgets/product-card';
import { useEffect, useState } from 'react';
import { Product } from 'types';
import { Pagination } from 'widgets/pagination';
import './style.css';

export const Catalog = () => {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 15;

  const productChunks = products.reduce((resultArray: Product[][], item, index) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as Product[][]);

  const navigateToPrevious = () => {
    if (current >= 1) {
      setCurrent((prev) => prev - 1);
    }
  };

  const navigateToNext = () => {
    if (current < productChunks.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);

  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main className='catalog-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Typography.Text>Каталог</Typography.Text> },
            ]}
          />
          <Typography.Title level={4}>Витамины</Typography.Title>
          <div className='products__wrapper'>
            {productChunks[current].map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <Flex justify='end'>
            <Pagination
              currentPage={current + 1}
              totalPages={productChunks.length}
              onPrevClick={navigateToPrevious}
              onNextClick={navigateToNext}
            />
          </Flex>
        </Container>
      </main>
      <footer className='footer'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};
