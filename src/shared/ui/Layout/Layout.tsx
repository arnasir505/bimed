import React, { PropsWithChildren } from 'react';
import { Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      {children}
      <footer className='footer'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};
