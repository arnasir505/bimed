import { Breadcrumb, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Container, Layout } from 'shared/ui';
import './style.css';
import { news } from 'data/news';
import { NewsCard } from 'widgets/news-card';
import { useState } from 'react';
import { News as INews } from 'types';
import { Pagination } from 'widgets/pagination';

export const News = () => {
  const [current, setCurrent] = useState(0);
  const [newsCopy] = useState([...news]);
  const itemsPerPage = 14;

  const newsChunks = newsCopy.reduce((resultArray: INews[][], item, index) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as INews[][]);

  const navigateToPrevious = () => {
    if (current >= 1) {
      setCurrent((prev) => prev - 1);
    }
  };

  const navigateToNext = () => {
    if (current < newsChunks.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };
  return (
    <Layout>
      <main className='news-main'>
        <Container>
          <Breadcrumb
            className='news__breadcrumb'
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/news'>Новости</Link> },
            ]}
          />
          <Typography.Title level={4} className='news__title'>
            Новости
          </Typography.Title>
          <div
            className={`news-page__wrapper ${newsChunks[current].length < 10 ? 'shrink-last-item' : ''}`}
          >
            {newsChunks[current].map((item, index) => (
              <NewsCard
                key={item.id}
                news={item}
                index={index}
                length={newsChunks[current].length}
              />
            ))}
          </div>
          <Flex justify='end'>
            <Pagination
              currentPage={current + 1}
              totalPages={newsChunks.length}
              onPrevClick={navigateToPrevious}
              onNextClick={navigateToNext}
            />
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
