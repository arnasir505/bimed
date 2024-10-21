import React from 'react';
import { Button, Flex, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './style.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <Flex gap='14px' align='center'>
      <Typography.Text className='pagination__text'>Страница</Typography.Text>
      <Typography.Text className='pagination__current-page'>{currentPage}</Typography.Text>
      <Typography.Text className='pagination__text'>из {totalPages}</Typography.Text>
      <Flex gap='8px'>
        <Button
          className='pagination__btn'
          icon={
            <ArrowLeftOutlined
              style={{ color: currentPage === 1 ? '' : '#054EDB', fontSize: '20px' }}
            />
          }
          onClick={onPrevClick}
          disabled={currentPage === 1}
        />
        <Button
          className='pagination__btn'
          icon={
            <ArrowRightOutlined
              style={{
                color: currentPage === totalPages ? '' : '#054EDB',
                fontSize: '20px',
              }}
            />
          }
          onClick={onNextClick}
          disabled={currentPage === totalPages}
        />
      </Flex>
    </Flex>
  );
};
