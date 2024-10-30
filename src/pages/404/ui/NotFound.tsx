import { Flex, Typography } from 'antd';
import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import './styles.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
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
      <footer className='footer'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};
