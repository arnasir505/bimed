import { Link, useNavigate } from 'react-router-dom';
import { Button, DatePicker, Flex, Form, FormProps, Input, Typography } from 'antd';
import './styles.css';
import 'react-international-phone/style.css';
import { useState } from 'react';
import { AntPhone } from 'shared/ui';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);

  const onFinish: FormProps['onFinish'] = (values) => {
    const form = { ...values, dateOfBirth: values.dateOfBirth.toISOString(), phone };
    console.log('Success:', form);
    navigate('/phone-verification', { state: { form: form, prevPage: '/sign-up' } });
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Flex justify='center' align='center' className='sign-up-bg'>
      <Flex vertical className='sign-up'>
        <Link to='/' className='sign-up__link-to-home'>
          <Typography.Text className='sign-up__link-to-home'>На главную</Typography.Text>
        </Link>
        <Typography.Title level={4} className='sign-up__title'>
          Регистрация
        </Typography.Title>
        <Flex className='sign-up__no-acc'>
          <Typography.Text className='sign-up__no-acc-text'>Есть аккаунт?</Typography.Text>
          <Link to='/sign-in' className='sign-up__link-to-sign-in'>
            <Typography.Text className='sign-up__link-to-sign-in'>Войти</Typography.Text>
          </Link>
        </Flex>
        <Form
          name='sign-up'
          className='sign-up__form'
          size='large'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item name='lastName' rules={[{ required: true, message: 'Введите фамилию!' }]}>
            <Input placeholder='Фамилия' />
          </Form.Item>
          <Form.Item
            name='dateOfBirth'
            rules={[{ required: true, message: 'Выберите дату рождения!' }]}
          >
            <DatePicker
              placeholder='Дата рождения'
              className='sign-up__datepicker'
              format={'DD.MM.YYYY'}
            />
          </Form.Item>
          <Form.Item name='phone'>
            <div>
              <div className={`phone-input-wrap ${error ? 'error' : ''}`}>
                <AntPhone value={phone} onChange={(phone) => setPhone(phone)} error={error} />
              </div>
              {error && (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Неправильно введен номер!
                </Typography.Text>
              )}
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              type='primary'
              className='sign-up__next-btn'
              onClick={() => setError(!isValid)}
              block
            >
              Далее
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};
