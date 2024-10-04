import { Container } from '@shared/ui';
import { Button, Flex, Typography } from 'antd';

const HeaderTop = () => {
  return (
    <Container>
      <Flex gap={'24px'}>
        <Text>О нас</Text>
        <Text>Помощь</Text>
        <Text>Филиалы</Text>
        <Text>Контакты</Text>
      </Flex>
      <Text>Тел: +996 555 55 55 55</Text>
      <Text>Оптовые цены</Text>
      <Text>Розничные цены</Text>
      <Button type='primary'>Обратная связь</Button>
    </Container>
  );
};

const { Text } = Typography;

export default HeaderTop;
