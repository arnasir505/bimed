import {
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Flex, Typography, Button, Input, message } from 'antd';
import { deleteFromCart, inputToCart, minusOneFromCart, plusOneToCart } from 'entities/cart';
import './style.css';
import { CartItem as ICartItem, Product } from 'types';
import { useAppDispatch, useAppSelector } from 'shared/config';
import {
  selectIsUserLoggedIn,
  selectFavoriteItems,
  selectUser,
  toggleItemInFavorites,
} from 'entities/user';

interface Props {
  item: ICartItem;
}

export const CartItem: React.FC<Props> = ({ item: { product, quantity } }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const favorites = useAppSelector(selectFavoriteItems);
  const foundItemInFavorites = favorites?.find((item) => item.id === product.id);
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 2 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      dispatch(inputToCart({ product: product, quantity: Number(e.target.value) }));
    }
  };

  const handleAddToFavorites = () => {
    if (!(user && isLoggedIn)) {
      messageApi.info({ content: 'Войдите, чтобы добавить товар в избранное' });
    }
    dispatch(toggleItemInFavorites(product));
  };

  return (
    <Flex key={product.id} className='cart-item'>
      {contextHolder}
      <div className='cart-item__img-wrap'>
        <img
          src={
            product.img
              ? `/${product.img}`
              : `${import.meta.env.BASE_URL}static/images/product-no-image.png`
          }
          alt=''
        />
      </div>
      <Flex vertical className='cart-item__content'>
        <Typography.Text className='cart-item__name'>{product.name}</Typography.Text>
        <Flex vertical gap={'12px'}>
          {product.newPrice ? (
            <Flex gap={'10px'}>
              <Typography.Text className='product-card__oldPrice'>
                {product.oldPrice} <span>c</span>
              </Typography.Text>
              <Typography.Text className='cart-item__price'>
                {product.newPrice} <span>c</span>
              </Typography.Text>
            </Flex>
          ) : (
            <Typography.Text className='cart-item__price'>
              {product.oldPrice} <span>c</span>
            </Typography.Text>
          )}
          <Flex className='cart-item__buttons'>
            <Button
              icon={<DeleteOutlined style={{ color: '#6E7AA5', fontSize: '22px' }} />}
              className='product-card__btn cart-item__deleteFromCart'
              onClick={() => dispatch(deleteFromCart(product))}
            />
            <Button
              icon={
                foundItemInFavorites && isLoggedIn ? (
                  <HeartFilled style={{ color: '#E31B4B', fontSize: '22px' }} />
                ) : (
                  <HeartOutlined style={{ color: '#E31B4B', fontSize: '22px' }} />
                )
              }
              onClick={handleAddToFavorites}
              className='product-card__btn product-card__addToFavorite'
            />
            <Flex className='product-card__quantity-wrap'>
              <Button
                icon={<MinusOutlined style={{ color: '#032D80' }} />}
                className='product-card__btn product-card__minusOne'
                onClick={() => dispatch(minusOneFromCart(product))}
              />
              <Input
                className='product-card__quantity'
                type='text'
                maxLength={3}
                value={quantity}
                onChange={(e) => handleChange(e, product)}
              />
              <Button
                icon={<PlusOutlined style={{ color: '#fff' }} />}
                className='product-card__btn product-card__addOne'
                onClick={() => dispatch(plusOneToCart(product))}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
