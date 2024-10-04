import { Container } from '@shared/ui';
import { Button, Flex, Typography } from 'antd';

const HeaderTop = () => {
  return (
    <Container>
      <Flex justify='space-between' align='center'>
        <Flex gap='24px'>
          <Link>О нас</Link>
          <Link>Помощь</Link>
          <Link>Филиалы</Link>
          <Link>Контакты</Link>
        </Flex>
        <Flex align='center' gap='40px'>
          <Text>
            <Text disabled>Тел:</Text> +996 555 55 55 55
          </Text>
          <Link>Оптовые цены</Link>
          <Link>Розничные цены</Link>
          <Button type='primary'>Обратная связь</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

const { Link, Text } = Typography;

export default HeaderTop;
