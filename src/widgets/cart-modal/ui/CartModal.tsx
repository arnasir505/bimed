import { Button, Empty, Flex, Input, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/config';
import {
  getCartTotalItems,
  getCartTotalPrice,
  inputToCart,
  minusOneFromCart,
  plusOneToCart,
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from 'entities/cart';
import { useEffect } from 'react';
import { Product } from 'types';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import productNoImage from 'assets/images/product-no-image.png';
import './style.css';

interface Props {
  open: boolean;
  closeModal: () => void;
}

export const CartModal: React.FC<Props> = ({ open, closeModal }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartItemsTotalPrice);
  const totalItems = useAppSelector(selectCartItemsTotal);

  useEffect(() => {
    dispatch(getCartTotalPrice());
    dispatch(getCartTotalItems());
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, product: Product) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      dispatch(inputToCart({ product: product, quantity: Number(e.target.value) }));
    }
  };

  let modalContent = (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description='В корзине пока нет товаров'
      style={{ minWidth: '396px' }}
    />
  );

  if (cartItems.length > 0) {
    modalContent = (
      <>
        {cartItems.map(({ product, quantity }) => (
          <Flex key={product.id} className='cart-item'>
            <div className='cart-item__img-wrap'>
              <img src={product.img ? `/${product.img}` : productNoImage} alt='' />
            </div>
            <Flex vertical className='cart-item__content'>
              <Typography.Text>{product.name}</Typography.Text>
              <Flex>
                <Typography.Text className='cart-item__price-for-one'>
                  Цена за шт {product.newPrice || product.oldPrice}
                </Typography.Text>
                <Typography.Text className='cart-item__price-for-one-total'>
                  {(product.newPrice || product.oldPrice) * quantity} сом
                </Typography.Text>
              </Flex>
              <Flex className='product-card__quantity-wrap cart-item__quantity'>
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
        ))}
        <Flex vertical className='cart-modal__totals-wrap'>
          <Flex gap='8px'>
            <Typography.Text className='cart-modal__totals'>Товаров в корзине:</Typography.Text>
            <Typography.Text className='cart-modal__totals-value'>{totalItems}</Typography.Text>
          </Flex>
          <Flex gap='8px'>
            <Typography.Text className='cart-modal__totals'>Общая сумма:</Typography.Text>
            <Typography.Text className='cart-modal__totals-value'>
              {totalPrice}
              сом
            </Typography.Text>
          </Flex>
          <Button
            type='primary'
            icon={<ShoppingCartOutlined style={{ fontSize: '20px' }} />}
            className='cart-modal__navigate-to-cart'
          >
            Перейти в корзину
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Modal
      className='cart-modal'
      open={open}
      onCancel={closeModal}
      onClose={closeModal}
      mask={false}
      closeIcon={null}
      footer={null}
      width='fit-content'
    >
      <Typography.Title level={3} className='cart-modal__title'>
        В корзине
      </Typography.Title>
      {modalContent}
    </Modal>
  );
};
