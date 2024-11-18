import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

interface Props {
  text: string;
  onClick?: () => void;
  path?: string;
}

export const SeeAllBtn: React.FC<Props> = ({ text, path }) => {
  return (
    <Link to={path || '/'}>
      <Button size='large' type='primary' className='seeAllBtn'>
        {text}
      </Button>
    </Link>
  );
};
