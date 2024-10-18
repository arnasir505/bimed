import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import './style.css';
import { Breadcrumb, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main className='catalog-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Typography.Text>Каталог</Typography.Text> },
            ]}
          />
          <Typography.Title level={4}>Витамины</Typography.Title>
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
