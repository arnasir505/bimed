import { Button, Flex, Typography } from 'antd';
import './style.css';

interface Props {
  title: string;
  icon: React.ReactNode;
  btnText: string;
  onClick: () => void;
}

export const Result: React.FC<Props> = ({ title, icon, btnText, onClick }) => {
  return (
    <Flex vertical className='order__result-content'>
      {icon}
      <Typography.Text className='order__result-content-text'>{title}</Typography.Text>
      <Button type='primary' size='large' block onClick={onClick}>
        {btnText}
      </Button>
    </Flex>
  );
};
