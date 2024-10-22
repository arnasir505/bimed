import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Breadcrumb, Button, Flex, GetProps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { products } from 'data/products';
import { ProductCard } from 'widgets/product-card';
import { useEffect, useReducer, useState } from 'react';
import { Product } from 'types';
import { Pagination } from 'widgets/pagination';
import Icon, { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './style.css';

export const Catalog = () => {
  const [current, setCurrent] = useState(0);
  const [productsCopy, setProductsCopy] = useState([...products]);
  const [sortByPriceOrder, setSortByPriceOrder] = useState<'default' | 'asc' | 'desc'>('asc');
  const [sortByNameOrder, setSortByNameOrder] = useState<'default' | 'asc' | 'desc'>('desc');
  const [sortByDateOrder, setSortByDateOrder] = useState<'default' | 'asc' | 'desc'>('desc');
  const [sortByPopularityOrder, setSortByPopularityOrder] = useState<'default' | 'asc' | 'desc'>(
    'desc',
  );
  const [blockViewEnabled, setBlockViewEnabled] = useState(false);
  const [gridViewEnabled, setGridViewEnabled] = useState(true);
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

  const sortyByPopularity = (order: 'default' | 'asc' | 'desc') => {
    switch (order) {
      case 'default':
        setSortByPopularityOrder('desc');
        setProductsCopy([...products]);
        forceUpdate();
        break;
      case 'asc':
        setSortByPopularityOrder('default');
        setProductsCopy((prev) => prev.sort((a, b) => a.popularity - b.popularity));
        forceUpdate();
        break;
      case 'desc':
        setSortByPopularityOrder('asc');
        setProductsCopy((prev) => prev.sort((a, b) => b.popularity - a.popularity));
        forceUpdate();
        break;
    }
  };

  const setBlockView = () => {
    setGridViewEnabled(false);
    setBlockViewEnabled(true);
  };

  const setGridView = () => {
    setBlockViewEnabled(false);
    setGridViewEnabled(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);

  type CustomIconComponentProps = GetProps<typeof Icon>;

  const BlockViewSvg = () => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1439_93446)'>
        <path
          d='M10.25 8.5H1C0.448 8.5 0 8.948 0 9.5V14.5C0 15.052 0.448 15.5 1 15.5H10.25C10.802 15.5 11.25 15.052 11.25 14.5V9.5C11.25 8.948 10.802 8.5 10.25 8.5Z'
          fill='currentColor'
        />
        <path
          d='M10.25 0H1C0.448 0 0 0.448 0 1V6C0 6.552 0.448 7 1 7H10.25C10.802 7 11.25 6.552 11.25 6V1C11.25 0.448 10.802 0 10.25 0Z'
          fill='currentColor'
        />
        <path
          d='M0 18V23C0 23.552 0.448 24 1 24H10.25C10.802 24 11.25 23.552 11.25 23V18C11.25 17.448 10.802 17 10.25 17H1C0.448 17 0 17.448 0 18Z'
          fill='currentColor'
        />
        <path
          d='M23 0H13.75C13.198 0 12.75 0.448 12.75 1V6C12.75 6.552 13.198 7 13.75 7H23C23.552 7 24 6.552 24 6V1C24 0.448 23.552 0 23 0Z'
          fill='currentColor'
        />
        <path
          d='M13.75 15.5H23C23.552 15.5 24 15.052 24 14.5V9.5C24 8.948 23.552 8.5 23 8.5H13.75C13.198 8.5 12.75 8.948 12.75 9.5V14.5C12.75 15.052 13.198 15.5 13.75 15.5Z'
          fill='currentColor'
        />
        <path
          d='M13.75 24H23C23.552 24 24 23.552 24 23V18C24 17.448 23.552 17 23 17H13.75C13.198 17 12.75 17.448 12.75 18V23C12.75 23.552 13.198 24 13.75 24Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_1439_93446'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );

  const GridViewSvg = () => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1439_93447)'>
        <path
          d='M0 13.75V23C0 23.552 0.448 24 1 24H6C6.552 24 7 23.552 7 23V13.75C7 13.198 6.552 12.75 6 12.75H1C0.448 12.75 0 13.198 0 13.75Z'
          fill='currentColor'
        />
        <path
          d='M6 0H1C0.448 0 0 0.448 0 1V10.25C0 10.802 0.448 11.25 1 11.25H6C6.552 11.25 7 10.802 7 10.25V1C7 0.448 6.552 0 6 0Z'
          fill='currentColor'
        />
        <path
          d='M15.5 10.25V1C15.5 0.448 15.052 0 14.5 0H9.5C8.948 0 8.5 0.448 8.5 1V10.25C8.5 10.802 8.948 11.25 9.5 11.25H14.5C15.052 11.25 15.5 10.802 15.5 10.25Z'
          fill='currentColor'
        />
        <path
          d='M18 24H23C23.552 24 24 23.552 24 23V13.75C24 13.198 23.552 12.75 23 12.75H18C17.448 12.75 17 13.198 17 13.75V23C17 23.552 17.448 24 18 24Z'
          fill='currentColor'
        />
        <path
          d='M8.5 13.75V23C8.5 23.552 8.948 24 9.5 24H14.5C15.052 24 15.5 23.552 15.5 23V13.75C15.5 13.198 15.052 12.75 14.5 12.75H9.5C8.948 12.75 8.5 13.198 8.5 13.75Z'
          fill='currentColor'
        />
        <path
          d='M23 0H18C17.448 0 17 0.448 17 1V10.25C17 10.802 17.448 11.25 18 11.25H23C23.552 11.25 24 10.802 24 10.25V1C24 0.448 23.552 0 23 0Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_1439_93447'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );

  const BlockViewIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BlockViewSvg} {...props} />
  );

  const GridViewIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={GridViewSvg} {...props} />
  );

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
            <Flex className='sort-options' gap='14px' align='center'>
              <Typography.Text className='sort-options__title'>Сортировка:</Typography.Text>
              <Button
                type='text'
                className='sort-options__option'
                icon={
                  <Flex vertical>
                    <CaretUpOutlined
                      style={{ color: sortByNameOrder === 'default' ? '#054EDB' : '#CDDAF1' }}
                    />
                    <CaretDownOutlined
                      style={{ color: sortByNameOrder === 'asc' ? '#054EDB' : '#CDDAF1' }}
                    />
                  </Flex>
                }
                onClick={() => sortByName(sortByNameOrder)}
              >
                По алфавиту
              </Button>
              <Button
                type='text'
                className='sort-options__option'
                icon={
                  <Flex vertical>
                    <CaretUpOutlined
                      style={{ color: sortByPriceOrder === 'desc' ? '#054EDB' : '#CDDAF1' }}
                    />
                    <CaretDownOutlined
                      style={{ color: sortByPriceOrder === 'default' ? '#054EDB' : '#CDDAF1' }}
                    />
                  </Flex>
                }
                onClick={() => sortByPrice(sortByPriceOrder)}
              >
                По цене
              </Button>
              <Button
                type='text'
                className='sort-options__option'
                icon={
                  <Flex vertical>
                    <CaretUpOutlined
                      style={{ color: sortByDateOrder === 'asc' ? '#054EDB' : '#CDDAF1' }}
                    />
                    <CaretDownOutlined
                      style={{ color: sortByDateOrder === 'default' ? '#054EDB' : '#CDDAF1' }}
                    />
                  </Flex>
                }
                onClick={() => sortByDate(sortByDateOrder)}
              >
                Новинки
              </Button>
              <Button
                type='text'
                className='sort-options__option'
                icon={
                  <Flex vertical>
                    <CaretUpOutlined
                      style={{ color: sortByPopularityOrder === 'default' ? '#054EDB' : '#CDDAF1' }}
                    />
                    <CaretDownOutlined
                      style={{ color: sortByPopularityOrder === 'asc' ? '#054EDB' : '#CDDAF1' }}
                    />
                  </Flex>
                }
                onClick={() => sortyByPopularity(sortByPopularityOrder)}
              >
                Хит продаж
              </Button>
            </Flex>
            <Flex className='catalog-view-options' gap='8px'>
              <Typography.Text className='catalog-view-options__title'>Вид:</Typography.Text>
              <BlockViewIcon
                style={{ color: blockViewEnabled ? '#054EDB' : '#8B96B1' }}
                onClick={setBlockView}
              />
              <GridViewIcon
                style={{ color: gridViewEnabled ? '#054EDB' : '#8B96B1' }}
                onClick={setGridView}
              />
            </Flex>
          </Flex>
          <div className={`products__wrapper ${blockViewEnabled && 'block-view'}`}>
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
