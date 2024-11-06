import { Breadcrumb, Button, Flex } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, Layout } from 'shared/ui';
import './style.css';
import { HeartOutlined, HistoryOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { selectIsUserLoggedIn, selectUser, unsetUser } from 'entities/user';
import { useEffect } from 'react';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate('/');
  };

  useEffect(() => {
    if (!user || !isLoggedIn) {
      navigate('/sign-in', { replace: true });
    }
  }, [user, isLoggedIn]);

  return (
    <Layout>
      <main className='profile-main'>
        <Container>
          <Breadcrumb
            items={[
              { title: <Link to='/'>Главная</Link> },
              { title: <Link to='/profile'>Профиль</Link> },
            ]}
          />
          <Flex className='profile'>
            <Flex vertical className='profile__nav'>
              <Link to='/profile'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <UserOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Профиль
                </Button>
              </Link>
              <Link to='favorites'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <HeartOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Избранное
                </Button>
              </Link>
              <Link to='order-history'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <HistoryOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  История заказов
                </Button>
              </Link>
              <Link to='change-phone'>
                <Button
                  type='text'
                  className='profile__nav__btn'
                  icon={
                    <PhoneOutlined
                      style={{ fontSize: '18px', color: '#CDDAF1', marginInlineEnd: '5px' }}
                    />
                  }
                >
                  Сменить номер
                </Button>
              </Link>
              <div className='profile__nav__divider' />
              <Button
                type='text'
                danger
                className='profile__nav__btn btn-logout'
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </Button>
            </Flex>
            <Outlet />
          </Flex>
        </Container>
      </main>
    </Layout>
  );
};
