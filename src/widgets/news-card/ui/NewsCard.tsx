import { Card, Typography } from 'antd';
import { News } from 'types';
import './style.css';

interface Props {
  news: News;
}
export const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <Card cover={<img src={news.img} />} bordered={false}>
      <Typography.Text className='news-card__title'>{news.title}</Typography.Text>
      <Typography.Text className='news-card__date'>{news.date}</Typography.Text>
    </Card>
  );
};
