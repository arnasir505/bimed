import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Breadcrumb, Flex, Pagination, PaginationProps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { products } from 'data/products';
import { ProductCard } from 'widgets/product-card';
import './style.css';
import { useEffect, useState } from 'react';
import { Product } from 'types';

export const Catalog = () => {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 15;
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page - 1);
  };

  const productChunks = products.reduce((resultArray: Product[][], item, index) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as Product[][]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <Flex gap={5} align='center'>
            <Typography.Text>Страница</Typography.Text>
            <Typography.Text>{current + 1}</Typography.Text>
            <Typography.Text>из</Typography.Text>
            <Pagination
              simple={{ readOnly: true }}
              current={current}
              onChange={onChange}
              total={productChunks.length}
              pageSize={1}
              showTotal={(total) => <span>{total}</span>}
            />
          </Flex>
          <div className='products__wrapper'>
            {productChunks[current].map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
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
