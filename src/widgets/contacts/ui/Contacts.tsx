import { Button, Flex, Form, FormProps, Input, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Locations from 'assets/images/locations.svg';
import './style.css';
import { AntPhone } from 'shared/ui';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useState } from 'react';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const Contacts = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const isValid = isPhoneValid(phone);
  const [feedbackForm] = Form.useForm();

  const onFinish: FormProps['onFinish'] = (values) => {
    setError(!isValid);
    console.log({ ...values, phone });
  };

  const onFinishFailed: FormProps['onFinishFailed'] = () => {
    setError(!isValid);
  };

  return (
    <Flex vertical className='contacts-wrap'>
      <Flex vertical className='faq__content'>
        <Typography.Title level={4} className='faq__title'>
          Контакты
        </Typography.Title>
        <Flex className='contacts'>
          <Flex className='contacts__our-phones' vertical>
            <Typography.Text className='contacts__title'>Наши телефоны:</Typography.Text>
            <Typography.Text className='footer__link footer__link_icon phone'>
              +996 (555) 55 55 55
            </Typography.Text>
            <Typography.Text className='footer__link footer__link_icon phone'>
              +996 (555) 55 55 55
            </Typography.Text>
            <Typography.Text className='footer__link footer__link_icon phone'>
              +996 (555) 55 55 55
            </Typography.Text>
          </Flex>
          <Flex className='contacts__address' vertical>
            <Typography.Text className='contacts__title'>Email:</Typography.Text>
            <Link to={'/'} className='footer__link footer__link_icon mail'>
              <Typography.Text>qwerty123@gmail.com</Typography.Text>
            </Link>
            <Typography.Text className='contacts__title'>Наш адрес:</Typography.Text>
            <Link to={'/'} className='footer__link footer__link_icon pin'>
              <Typography.Text>г. Бишкек, пр-т Манаса, д. 5</Typography.Text>
            </Link>
          </Flex>
          <Flex className='contacts__social-media' vertical>
            <Typography.Text className='contacts__title'>Мы в социальных сетях:</Typography.Text>
            <List className='footer__links'>
              <Link to={'/'} className='footer__link footer__link_icon facebook'>
                Facebook
              </Link>
              <Link to={'/'} className='footer__link footer__link_icon vk'>
                VKontakte
              </Link>
              <Link to={'/'} className='footer__link footer__link_icon instagram'>
                Instagram
              </Link>
              <Link to={'/'} className='footer__link footer__link_icon odnoklassniki'>
                Odnoklassniki
              </Link>
            </List>
          </Flex>
        </Flex>
      </Flex>
      <Flex className='faq__content'>
        <div className='contacts__location'>
          <img src={Locations} alt='locations' />
        </div>
      </Flex>
      <Flex className='faq__content' gap={'16px'}>
        <Flex className='contacts__feedback' vertical>
          <Typography.Text className='contacts__feedback_title'>Обратная связь</Typography.Text>
          <Typography.Text className='contacts__feedback_text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet,
            consectetur adipiscing elitLorem ipsum dolor sit
          </Typography.Text>
        </Flex>
        <Flex className='feedback-form-wrap'>
          <Form
            name='feedback'
            size='large'
            form={feedbackForm}
            className='feedback-form'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Flex vertical flex={'1'}>
              <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
                <Input placeholder='Имя' />
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
              <Form.Item
                name='email'
                rules={[
                  { required: true, type: 'email', message: 'Введите адрес электронной  почты!' },
                ]}
              >
                <Input placeholder='e-mail' />
              </Form.Item>
              <Form.Item name='theme' rules={[{ required: true, message: 'Введите  тему!' }]}>
                <Input placeholder='Тема' />
              </Form.Item>
            </Flex>
            <Flex vertical flex={'1'}>
              <Form.Item
                name='comment'
                className='feedback__form_comment'
                rules={[{ required: true, message: 'Введите комментарий!' }]}
              >
                <Input.TextArea
                  placeholder='Комментарий'
                  className='feedback__form_comment_input'
                  autoSize={{}}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  block
                  style={{ marginTop: error ? '15px' : '0' }}
                >
                  Отправить
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};
