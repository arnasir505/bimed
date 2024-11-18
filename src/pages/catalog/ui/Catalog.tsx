import { Container, Layout } from 'shared/ui';
import { Breadcrumb, Button, Flex, GetProps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { products } from 'data/products';
import { ProductCard } from 'widgets/product-card';
import { useEffect, useReducer, useState } from 'react';
import { Product } from 'types';
import { Pagination } from 'widgets/pagination';
import Icon, { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './style.css';
import { BlockViewSvg } from './BlockViewSvg';
import { GridViewSvg } from './GridViewSvg';

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

  type CustomIconComponentProps = GetProps<typeof Icon>;

  const BlockViewIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BlockViewSvg} {...props} />
  );

  const GridViewIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={GridViewSvg} {...props} />
  );

  return (
    <Layout>
      <main className='catalog-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/catalog'>Каталог</Link> },
            ]}
          />
          <Typography.Title level={4} className='catalog__title'>
            Витамины
          </Typography.Title>
          <Flex justify='space-between'>
            <Flex className='sort-options' align='center'>
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
            <Flex className='catalog-view-options'>
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
    </Layout>
  );
};
