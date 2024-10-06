import { Container } from 'shared/ui';
import { Header } from 'widgets/header';
import './style.css';

function App() {
  return (
    <header className='header'>
      <Container>
        <Header />
      </Container>
    </header>
  );
}

export default App;
