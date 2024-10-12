import { Button, Flex, Typography } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './style.css';
import { Product } from 'types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Flex
      vertical
      key={product.id}
      className='product-card'
      align='center'
      justify='space-between'
      gap={10}
    >
      <div className='product-card__img-wrapper'>
        <img src={product.img || ''} alt={product.name} />
      </div>
      <Typography.Text className='product-card__name'>{product.name}</Typography.Text>
      {product.isPrescriptionRequired && (
        <Typography.Text className='product-card__prescriptionRequired'>
          По рецепту врача
        </Typography.Text>
      )}
      {product.newPrice && (
        <Typography.Text disabled className='product-card__oldPrice'>
          {product.oldPrice} <span>c</span>
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
          {product.newPrice || product.oldPrice} c
        </Button>
      </Flex>
    </Flex>
  );
};
