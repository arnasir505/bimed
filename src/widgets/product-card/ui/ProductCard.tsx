import { Button, Flex, Input, Typography } from 'antd';
import {
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Product } from 'types';
import { useAppDispatch, useAppSelector } from 'shared/config';
import {
  addToCart,
  inputToCart,
  minusOneFromCart,
  plusOneToCart,
  selectCartItems,
} from 'entities/cart';
import productNoImage from 'assets/images/product-no-image.png';
import { Link } from 'react-router-dom';
import './style.css';
import { selectFavoriteItems, toggleItemInFavorites } from 'entities/favorites';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const favorites = useAppSelector(selectFavoriteItems);
  const foundItemInCart = cart.find((item) => item.product.id === product.id);
  const foundItemInFavorites = favorites.find((item) => item.id === product.id);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      dispatch(inputToCart({ product: product, quantity: Number(e.target.value) }));
    }
  };

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
        <img src={product.img ? `/${product.img}` : productNoImage} alt={product.name} />
      </div>
      <Link className='product-card__link' to={`/products/${product.id}`}>
        <Typography.Text className='product-card__name'>{product.name}</Typography.Text>
      </Link>
      {product.isPrescriptionRequired && (
        <Typography.Text className='product-card__prescriptionRequired'>
          По рецепту врача
        </Typography.Text>
      )}
      {product.newPrice && (
        <Typography.Text className='product-card__oldPrice'>
          {product.oldPrice} <span>c</span>
        </Typography.Text>
      )}
      <Flex className='product-card__buttons'>
        <Button
          icon={
            foundItemInFavorites ? (
              <HeartFilled style={{ color: '#E31B4B', fontSize: '22px' }} />
            ) : (
              <HeartOutlined style={{ color: '#E31B4B', fontSize: '22px' }} />
            )
          }
          onClick={() => dispatch(toggleItemInFavorites(product))}
          className='product-card__btn product-card__addToFavorite'
        />
        {foundItemInCart ? (
          <Flex gap='8px' justify='flex-end' className='product-card__quantity-wrap'>
            <Button
              icon={<MinusOutlined style={{ color: '#032D80' }} />}
              className='product-card__btn product-card__minusOne'
              onClick={() => dispatch(minusOneFromCart(product))}
            />
            <Input
              className='product-card__quantity'
              type='text'
              maxLength={3}
              value={foundItemInCart.quantity}
              onChange={handleChange}
            />
            <Button
              icon={<PlusOutlined style={{ color: '#fff' }} />}
              className='product-card__btn product-card__addOne'
              onClick={() => dispatch(plusOneToCart(product))}
            />
          </Flex>
        ) : (
          <Button
            icon={
              <ShoppingCartOutlined
                style={{ color: product.isAvailable ? '#1D9F22' : '#8b96b1', fontSize: '22px' }}
              />
            }
            className={`product-card__btn product-card__addToCart ${product.isAvailable ? '' : 'not-available'}`}
            onClick={() => dispatch(addToCart(product))}
            disabled={!product.isAvailable}
          >
            {product.newPrice || product.oldPrice} c
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
