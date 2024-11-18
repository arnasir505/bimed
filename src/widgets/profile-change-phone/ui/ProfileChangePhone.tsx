import { Button, Flex, Form, FormProps, Input, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './style.css';
import { AntPhone } from 'shared/ui';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { selectUser, updateUserPhone } from 'entities/user';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';

const phoneUtil = PhoneNumberUtil.getInstance();
const code = '1234';
const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const ProfileChangePhone = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [current, setCurrent] = useState(0);
  const [phone, setPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [error, setError] = useState(false);
  const [newPhoneError, setNewPhoneError] = useState(false);
  const [samePhoneError, setSamePhoneError] = useState(false);
  const [samePhoneError2, setSamePhoneError2] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [codeError2, setCodeError2] = useState(false);
  const [counter, setCounter] = useState(59);
  const [counter2, setCounter2] = useState(59);
  const [sendAgainAvailable, setSendAgainAvailable] = useState(true);
  const [sendAgainAvailable2, setSendAgainAvailable2] = useState(true);
  const intervalRef = useRef<number>();
  const intervalRef2 = useRef<number>();
  const isValid = isPhoneValid(phone);
  const isNewPhoneValid = isPhoneValid(newPhone);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (current === 0) {
      setPhone(user.phone);
      setError(false);
      setNewPhoneError(false);
      setCodeError(false);
      setCodeError2(false);
      setSamePhoneError(false);
      setSamePhoneError2(false);
    }
  }, [current]);

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalRef.current);
      setSendAgainAvailable(true);
      setCounter(59);
    }
  }, [counter]);

  useEffect(() => {
    if (counter2 === 0) {
      clearInterval(intervalRef2.current);
      setSendAgainAvailable2(true);
      setCounter2(59);
    }
  }, [counter2]);

  const onSendCodeAgainClick = () => {
    setSendAgainAvailable(false);
    intervalRef.current = window.setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  };

  const onSendCodeAgainClick2 = () => {
    setSendAgainAvailable2(false);
    intervalRef2.current = window.setInterval(() => {
      setCounter2((prev) => prev - 1);
    }, 1000);
  };

  const onStep1Finish: FormProps['onFinish'] = () => {
    setError(!isValid);
    if (!isValid || phone !== user?.phone) {
      setSamePhoneError(true);
      return;
    }
    setCurrent(1);
  };

  const onStep2Finish: FormProps['onFinish'] = (values) => {
    if (values.code !== code) {
      setCodeError(true);
      return;
    }
    setCurrent(2);
  };

  const onStep3Finish: FormProps['onFinish'] = () => {
    setNewPhoneError(!isNewPhoneValid);
    if (!isNewPhoneValid || newPhone === user?.phone) {
      setSamePhoneError2(true);
      return;
    }
    setCurrent(3);
  };

  const onStep4Finish: FormProps['onFinish'] = (values) => {
    if (values.code !== code) {
      setCodeError2(true);
      return;
    }
    dispatch(updateUserPhone(newPhone));
    setCurrent(4);
  };

  const steps = [
    {
      content: (
        <Flex vertical className='phone-change__step'>
          <Typography.Title level={3}>Смена номера</Typography.Title>
          <Typography.Text className='phone-change__helper-text'>
            Нажмите далее чтобы получить код подтверждения
          </Typography.Text>
          <Form
            name='phone-change__step-1'
            className='phone-change__btn-wrap'
            size='large'
            onFinish={onStep1Finish}
          >
            <Form.Item>
              <div className={`phone-input-wrap ${error ? 'error' : ''}`}>
                <AntPhone value={phone} onChange={(phone) => setPhone(phone)} error={error} />
              </div>
              {error ? (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Неправильно введен номер!
                </Typography.Text>
              ) : samePhoneError ? (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Номер телефона должен совпадать с указанным в профиле!
                </Typography.Text>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Далее
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      ),
    },
    {
      content: (
        <Flex vertical className='phone-change__step'>
          <Typography.Title level={3}>Смена номера</Typography.Title>
          <Typography.Text className='phone-change__helper-text'>
            Вам был отправлен код подтверждения на номер
          </Typography.Text>
          <Typography.Text className='phone-change__phone-number'>{phone}</Typography.Text>
          <Form
            name='phone-change__step-2'
            className='phone-change__btn-wrap'
            size='large'
            onFinish={onStep2Finish}
          >
            <Form.Item
              name='code'
              rules={[{ required: true, message: 'Введите код!' }]}
              validateStatus={codeError ? 'error' : undefined}
              help={codeError ? 'Неверный код.' : undefined}
            >
              <Input placeholder='Введите код подтверждения' style={{ textAlign: 'center' }} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Сменить номер
              </Button>
            </Form.Item>
          </Form>
          <Button
            block
            size='large'
            onClick={() => setCurrent(0)}
            className='phone-change__step-2-cancel'
          >
            Отмена
          </Button>
          <Typography.Text className='phone-verify__send-again-text'>
            Не пришло SMS сообщение?
          </Typography.Text>
          {sendAgainAvailable ? (
            <Button
              size='large'
              className='phone-verify__send-again'
              onClick={onSendCodeAgainClick}
            >
              Отправить снова
            </Button>
          ) : (
            <Button size='large' disabled className='phone-verify__send-again'>
              Отправить снова через {counter >= 10 ? `00:${counter}` : `00:0${counter}`}
            </Button>
          )}
        </Flex>
      ),
    },
    {
      content: (
        <Flex vertical className='phone-change__step'>
          <Typography.Title level={3}>Новый номер телефона</Typography.Title>
          <Typography.Text className='phone-change__helper-text'>
            Введите новый номер телефона чтобы получить код подтверждения
          </Typography.Text>
          <Form
            name='phone-change__step-3'
            className='phone-change__btn-wrap'
            size='large'
            onFinish={onStep3Finish}
          >
            <Form.Item>
              <div className={`phone-input-wrap ${newPhoneError ? 'error' : ''}`}>
                <AntPhone
                  value={newPhone}
                  onChange={(phone) => setNewPhone(phone)}
                  error={newPhoneError}
                />
              </div>
              {newPhoneError ? (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Неправильно введен номер!
                </Typography.Text>
              ) : samePhoneError2 ? (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Номер телефона должен отличаться от указанного в профиле!
                </Typography.Text>
              ) : null}
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Далее
              </Button>
            </Form.Item>
          </Form>
          <Button block size='large' onClick={() => setCurrent(0)}>
            Отмена
          </Button>
        </Flex>
      ),
    },
    {
      content: (
        <Flex vertical className='phone-change__step'>
          <Typography.Title level={3}>Подтвердите номер</Typography.Title>
          <Typography.Text className='phone-change__helper-text'>
            Вам был отправлен код подтверждения на номер
          </Typography.Text>
          <Typography.Text className='phone-change__phone-number'>{newPhone}</Typography.Text>
          <Typography.Text
            className='phone-change__wrong-phone-number'
            onClick={() => setCurrent(2)}
          >
            Неверный номер телефона?
          </Typography.Text>
          <Form
            name='phone-change__step-4'
            className='phone-change__btn-wrap'
            size='large'
            onFinish={onStep4Finish}
          >
            <Form.Item
              name='code'
              rules={[{ required: true, message: 'Введите код!' }]}
              validateStatus={codeError2 ? 'error' : undefined}
              help={codeError2 ? 'Неверный код.' : undefined}
            >
              <Input placeholder='Введите код подтверждения' style={{ textAlign: 'center' }} />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                Сменить номер
              </Button>
            </Form.Item>
          </Form>
          <Button
            block
            size='large'
            onClick={() => setCurrent(0)}
            className='phone-change__step-2-cancel'
          >
            Отмена
          </Button>
          <Typography.Text className='phone-verify__send-again-text'>
            Не пришло SMS сообщение?
          </Typography.Text>
          {sendAgainAvailable2 ? (
            <Button
              size='large'
              className='phone-verify__send-again'
              onClick={onSendCodeAgainClick2}
            >
              Отправить снова
            </Button>
          ) : (
            <Button size='large' disabled className='phone-verify__send-again'>
              Отправить снова через {counter2 >= 10 ? `00:${counter2}` : `00:0${counter2}`}
            </Button>
          )}
        </Flex>
      ),
    },
    {
      content: (
        <Flex vertical className='phone-change__success-content'>
          <CheckCircleOutlined
            style={{ color: '#1D9F22', fontSize: '60px', justifyContent: 'center' }}
          />
          <Typography.Title level={4} className='phone-change__success-content__title'>
            Номер успешно изменен
          </Typography.Title>
          <Link to={'/'}>
            <Button type='primary' block size='large'>
              На главную
            </Button>
          </Link>
        </Flex>
      ),
    },
  ];
  return (
    <Flex
      className={`profile__content phone__change ${current === 4 ? 'phone-change__success' : ''}`}
    >
      {steps[current].content}
    </Flex>
  );
};
