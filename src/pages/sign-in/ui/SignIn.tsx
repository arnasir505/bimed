import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';
import './styles.css';
import 'react-international-phone/style.css';
import { useState } from 'react';
import { AntPhone } from 'shared/ui';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const SignIn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);

  const handleClickToNextPage = () => {
    setError(!isValid);
    if (isValid) {
      navigate('/phone-verification');
    }
  };

  return (
    <Flex justify='center' align='center' className='sign-in-bg'>
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
        <Flex justify='center' gap='5px' className='sign-in__no-acc'>
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
