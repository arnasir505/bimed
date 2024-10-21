import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Breadcrumb, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { products } from 'data/products';
import { ProductCard } from 'widgets/product-card';
import { useEffect, useReducer, useState } from 'react';
import { Product } from 'types';
import { Pagination } from 'widgets/pagination';
import './style.css';

export const Catalog = () => {
  const [current, setCurrent] = useState(0);
  const [productsCopy, setProductsCopy] = useState([...products]);
  const [sortByPriceOrder, setSortByPriceOrder] = useState<'default' | 'asc' | 'desc'>('asc');
  const [sortByNameOrder, setSortByNameOrder] = useState<'default' | 'asc' | 'desc'>('desc');
  const [sortByDateOrder, setSortByDateOrder] = useState<'default' | 'asc' | 'desc'>('desc');
  const forceUpdate = useReducer((x) => x + 1, 0)[1];
  const itemsPerPage = 15;

  const productChunks = productsCopy.reduce((resultArray: Product[][], item, index) => {
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

  const sortByPrice = (order: 'default' | 'asc' | 'desc') => {
    switch (order) {
      case 'default':
        setSortByPriceOrder('asc');
        setProductsCopy([...products]);
        forceUpdate();
        break;
      case 'asc':
        setSortByPriceOrder('desc');
        setProductsCopy((prev) =>
          prev.sort((a, b) => (a.newPrice || a.oldPrice) - (b.newPrice || b.oldPrice)),
        );
        forceUpdate();
        break;
      case 'desc':
        setSortByPriceOrder('default');
        setProductsCopy((prev) =>
          prev.sort((a, b) => (b.newPrice || b.oldPrice) - (a.newPrice || a.oldPrice)),
        );
        forceUpdate();
        break;
    }
  };

  const sortByName = (order: 'default' | 'asc' | 'desc') => {
    switch (order) {
      case 'default':
        setSortByNameOrder('desc');
        setProductsCopy([...products]);
        forceUpdate();
        break;
      case 'asc':
        setSortByNameOrder('default');
        setProductsCopy((prev) => prev.sort((a, b) => b.name.localeCompare(a.name)));
        forceUpdate();
        break;
      case 'desc':
        setSortByNameOrder('asc');
        setProductsCopy((prev) => prev.sort((a, b) => a.name.localeCompare(b.name)));
        forceUpdate();
        break;
    }
  };

  const sortByDate = (order: 'default' | 'asc' | 'desc') => {
    switch (order) {
      case 'default':
        setSortByDateOrder('desc');
        setProductsCopy([...products]);
        forceUpdate();
        break;
      case 'asc':
        setSortByDateOrder('default');
        setProductsCopy((prev) =>
          prev.sort((a, b) => a.datePublished.localeCompare(b.datePublished)),
        );
        forceUpdate();
        break;
      case 'desc':
        setSortByDateOrder('asc');
        setProductsCopy((prev) =>
          prev.sort((a, b) => -a.datePublished.localeCompare(b.datePublished)),
        );
        forceUpdate();
        break;
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
          <Flex justify='space-between'>
            <Flex className='sort-options' gap='12px'>
              <Typography.Text className='sort-options__title'>Сортировка:</Typography.Text>
              <Typography.Text
                className='sort-options__option'
                onClick={() => sortByName(sortByNameOrder)}
              >
                По алфавиту
              </Typography.Text>
              <Typography.Text
                className='sort-options__option'
                onClick={() => sortByPrice(sortByPriceOrder)}
              >
                По цене
              </Typography.Text>
              <Typography.Text
                className='sort-options__option'
                onClick={() => sortByDate(sortByDateOrder)}
              >
                Новинки
              </Typography.Text>
            </Flex>
            <Flex className='catalog-view-options' gap='10px'>
              <Typography.Text>Вид</Typography.Text>
              <Typography.Text>1</Typography.Text>
              <Typography.Text>2</Typography.Text>
            </Flex>
          </Flex>
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
