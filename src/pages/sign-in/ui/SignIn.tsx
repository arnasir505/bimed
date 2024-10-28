import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, message, Typography } from 'antd';
import './styles.css';
import 'react-international-phone/style.css';
import { useState } from 'react';
import { AntPhone } from 'shared/ui';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useAppSelector } from 'shared/config';
import { selectUser } from 'entities/user';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const SignIn = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 2 });

  const handleClickToNextPage = () => {
    setError(!isValid);
    if (!isValid) return;
    if (!(user?.phone === phone)) {
      messageApi.error({ content: 'Пользователя с таким номером не существует' });
      return;
    }
    navigate('/phone-verification', {
      state: { form: { phone: phone }, prevPage: '/sign-in' },
    });
  };

  return (
    <Flex justify='center' align='center' className='sign-in-bg'>
      {contextHolder}
      <Flex vertical className='sign-in'>
        <Link to='/' className='sign-in__link-to-home'>
          <Typography.Text className='sign-in__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='sign-in__title'>
          Вход/Регистрация
        </Typography.Title>
        <div className={`sign-in__phone-input-wrap ${error ? 'error' : ''}`}>
          <AntPhone value={phone} onChange={(phone) => setPhone(phone)} error={error} />
        </div>
        {error && (
          <Typography.Text type='danger' className='sign-in__error-text'>
            Неправильно введен номер
          </Typography.Text>
        )}
        <Button
          size='large'
          type='primary'
          className='sign-in__next-btn'
          onClick={handleClickToNextPage}
        >
          Далее
        </Button>
        <Flex justify='center' className='sign-in__no-acc'>
          <Typography.Text className='sign-in__no-acc-text'>Нет аккаунта?</Typography.Text>
          <Link to='/sign-up' className='sign-in__link-to-sign-up'>
            <Typography.Text className='sign-in__link-to-sign-up'>
              Зарегистрироваться
            </Typography.Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
