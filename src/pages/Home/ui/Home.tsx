import { Container } from 'shared/ui';
import { Header } from 'widgets/header';
import { Carousel } from 'widgets/carousel';

export const Home = () => {
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main>
        <Container>
          <Carousel />
        </Container>
      </main>
    </>
  );
};
