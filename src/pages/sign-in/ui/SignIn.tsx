import { Link } from 'react-router-dom';
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
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);

  return (
    <Flex justify='center' align='center' className='sign-in-bg'>
      <Flex vertical className='sign-in'>
        <Link to='/' className='sign-in__link-to-home'>
          <Typography.Text className='sign-in__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='sign-in__title'>
          Вход/Регистрация
        </Typography.Title>
        <div className={`phone-input-wrap ${error ? 'error' : ''}`}>
          <AntPhone value={phone} onChange={(phone) => setPhone(phone)} error={error} />
        </div>
        {error && (
          <Typography.Text type='danger' className='sign-in__error-text'>
            Неправильно введен номер
          </Typography.Text>
        )}
        <Button type='primary' className='sign-in__next-btn' onClick={() => setError(!isValid)}>
          Далее
        </Button>
      </Flex>
    </Flex>
  );
};
