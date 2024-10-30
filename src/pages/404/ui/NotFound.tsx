import { Flex, Typography } from 'antd';
import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import './styles.css';

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
