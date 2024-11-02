import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Container, Layout } from 'shared/ui';
import './style.css';
import { news } from 'data/news';
import { NewsCard } from 'widgets/news-card';

export const News = () => {
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
          <div className='news-page__wrapper'>
            {news.map((item, index) => (
              <NewsCard key={item.id} news={item} index={index} />
            ))}
          </div>
        </Container>
      </main>
    </Layout>
  );
};
