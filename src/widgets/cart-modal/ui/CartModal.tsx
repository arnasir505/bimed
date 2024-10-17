import { Button, Empty, Flex, Input, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { inputToCart, minusOneFromCart, plusOneToCart, selectCartItems } from 'entities/cart';
import { useEffect, useState } from 'react';
import { products } from 'data/products';
import { Product } from 'types';
import './style.css';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';

interface ProductInCart {
  product: Product;
  quantity: number;
}

interface Props {
  open: boolean;
  closeModal: () => void;
}

export const CartModal: React.FC<Props> = ({ open, closeModal }) => {
  const dispatch = useAppDispatch();
  const cartItemsIDs = useAppSelector(selectCartItems);
  const [cartItems, setCartItems] = useState<ProductInCart[]>([]);

  useEffect(() => {
    setCartItems(() => {
      const newCartItems: ProductInCart[] = [];
      for (let i = 0; i < cartItemsIDs.length; i++) {
        const cartItemID = cartItemsIDs[i];
        const foundItem = products.find((item) => item.id === cartItemID.product_id);
        if (foundItem) {
          newCartItems.push({ product: foundItem, quantity: cartItemID.quantity });
        }
      }
      return newCartItems;
    });
  }, [cartItemsIDs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      dispatch(inputToCart({ product_id: id, quantity: Number(e.target.value) }));
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
    const totalPrice = cartItems.reduce((acc, cur) => {
      return (acc += (cur.product.newPrice || cur.product.oldPrice) * cur.quantity);
    }, 0);
    modalContent = (
      <>
        {cartItems.map(({ product, quantity }) => (
          <Flex key={product.id} className='cart-item'>
            <div className='cart-item__img-wrap'>
              <img src={product.img || ''} alt='' />
            </div>
            <Flex vertical gap='5px' className='cart-item__content'>
              <Typography.Text className='cart-item__name'>{product.name}</Typography.Text>
              <Flex>
                <Typography.Text className='cart-item__price-for-one'>
                  Цена за шт {product.newPrice || product.oldPrice}
                </Typography.Text>
                <Typography.Text className='cart-item__price-for-one-total'>
                  {(product.newPrice || product.oldPrice) * quantity} сом
                </Typography.Text>
              </Flex>
              <Flex gap='5px' className='product-card__quantity-wrap cart-item__quantity'>
                <Button
                  icon={<MinusOutlined style={{ color: '#032D80' }} />}
                  className='product-card__btn product-card__minusOne'
                  onClick={() => dispatch(minusOneFromCart(product.id))}
                />
                <Input
                  className='product-card__quantity'
                  type='text'
                  maxLength={3}
                  value={quantity}
                  onChange={(e) => handleChange(e, product.id)}
                />
                <Button
                  icon={<PlusOutlined style={{ color: '#fff' }} />}
                  className='product-card__btn product-card__addOne'
                  onClick={() => dispatch(plusOneToCart(product.id))}
                />
              </Flex>
            </Flex>
          </Flex>
        ))}
        <Flex vertical gap='8px'>
          <Flex gap='8px'>
            <Typography.Text className='cart-modal__totals'>Товаров в корзине:</Typography.Text>
            <Typography.Text className='cart-modal__totals-value'>
              {cartItems.length}
            </Typography.Text>
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
