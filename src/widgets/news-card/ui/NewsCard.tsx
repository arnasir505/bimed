import { Card, Typography } from 'antd';
import { News } from 'types';
import './style.css';

interface Props {
  news: News;
  index?: number;
}
export const NewsCard: React.FC<Props> = ({ news, index }) => {
  const isFirstNews = index === 0;
  return (
    <Card cover={<img src={news.img} />} bordered={false}>
      {isFirstNews ? (
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
  );
};
