import Icon from '@ant-design/icons';
import { Button, type GetProps } from 'antd';
import './style.css';

type CustomIconComponentProps = GetProps<typeof Icon>;

interface Props {
  onClick: () => void;
}

export const MenuBtn: React.FC<Props> = ({ onClick }) => {
  return <Button onClick={onClick} icon={<HamburgerIcon />} className='menu-btn' />;
};

const HamburgerSvg = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='#054EDB' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21 17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17C3 16.4477 3.44772 16 4 16H20C20.5523 16 21 16.4477 21 17ZM21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12ZM21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7Z'
      fill='#054EDB'
    />
  </svg>
);

const HamburgerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HamburgerSvg} {...props} />
);
