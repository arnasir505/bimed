import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

interface Props {
  variant?: 'filled';
}

export const SocialShare: React.FC<Props> = ({ variant }) => {
  return (
    <Flex className='social__share-buttons'>
      <Link to={'/'} className={`social__share-btn vk ${variant}`} />
      <Link to={'/'} className={`social__share-btn facebook ${variant}`} />
      <Link to={'/'} className={`social__share-btn odnoklassniki ${variant}`} />
      <Link to={'/'} className={`social__share-btn instagram ${variant}`} />
      <Link to={'/'} className={`social__share-btn whatsapp ${variant}`} />
    </Flex>
  );
};
