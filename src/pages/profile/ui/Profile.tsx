import {
  Breadcrumb,
  Button,
  DatePicker,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Popconfirm,
  Typography,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AntPhone, Container } from 'shared/ui';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import './style.css';
import { HeartOutlined, HistoryOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { editUserFields, selectUser, unsetUser } from 'entities/user';
import PfpDefault from 'assets/images/pfp-default.svg';
import { useEffect, useState } from 'react';
import { RegisterForm } from 'types';
import { PhoneNumberUtil } from 'google-libphonenumber';
import dayjs from 'dayjs';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const isValid = isPhoneValid(phone);
  const [profileForm] = Form.useForm<RegisterForm>();
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });

  const onFinish: FormProps<RegisterForm>['onFinish'] = (values) => {
    const form: RegisterForm = { ...values, phone };
    console.log('Success:', form);
    dispatch(editUserFields(form));
    setIsEditMode(false);
    messageApi.success({ content: 'Изменения сохранены' });
  };

  const onFinishFailed: FormProps<RegisterForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate('/');
  };

  const handleSubmitClick = () => {
    setError(!isValid);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const { firstName, lastName, dateOfBirth } = user;
    profileForm.setFieldValue('firstName', firstName);
    profileForm.setFieldValue('lastName', lastName);
    profileForm.setFieldValue('dateOfBirth', dayjs(dateOfBirth));
    setPhone(user.phone);
  }, []);

  return (
    <>
      {contextHolder}
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
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
              <Link to='/favorites'>
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
              <Link to='/order-history'>
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
              <Link to='/change-phone'>
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
              <Popconfirm
                title='Выйти из аккаунта?'
                onConfirm={handleLogout}
                okText='Да'
                cancelText='Нет'
              >
                <Button type='text' danger className='profile__nav__btn btn-logout'>
                  Выйти из аккаунта
                </Button>
              </Popconfirm>
            </Flex>
            <Flex vertical className='profile__content'>
              <Typography.Title level={3}>Профиль</Typography.Title>
              <Flex className='profile-picture-wrap'>
                <div className='profile-picture'>
                  <img src={PfpDefault} alt='profile-picture' />
                </div>
                <Button
                  type='primary'
                  className='upload-pfp-btn
                '
                >
                  Загрузить аватар
                </Button>
              </Flex>
              <Typography.Text className='profile__content__title'>
                Как к Вам обращаться?
              </Typography.Text>
              <Form
                name='sign-up'
                className='sign-up__form'
                size='large'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={profileForm}
              >
                <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
                  <Input placeholder='Имя' readOnly={!isEditMode} />
                </Form.Item>
                <Form.Item
                  name='lastName'
                  rules={[{ required: true, message: 'Введите фамилию!' }]}
                >
                  <Input placeholder='Фамилия' readOnly={!isEditMode} />
                </Form.Item>
                <Form.Item
                  name='dateOfBirth'
                  rules={[{ required: true, message: 'Выберите дату рождения!' }]}
                >
                  <DatePicker
                    placeholder='Дата рождения'
                    className='sign-up__datepicker'
                    inputReadOnly={!isEditMode}
                    allowClear={isEditMode}
                    open={isEditMode ? undefined : false}
                    format={'DD.MM.YYYY'}
                  />
                </Form.Item>
                <Form.Item name='phone'>
                  <div>
                    <div className={`phone-input-wrap ${error ? 'error' : ''}`}>
                      <AntPhone
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        error={error}
                        readonly={!isEditMode}
                      />
                    </div>
                    {error && (
                      <Typography.Text type='danger' className='sign-up__error-text'>
                        Неправильно введен номер!
                      </Typography.Text>
                    )}
                  </div>
                </Form.Item>
                {isEditMode ? (
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      type='primary'
                      className='sign-up__next-btn'
                      block
                      onClick={() => setError(!isValid)}
                    >
                      Сохранить
                    </Button>
                  </Form.Item>
                ) : (
                  <Button
                    type='primary'
                    className='sign-up__next-btn'
                    block
                    onClick={handleSubmitClick}
                  >
                    Редактировать
                  </Button>
                )}
              </Form>
            </Flex>
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
