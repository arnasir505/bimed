import { Container, Layout } from 'shared/ui';
import './style.css';
import { Breadcrumb, Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import {
  PhoneOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

export const FAQ = () => {
  return (
    <Layout>
      <main className='faq-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/faq'>О нас</Link> },
            ]}
          />
          <Flex className='profile faq-nav'>
            <Flex vertical className='profile__nav'>
              <Link to='/faq'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <InfoCircleOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  О нас
                </Button>
              </Link>
              <Link to='contacts'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <PhoneOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Контакты
                </Button>
              </Link>
              <Link to='help'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <QuestionCircleOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Помощь
                </Button>
              </Link>
              <Link to='/branches'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <EnvironmentOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Филиалы
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
