import { Button, Flex, Typography } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './style.css';
import { Product } from 'types';

interface Props {
  item: Product;
}

export const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <Flex
      vertical
      key={item.id}
      className='product-card'
      align='center'
      justify='space-between'
      gap={10}
    >
      <div className='product-card__img-wrapper'>
        <img src={item.img || ''} alt={item.name} />
      </div>
      <Typography.Text className='product-card__name'>{item.name}</Typography.Text>
      {item.isPrescriptionRequired && (
        <Typography.Text className='product-card__prescriptionRequired'>
          По рецепту врача
        </Typography.Text>
      )}
      {item.newPrice && (
        <Typography.Text className='product-card__oldPrice'>
          {item.oldPrice} <span>c</span>
        </Typography.Text>
      )}
      <Flex className='product-card__buttons'>
        <Button
          icon={<HeartOutlined style={{ color: '#E31B4B', fontSize: '22px' }} />}
          className='product-card__addToFavorite'
        />
        <Button
          icon={<ShoppingCartOutlined style={{ color: '#1D9F22', fontSize: '22px' }} />}
          className='product-card__addToCart'
        >
          {item.newPrice || item.oldPrice} c
        </Button>
      </Flex>
    </Flex>
  );
};
