import { Button, Flex, Input, message, Typography } from 'antd';
import './styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { RegisterForm } from 'types';
import { useAppDispatch } from 'shared/config';
import { loginUser, updateUser } from 'entities/user';

const correctCode = 1234;

export const PhoneVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(59);
  const [sendAgainAvailable, setSendAgainAvailable] = useState(true);
  const [code, setCode] = useState('');
  const intervalRef = useRef<number>();
  const { form, prevPage } = location.state as { form: RegisterForm; prevPage: string };
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 2 });

  const handleClick = () => {
    setSendAgainAvailable(false);
    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  };

  const handleAuthorization = () => {
    if (!(Number(code) === correctCode)) {
      messageApi.error({ content: 'Неверный код' });
      return;
    }
    if (prevPage === '/sign-up') {
      dispatch(updateUser({ id: Math.random().toString(), ...form, favorites: [], orders: [] }));
      navigate('/');
    } else if (prevPage === '/sign-in') {
      dispatch(loginUser(form.phone));
      navigate('/');
    }
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
      {contextHolder}
      <Flex vertical className='phone-verify'>
        <Link to='/' className='sign-up__link-to-home'>
          <Typography.Text className='sign-up__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='phone-verify__title'>
          Подтверждение номера телефона
        </Typography.Title>
        <Typography.Text className='phone-verify__phone'>{form.phone}</Typography.Text>
        <Link to={prevPage} className='phone-verify__link'>
          <Typography.Text className='phone-verify__link'>Неверный номер телефона?</Typography.Text>
        </Link>
        <Input
          size='large'
          placeholder='Введите код подтверждения'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          size='large'
          type='primary'
          className='phone-verify__confirm'
          onClick={handleAuthorization}
        >
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
