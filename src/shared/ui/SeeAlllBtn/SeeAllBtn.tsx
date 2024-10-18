import { Button } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  onClick?: () => void;
  path?: string;
}

export const SeeAllBtn: React.FC<Props> = ({ text, path }) => {
  return (
    <Link to={path || '/'}>
      <Button type='primary' className='seeAllBtn'>
        {text}
      </Button>
    </Link>
  );
};
