import { Button, Flex, Input, Typography } from 'antd';
import './styles.css';
import { Link } from 'react-router-dom';

export const PhoneVerification = () => {
  let counter = 5;

  const handleClick = () => {
    const countdown = setInterval(() => {
      counter--;
      if (counter === 0) {
        clearInterval(countdown);
      }
    }, 1000);
  };
  return (
    <Flex justify='center' align='center' className='sign-up-bg'>
      <Flex vertical className='phone-verify'>
        <Link to='/' className='sign-up__link-to-home'>
          <Typography.Text className='sign-up__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='phone-verify__title'>
          Подтверждение номера телефона
        </Typography.Title>
        <Typography.Text className='phone-verify__phone'>+996 555 55 55 55</Typography.Text>
        <Link to='/sign-in' className='phone-verify__link'>
          <Typography.Text className='phone-verify__link'>Неверный номер телефона?</Typography.Text>
        </Link>
        <Input size='large' placeholder='Введите код подтверждения' />
        <Button size='large' type='primary' className='phone-verify__confirm'>
          Подтвердить
        </Button>
        <Typography.Text className='phone-verify__send-again-text'>
          Не пришло SMS сообщение?
        </Typography.Text>
        <Button size='large' className='phone-verify__send-again' onClick={handleClick}>
          Отправить снова {counter}
        </Button>
      </Flex>
    </Flex>
  );
};
