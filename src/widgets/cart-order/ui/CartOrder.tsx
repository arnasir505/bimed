import { Button, Flex, Form, Input, Typography } from 'antd';
import './style.css';
import { selectCartItemsTotal, selectCartItemsTotalPrice } from 'entities/cart';
import { selectUser, selectIsUserLoggedIn } from 'entities/user';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'shared/config';
import { AntPhone } from 'shared/ui';
import { useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { WhatsAppOutlined } from '@ant-design/icons';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const CartOrder = () => {
  const totalItemsInCart = useAppSelector(selectCartItemsTotal);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);

  const [form] = Form.useForm();

  return (
    <Flex vertical className='order-wrap'>
      <Flex vertical className='order'>
        <Typography.Title level={4} className='order__title'>
          Оформление заказа
        </Typography.Title>
        <Form name='order' className='order__form' size='large' form={form}>
          <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Введите адрес электронной почты!' }]}
          >
            <Input placeholder='e-mail' type='email' />
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
              <Button type='primary' block size='large'>
                Заказать
              </Button>
            </Link>
            <Link to={'/cart'} style={{ width: '100%' }}>
              <Button block size='large' style={{ color: '#032D80' }}>
                Отменить оформление заказа
              </Button>
            </Link>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};
