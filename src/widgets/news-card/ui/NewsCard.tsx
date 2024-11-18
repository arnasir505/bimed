import { Card, Typography } from 'antd';
import { News } from 'types';
import './style.css';
import { Link } from 'react-router-dom';

interface Props {
  news: News;
  index?: number;
  length: number;
}
export const NewsCard: React.FC<Props> = ({ news, index, length }) => {
  const isFirstNews = index === 0;
  const isLastNews = index === length - 1;
  return (
    <Link to={`/news/${news.id}`} className='news-card__link'>
      <Card cover={<img src={news.img ? `/${news.img}` : ''} />} bordered={false}>
        {isFirstNews || isLastNews ? (
          <>
            <Typography.Title level={4} className='news-card__title large'>
              {news.title}
            </Typography.Title>
            <Typography.Paragraph className='news-card__text' ellipsis={{ rows: 3 }}>
              {news.text}
            </Typography.Paragraph>
          </>
        ) : (
          <Typography.Text className='news-card__title'>{news.title}</Typography.Text>
        )}
        <Typography.Text className='news-card__date'>{news.date}</Typography.Text>
      </Card>
    </Link>
  );
};
