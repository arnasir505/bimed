import { Button } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
}

export const SeeAllBtn: React.FC<Props> = ({ text }) => {
  return (
    <Link to={'/'}>
      <Button type='primary' className='seeAllBtn'>
        {text}
      </Button>
    </Link>
  );
};
