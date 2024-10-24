import { Link } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';
import './styles.css';
import 'react-international-phone/style.css';
import { useState } from 'react';
import { AntPhone } from 'shared/ui';

export const SignIn = () => {
  const [phone, setPhone] = useState('');

  const onPhoneInputChange = (phone: string) => {
    setPhone(phone);
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
        <div className='phone-input-wrap'>
          <AntPhone value={phone} onChange={onPhoneInputChange} />
        </div>
        <Button type='primary' className='sign-in__next-btn'>
          Далее
        </Button>
      </Flex>
    </Flex>
  );
};
