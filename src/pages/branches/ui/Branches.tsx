import { Container, Layout } from 'shared/ui';
import './style.css';
import { Breadcrumb, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { branches } from 'data/branches';
import { BranchesCard } from 'widgets/branches-card';
import { Branch } from 'types';
import { useState, useEffect } from 'react';
import { Pagination } from 'widgets/pagination';

export const Branches = () => {
  const [current, setCurrent] = useState(0);
  const [branchesCopy] = useState([...branches]);
  const itemsPerPage = 20;

  const branchesChunks = branchesCopy.reduce((resultArray: Branch[][], item, index) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as Branch[][]);

  const navigateToPrevious = () => {
    if (current >= 1) {
      setCurrent((prev) => prev - 1);
    }
  };

  const navigateToNext = () => {
    if (current < branchesChunks.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [current]);
  return (
    <Layout>
      <main className='branches-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/branches'>Филиалы</Link> },
            ]}
          />
          <div className='branches'>
            <Typography.Title level={4} className='branches__title'>
              Филиалы
            </Typography.Title>
            <div className='branches__wrapper'>
              {branchesChunks[current].map((item) => (
                <BranchesCard key={item.id} branch={item} />
              ))}
            </div>
          </div>
          <Flex justify='end'>
            <Pagination
              currentPage={current + 1}
              totalPages={branchesChunks.length}
              onPrevClick={navigateToPrevious}
              onNextClick={navigateToNext}
            />
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
