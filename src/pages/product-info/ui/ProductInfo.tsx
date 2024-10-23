import { useParams } from 'react-router-dom';
import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export const ProductInfo = () => {
  const params = useParams();
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main>
        <Container>product info {params.id}</Container>
      </main>
      <footer className='footer'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};
