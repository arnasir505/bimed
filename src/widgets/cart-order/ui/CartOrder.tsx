import {
  Button,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Typography,
} from 'antd';
import './style.css';
import {
  clearCart,
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from 'entities/cart';
import { selectUser, selectIsUserLoggedIn, addOrderToHistory } from 'entities/user';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { AntPhone, Result, SubmitButton } from 'shared/ui';
import { useEffect, useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { Order } from 'types';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

const getRandomID = () => {
  const minCeiled = Math.ceil(1000000000);
  const maxFloored = Math.floor(9000000000);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled).toString();
};

export const CartOrder = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const totalItemsInCart = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const cartItems = useAppSelector(selectCartItems);
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const [radioValue, setRadioValue] = useState<'cash' | 'online' | 'terminal'>('cash');
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });

  const onChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);

  const [form] = Form.useForm();

  const handleClose = () => {
    messageApi.destroy();
    navigate('/');
    dispatch(clearCart());
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    setError(!isValid);
    if (isValid) {
      console.log('Success:', { ...values, phone, payment: radioValue });
      const order: Order = {
        id: getRandomID(),
        date: new Date().toISOString(),
        status: 'accepted',
        totalItems: totalItemsInCart,
        totalPrice: totalPrice,
        items: cartItems,
      };
      dispatch(addOrderToHistory(order));
      if (!values) {
        messageApi.error({
          content: (
            <Result
              title='Ошибка! Попробуйте снова'
              icon={<ExclamationCircleOutlined style={{ color: '#E31B4B' }} />}
              btnText='Закрыть'
              onClick={handleClose}
            />
          ),
          icon: <></>,
          className: 'order__result',
          duration: 0,
        });
      }
      messageApi.success({
        content: (
          <Result
            title='Успешно оплачено!'
            icon={<CheckCircleOutlined style={{ color: '#1d9f22' }} />}
            btnText='Хорошо'
            onClick={handleClose}
          />
        ),
        icon: <></>,
        className: 'order__result',
        duration: 0,
      });
    }
  };

  useEffect(() => {
    if (!(user && isLoggedIn)) {
      return;
    }
    const { firstName } = user;
    form.setFieldValue('firstName', firstName);
    setPhone(user.phone);
  }, []);

  return (
    <Flex vertical className='order-wrap'>
      {contextHolder}
      <Flex vertical className='order'>
        <Typography.Title level={4}>Оформление заказа</Typography.Title>
        <Form name='order' className='order__form' size='large' form={form} onFinish={onFinish}>
          <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item name='email'>
            <Input placeholder='e-mail' />
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
          <Form.Item name='whatsappPhone'>
            <Input
              placeholder='Номер WhatsApp'
              prefix={
                <WhatsAppOutlined
                  style={{ color: '#1D9F22', fontSize: '22px', paddingRight: '8px' }}
                />
              }
            />
          </Form.Item>
          <Form.Item
            name='deliveryAddress'
            rules={[{ required: true, message: 'Введите адрес доставки!' }]}
          >
            <Input placeholder='Адрес доставки' />
          </Form.Item>
          <Form.Item name='comment'>
            <Input.TextArea placeholder='Комментарий' autoSize={{ minRows: 4, maxRows: 6 }} />
          </Form.Item>
        </Form>
        <Flex vertical gap={'16px'}>
          <Typography.Text>Выбор оплаты</Typography.Text>
          <Radio.Group onChange={onChange} value={radioValue}>
            <Flex vertical gap={'16px'}>
              <Radio value={'cash'} style={{ gap: '5px' }}>
                Наличный
              </Radio>
              <Radio value={'online'} style={{ gap: '5px' }}>
                Безналичный
              </Radio>
              <Radio value={'terminal'} style={{ gap: '5px' }}>
                POS - терминал
              </Radio>
            </Flex>
          </Radio.Group>
          {user && isLoggedIn && (
            <Flex justify='space-between' align='flex-start'>
              <Checkbox style={{ gap: '5px' }}>
                <Flex vertical>
                  <span>Оплата баллами</span>
                  <span className='order__bonus-description'>
                    На вашем счету 450 бонусов, доступно к списанию 150 баллов
                  </span>
                </Flex>
              </Checkbox>
              <Input name='bonus-amount' className='order__bonus-amount' />
            </Flex>
          )}
        </Flex>
      </Flex>
      <div className='cart-total'>
        <Flex vertical gap={'20px'}>
          <Typography.Title level={4} className='cart-total__title'>
            Итого
          </Typography.Title>
          <Flex vertical gap={'8px'}>
            <Flex className='cart-total__info'>
              <Typography.Text className='cart-total__info-text'>
                Товаров в корзине:
              </Typography.Text>
              <Typography.Text>{totalItemsInCart}</Typography.Text>
            </Flex>
            {user && isLoggedIn && (
              <Flex className='cart-total__info'>
                <Typography.Text className='cart-total__info-text cart-total__info-text-orange'>
                  Будет начислено баллов:
                </Typography.Text>
                <Typography.Text>{45}</Typography.Text>
              </Flex>
            )}
            <Flex className='cart-total__info'>
              <Typography.Text className='cart-total__info-text'>Ваша скидка:</Typography.Text>
              <Typography.Text>{100} c</Typography.Text>
            </Flex>
            <Flex className='cart-total__info'>
              <Typography.Text className='cart-total__info-text'>Общая сумма:</Typography.Text>
              <Typography.Text>{totalPrice} c</Typography.Text>
            </Flex>
          </Flex>
          <Typography.Text className='cart-total__delivery-terms'>
            Оплата за доставку оплачивается отдельно <br />
            <Link to={'/delivery-terms'}>Подробнее</Link>
          </Typography.Text>
          <Flex vertical gap={'8px'}>
            <Link to={'/cart/order'} style={{ width: '100%' }}>
              <SubmitButton
                form={form}
                props={{
                  type: 'primary',
                  htmlType: 'submit',
                  block: true,
                  size: 'large',
                  onClick: () => {
                    form.submit();
                  },
                }}
              >
                Заказать
              </SubmitButton>
            </Link>
            <Link to={'/cart'} style={{ width: '100%' }}>
              <Button block size='large'>
                Отменить оформление заказа
              </Button>
            </Link>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};
