import { Button, Card, Flex, Typography } from 'antd';
import './style.css';
import { Branch } from 'types';
import { BranchesOutlined } from '@ant-design/icons';

interface Props {
  branch: Branch;
}

export const BranchesCard: React.FC<Props> = ({ branch }) => {
  return (
    <div className='branch-card__wrap'>
      <Card
        cover={<img src={branch.img ? `/${branch.img}` : ''} />}
        bordered
        className='branch-card'
      >
        <Flex vertical>
          <Typography.Text className='branch-card__title'>{branch.title}</Typography.Text>
          <Typography.Text className='branch-card__label'>Адрес:</Typography.Text>
          <Typography.Text className='branch-card__text'>{branch.address}</Typography.Text>
          <Flex className='branch-card__working-hours'>
            <Typography.Text className='branch-card__label'>График работы:</Typography.Text>
            <Typography.Text className='branch-card__text'>{branch.workingHours}</Typography.Text>
          </Flex>
          <Typography.Text className='branch-card__label'>Номер телефона:</Typography.Text>
          {branch.phoneNumbers.map((phone, index) => (
            <Typography.Text key={index} className='branch-card__text'>
              {phone}
            </Typography.Text>
          ))}
          <Button
            icon={<BranchesOutlined style={{ color: '#054EDB' }} />}
            size='large'
            className='show-on-map-btn'
          >
            Показать на карте
          </Button>
        </Flex>
      </Card>
      {branch.isOpen ? (
        <Typography.Text className='branch-card__badge branch-open'>Открыто</Typography.Text>
      ) : (
        <Typography.Text className='branch-card__badge branch-closed'>Закрыто</Typography.Text>
      )}
    </div>
  );
};
