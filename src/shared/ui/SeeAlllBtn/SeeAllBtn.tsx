import { Button } from 'antd';
import './style.css';

interface Props {
  text: string;
}

export const SeeAllBtn: React.FC<Props> = ({ text }) => {
  return (
    <Button type='primary' className='seeAllBtn'>
      {text}
    </Button>
  );
};
