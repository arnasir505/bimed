import { Button, Flex, Input, Typography } from 'antd';
import './styles.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export const PhoneVerification = () => {
  const location = useLocation();
  const [counter, setCounter] = useState(59);
  const [sendAgainAvailable, setSendAgainAvailable] = useState(true);
  const intervalRef = useRef<number>();
  const { phone, prevPage } = location.state as { phone: string; prevPage: string };
  const handleClick = () => {
    setSendAgainAvailable(false);
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalRef.current);
      setSendAgainAvailable(true);
      setCounter(59);
    }
  }, [counter]);

  return (
    <Flex justify='center' align='center' className='sign-up-bg'>
      <Flex vertical className='phone-verify'>
        <Link to='/' className='sign-up__link-to-home'>
          <Typography.Text className='sign-up__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='phone-verify__title'>
          Подтверждение номера телефона
        </Typography.Title>
        <Typography.Text className='phone-verify__phone'>{phone}</Typography.Text>
        <Link to={prevPage} className='phone-verify__link'>
          <Typography.Text className='phone-verify__link'>Неверный номер телефона?</Typography.Text>
        </Link>
        <Input size='large' placeholder='Введите код подтверждения' />
        <Button size='large' type='primary' className='phone-verify__confirm'>
          Подтвердить
        </Button>
        <Typography.Text className='phone-verify__send-again-text'>
          Не пришло SMS сообщение?
        </Typography.Text>
        {sendAgainAvailable ? (
          <Button size='large' className='phone-verify__send-again' onClick={handleClick}>
            Отправить снова
          </Button>
        ) : (
          <Button size='large' disabled className='phone-verify__send-again'>
            Отправить снова через {counter >= 10 ? `00:${counter}` : `00:0${counter}`}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
