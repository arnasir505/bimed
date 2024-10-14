import { Button, Flex, Input, Typography } from 'antd';
import {
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import './style.css';
import { Product } from 'types';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { addToCart, selectCartItems } from 'entities/cart';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);

  const foundItem = cart.find((item) => item.product_id === product.id);
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
          className='product-card__btn product-card__addToFavorite'
        />
        {foundItem ? (
          <Flex gap='8px' justify='flex-end'>
            <Button
              icon={<MinusOutlined style={{ color: '#032D80' }} />}
              className='product-card__btn product-card__minusOne'
            />
            <Input className='product-card__quantity' type='text' value={foundItem.quantity} />
            <Button
              icon={<PlusOutlined style={{ color: '#fff' }} />}
              className='product-card__btn product-card__addOne'
            />
          </Flex>
        ) : (
          <Button
            icon={<ShoppingCartOutlined style={{ color: '#1D9F22', fontSize: '22px' }} />}
            className='product-card__btn product-card__addToCart'
            onClick={() => dispatch(addToCart(product.id))}
          >
            {product.newPrice || product.oldPrice} c
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
