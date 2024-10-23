import { Container } from 'shared/ui';
import { useEffect, useState } from 'react';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Button, Flex, Image, Input, Typography } from 'antd';
import { products } from 'data/products';
import { useAppDispatch, useAppSelector } from 'shared/config';
import { NotFound } from 'pages/404';
import { Link, useParams } from 'react-router-dom';
import productNoImage from 'assets/images/product-no-image.png';
import {
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  selectCartItems,
  inputToCart,
  minusOneFromCart,
  plusOneToCart,
  addToCart,
} from 'entities/cart';
import { ProductCard } from 'widgets/product-card';
import './styles.css';

export const ProductInfo = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [ellipsis, setEllipsis] = useState(true);
  const product = products.find((item) => item.id === params.id);
  if (!product) {
    return <NotFound />;
  }
  const cart = useAppSelector(selectCartItems);
  const foundItem = cart.find((item) => item.product.id === product.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      dispatch(inputToCart({ product: product, quantity: Number(e.target.value) }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <>
      <header className='header'>
        <Container>
          <Header />
        </Container>
      </header>
      <main className='main'>
        <Container>
          <Flex gap='44px' className='product-info-wrap'>
            <Flex vertical gap='30px'>
              <Flex vertical justify='center' align='center' className='product-img_wrap'>
                <Image preview={false} src={product.img ? `/${product.img}` : productNoImage} />
              </Flex>
              <Flex className='product__info-instructions-wrap' gap='8px'>
                <Typography.Text className='product__extra-info active'>
                  Информация о товаре
                </Typography.Text>
                <Typography.Text className='product__instructions'>Инструкция</Typography.Text>
              </Flex>
              <Flex vertical gap='12px'>
                <Typography.Text className='product__characteristic-title'>
                  Характеристики
                </Typography.Text>
                <Typography.Text>
                  <span className='product__characteristic'>Страна производителя:</span>
                  {product.country}
                </Typography.Text>
                <Typography.Text>
                  <span className='product__characteristic'>Производитель:</span>
                  {product.manufacturer}
                </Typography.Text>
                <Typography.Text>
                  <span className='product__characteristic'>Бренд:</span>
                  {product.brand}
                </Typography.Text>
                <Typography.Text>
                  <span className='product__characteristic'>Форма выпуска:</span>
                  {product.formOfRelease}
                </Typography.Text>
                <Typography.Text className='product__keep-out-of-children'>
                  Беречь от детей
                </Typography.Text>
              </Flex>
            </Flex>
            <Flex vertical gap='24px' className='product__info'>
              <Typography.Title level={4} className='product__title'>
                {product.name}
              </Typography.Title>
              <Flex vertical gap='6px'>
                <Typography.Text className='product__when-to-use'>Показания</Typography.Text>
                <Typography.Text className='product__when-to-use-text'>
                  {product.whenToUse}
                </Typography.Text>
              </Flex>
              {product.isPrescriptionRequired && (
                <>
                  <Typography.Text className='product__prescription'>
                    Данный товар имеет строгую рецептуру. Вы можете его приобрести, придя в один из
                    наших филиалов. С собой необходимо иметь паспорт и рецепт от врача
                  </Typography.Text>
                  <Typography.Text className='product__prescription-required'>
                    По рецепту врача
                  </Typography.Text>
                </>
              )}
              {product.newPrice && (
                <Typography.Text className='product__oldPrice'>
                  {product.oldPrice} <span>c</span>
                </Typography.Text>
              )}
              <Flex className='product__buttons'>
                <Button
                  icon={<HeartOutlined style={{ color: '#E31B4B', fontSize: '25px' }} />}
                  className='product__btn product__addToFavorite'
                />
                {foundItem ? (
                  <Flex gap='8px' justify='flex-end' className='product__quantity-wrap'>
                    <Button
                      icon={<MinusOutlined style={{ color: '#032D80' }} />}
                      className='product__btn product__minusOne'
                      onClick={() => dispatch(minusOneFromCart(product))}
                    />
                    <Input
                      className='product__quantity'
                      type='text'
                      maxLength={3}
                      value={foundItem.quantity}
                      onChange={handleChange}
                    />
                    <Button
                      icon={<PlusOutlined style={{ color: '#fff' }} />}
                      className='product__btn product__addOne'
                      onClick={() => dispatch(plusOneToCart(product))}
                    />
                  </Flex>
                ) : (
                  <Button
                    icon={
                      <ShoppingCartOutlined
                        style={{
                          color: product.isAvailable ? '#1D9F22' : '#8b96b1',
                          fontSize: '22px',
                        }}
                      />
                    }
                    className={`product__btn product__addToCart ${product.isAvailable ? '' : 'not-available'}`}
                    onClick={() => dispatch(addToCart(product))}
                    disabled={!product.isAvailable}
                  >
                    {product.newPrice || product.oldPrice} c
                  </Button>
                )}
              </Flex>
              <Flex vertical gap='8px'>
                <Typography.Text className='product__share'>Поделиться</Typography.Text>
                <Flex gap='16px' className='product__share-buttons'>
                  <Link to={'/'} className='product__share-btn vk' />
                  <Link to={'/'} className='product__share-btn facebook' />
                  <Link to={'/'} className='product__share-btn odnoklassniki' />
                  <Link to={'/'} className='product__share-btn instagram' />
                  <Link to={'/'} className='product__share-btn whatsapp' />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical className='product__composition'>
            <Typography.Text className='product__composition-title'>Состав</Typography.Text>
            <Typography.Paragraph ellipsis={ellipsis ? { rows: 2 } : false}>
              {product.composition}
            </Typography.Paragraph>
            {ellipsis && (
              <Typography.Text
                className='product__composition-show-all'
                onClick={() => setEllipsis(false)}
              >
                Развернуть
              </Typography.Text>
            )}
          </Flex>
        </Container>
        <section className='other-products'>
          <Container>
            <Typography.Title level={3}>С этим товаром покупают</Typography.Title>
            <div className='other-products__wrapper'>
              {[...products].slice(0, 5).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            <Typography.Title level={3} className='similar-products'>
              Похожие товары
            </Typography.Title>
            <div className='other-products__wrapper'>
              {[...products].slice(0, 5).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <footer className='footer'>
        <Container>
          <Footer />
        </Container>
      </footer>
    </>
  );
};