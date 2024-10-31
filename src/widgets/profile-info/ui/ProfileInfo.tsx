import { Flex, Typography, Button, Form, Input, DatePicker, FormProps, message } from 'antd';
import dayjs from 'dayjs';
import { selectUser, editUserFields } from 'entities/user';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { AntPhone } from 'shared/ui';
import { RegisterForm, RegisterFormMutation } from 'types';
import PfpDefault from 'assets/images/pfp-default.svg';
import QrCode from 'assets/images/qr-code.png';
import './style.css';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const isValid = isPhoneValid(phone);
  const [profileForm] = Form.useForm<RegisterFormMutation>();
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });

  const onFinish: FormProps<RegisterFormMutation>['onFinish'] = (values) => {
    const form: RegisterForm = { ...values, dateOfBirth: values.dateOfBirth.toISOString(), phone };
    console.log('Success:', form);
    dispatch(editUserFields(form));
    setIsEditMode(false);
    messageApi.success({ content: 'Изменения сохранены' });
  };

  const onFinishFailed: FormProps<RegisterFormMutation>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmitClick = () => {
    setError(!isValid);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    const { firstName, lastName, dateOfBirth } = user;
    profileForm.setFieldValue('firstName', firstName);
    profileForm.setFieldValue('lastName', lastName);
    profileForm.setFieldValue('dateOfBirth', dayjs(dateOfBirth));
    setPhone(user.phone);
  }, []);
  return (
    <Flex className='profile__content' wrap={'wrap-reverse'}>
      {contextHolder}
      <Flex vertical>
        <Typography.Title level={3}>Профиль</Typography.Title>
        <Flex className='profile-picture-wrap'>
          <div className='profile-picture'>
            <img src={PfpDefault} alt='profile-picture' />
          </div>
          <Button
            type='primary'
            className='upload-pfp-btn
                '
          >
            Загрузить аватар
          </Button>
        </Flex>
        <Typography.Text className='profile__content__title'>Как к Вам обращаться?</Typography.Text>
        <Form
          name='sign-up'
          className='sign-up__form'
          size='large'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={profileForm}
        >
          <Form.Item name='firstName' rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input placeholder='Имя' readOnly={!isEditMode} />
          </Form.Item>
          <Form.Item name='lastName' rules={[{ required: true, message: 'Введите фамилию!' }]}>
            <Input placeholder='Фамилия' readOnly={!isEditMode} />
          </Form.Item>
          <Form.Item
            name='dateOfBirth'
            rules={[{ required: true, message: 'Выберите дату рождения!' }]}
          >
            <DatePicker
              placeholder='Дата рождения'
              className='sign-up__datepicker'
              inputReadOnly={!isEditMode}
              allowClear={isEditMode}
              open={isEditMode ? undefined : false}
              format={'DD.MM.YYYY'}
            />
          </Form.Item>
          <Form.Item name='phone'>
            <div>
              <div className={`phone-input-wrap ${error ? 'error' : ''}`}>
                <AntPhone
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  error={error}
                  readonly={!isEditMode}
                />
              </div>
              {error && (
                <Typography.Text type='danger' className='sign-up__error-text'>
                  Неправильно введен номер!
                </Typography.Text>
              )}
            </div>
          </Form.Item>
          {isEditMode ? (
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                className='sign-up__next-btn'
                block
                onClick={() => setError(!isValid)}
              >
                Сохранить
              </Button>
            </Form.Item>
          ) : (
            <Button type='primary' className='sign-up__next-btn' block onClick={handleSubmitClick}>
              Редактировать
            </Button>
          )}
        </Form>
      </Flex>
      <Flex vertical className='qr-code-bonus-wrap'>
        <div className='qr-code-wrap'>
          <img src={QrCode} alt='qr-code' />
        </div>
        <Flex className='bonus-amount-wrap'>
          <Typography.Text className='bonus-amount'>250</Typography.Text>
          <Typography.Text className='bonus-amount-text'>
            Накопленных <br /> баллов
          </Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
