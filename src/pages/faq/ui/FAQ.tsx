import { Container, Layout } from 'shared/ui';
import './style.css';
import { Breadcrumb, Button, Flex } from 'antd';
import { Link, NavLink, Outlet } from 'react-router-dom';
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
              <NavLink to='/faq' end>
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
              </NavLink>
              <NavLink to='contacts' end>
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
              </NavLink>
              <NavLink to='help' end>
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
              </NavLink>
              <NavLink to='/branches' end>
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
              </NavLink>
            </Flex>
            <Outlet />
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
