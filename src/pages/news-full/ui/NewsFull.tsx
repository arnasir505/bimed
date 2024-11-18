import { Container, Layout } from 'shared/ui';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Flex, Typography } from 'antd';
import { news } from 'data/news';
import { NotFound } from 'pages/404';
import { SocialShare } from 'widgets/social-share';
import { NewsCard } from 'widgets/news-card';

export const NewsFull = () => {
  const params = useParams();

  const newsItem = news.find((item) => item.id === params.id);
  if (!newsItem) {
    return <NotFound />;
  }

  return (
    <Layout>
      <main className='news-full__main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to={`/news/${params.id}`}>Новость</Link> },
            ]}
          />
          <div className='news-full'>
            <Flex vertical className='news-full__content'>
              <img src={newsItem.img ? `/${newsItem.img}` : ''} className='news-full__img' alt='' />
              <Typography.Text className='news-card__date'>{newsItem.date}</Typography.Text>
              <Typography.Title className='news-full__title' level={4}>
                {newsItem.title}
              </Typography.Title>
              <Typography.Text className='news-full__text'>{newsItem.text}</Typography.Text>
              <Typography.Text className='news-full__share-text'>Поделиться</Typography.Text>
              <SocialShare variant='filled' />
            </Flex>
            <Flex vertical className='news-full__other-news'>
              {news.slice(0, 4).map((item) => (
                <NewsCard key={item.id} news={item} length={news.length} />
              ))}
              <Link to={'/news'}>
                <Button type='primary' size='large' block>
                  Все новости
                </Button>
              </Link>
            </Flex>
          </div>
        </Container>
      </main>
    </Layout>
  );
};
