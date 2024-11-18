import { Flex, Typography } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  text: string;
  btnText: string;
}

export const Empty: React.FC<Props> = ({ title, text, btnText }) => {
  return (
    <Flex vertical className='empty-wrap'>
      <Typography.Title level={4} className='empty__title'>
        {title}
      </Typography.Title>
      <Flex vertical className='empty__return-home'>
        <Typography.Text className='empty__text'>{text}</Typography.Text>
        <Link to='/'>
          <Typography.Text className='not-found__return-home'>{btnText}</Typography.Text>
        </Link>
      </Flex>
    </Flex>
  );
};
