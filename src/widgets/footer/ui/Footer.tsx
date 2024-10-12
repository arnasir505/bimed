import { Col, Flex, List, Row, Typography } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <Row>
      <Col span={6}>
        <Typography.Text className='footer__title'>Покупателям</Typography.Text>
        <List className='footer__links'>
          <Link to={'/'} className='footer__link'>
            Как сделать заказ
          </Link>
          <Link to={'/'} className='footer__link'>
            Способы оплаты
          </Link>
          <Link to={'/'} className='footer__link'>
            Доставка
          </Link>
          <Link to={'/'} className='footer__link'>
            Возврат товара
          </Link>
          <Link to={'/'} className='footer__link'>
            Вопросы и ответы
          </Link>
        </List>
      </Col>
      <Col span={6}>
        <Typography.Text className='footer__title'>Компания</Typography.Text>
        <List className='footer__links'>
          <Link to={'/'} className='footer__link'>
            О нас
          </Link>
          <Link to={'/'} className='footer__link'>
            Контакты
          </Link>
        </List>
      </Col>
      <Col span={6}>
        <Typography.Text className='footer__title'>Мы в соц сетях</Typography.Text>
        <List className='footer__links'>
          <Link to={'/'} className='footer__link footer__link_icon vk'>
            Вконтакте
          </Link>
          <Link to={'/'} className='footer__link footer__link_icon facebook'>
            Facebook
          </Link>
          <Link to={'/'} className='footer__link footer__link_icon odnoklassniki'>
            Одноклассники
          </Link>
          <Link to={'/'} className='footer__link footer__link_icon instagram'>
            Instagram
          </Link>
        </List>
      </Col>
      <Col span={6}>
        <Typography.Text className='footer__title'>Свяжитесь с нами</Typography.Text>
        <List className='footer__links'>
          <Link to={'/'} className='footer__link footer__link_icon mail'>
            mail@bimed.kg
          </Link>
          <Link to={'/'} className='footer__link footer__link_icon phone'>
            +996 555 55 55 55
          </Link>
          <Flex gap='25px'>
            <Link to={'/'} className='app-marketplace app-store-link' />
            <Link to={'/'} className='app-marketplace google-play-link' />
          </Flex>
        </List>
      </Col>
    </Row>
  );
};
