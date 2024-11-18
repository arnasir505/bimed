import { Flex, Typography } from 'antd';
import { Container, Layout } from 'shared/ui';
import { Link } from 'react-router-dom';

import './styles.css';

export const NotFound = () => {
  return (
    <Layout>
      <main className='not-found__wrap'>
        <Container>
          <Flex vertical justify='center' align='center' className='not-found'>
            <Typography.Text className='not-found__error'>Ошибка</Typography.Text>
            <Typography.Text className='not-found__page'>Страница не найдена</Typography.Text>
            <Link to='/'>
              <Typography.Text className='not-found__return-home'>На главную</Typography.Text>
            </Link>
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
