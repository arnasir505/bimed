import { useAppSelector } from 'shared/config';
import './style.css';
import { Empty } from 'shared/ui';
import { selectOrderHistory } from 'entities/user';
import { Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import productNoImage from 'assets/images/product-no-image.png';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const ProfileOrderHistory = () => {
  const orderHistory = useAppSelector(selectOrderHistory);
  if (!orderHistory) return;

  const [itemsToShow, setItemsToShow] = useState<string[]>([]);

  const onShowAllClick = (id: string) => {
    if (itemsToShow.includes(id)) {
      setItemsToShow((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setItemsToShow((prev) => [...prev, id]);
    }
  };

  return orderHistory.length > 0 ? (
    <Flex vertical className='order-history-wrap'>
      <Flex className='order-history__content'>
        <Typography.Title level={4}>История заказов</Typography.Title>
      </Flex>
      {orderHistory.map((order) => {
        let orderStatus: string | null;
        const orderDate =
          String(dayjs(order.date).locale('ru').format('MMMM D YYYY HH:mm'))
            .charAt(0)
            .toUpperCase() +
          String(dayjs(order.date).locale('ru').format('MMMM D YYYY HH:mm')).slice(1);
        switch (order.status) {
          case 'accepted':
            orderStatus = 'Принят';
            break;
          case 'delivered':
            orderStatus = 'Доставлен';
            break;
          default:
            orderStatus = null;
            break;
        }
        return (
          <Flex className='order-history__content' key={order.id} vertical>
            <Flex gap={'20px'}>
              <Typography.Text className='order-history__id'>ID {order.id}</Typography.Text>
              <Typography.Text className='order-history__date'>{orderDate}</Typography.Text>
            </Flex>
            <Flex className='order-history__items'>
              <Flex vertical className='order-history__cart-items'>
                {order.items
                  .slice(0, itemsToShow.includes(order.id) ? undefined : 1)
                  .map(({ product, quantity }) => (
                    <Flex key={product.id} className='cart-item'>
                      <div className='cart-item__img-wrap order-history-item__img-wrap'>
                        <img src={product.img ? `/${product.img}` : productNoImage} alt='' />
                      </div>
                      <Flex vertical className='cart-item__content order-history-item__content'>
                        <Typography.Text className='cart-item__name'>
                          {product.name}
                        </Typography.Text>
                        <Flex vertical gap={'8px'}>
                          <Flex className='cart-total__info'>
                            <Typography.Text className='cart-total__info-text'>
                              Цена:
                            </Typography.Text>
                            {product.newPrice ? (
                              <Flex gap={'10px'}>
                                <Typography.Text className='product-card__oldPrice'>
                                  {product.oldPrice} <span>c</span>
                                </Typography.Text>
                                <Typography.Text className='cart-item__price order-history-item__price'>
                                  {product.newPrice} <span>c</span>
                                </Typography.Text>
                              </Flex>
                            ) : (
                              <Typography.Text className='cart-item__price order-history-item__price'>
                                {product.oldPrice} <span>c</span>
                              </Typography.Text>
                            )}
                          </Flex>
                          <Flex className='cart-total__info'>
                            <Typography.Text className='cart-total__info-text'>
                              Количество:
                            </Typography.Text>
                            <Typography.Text className='order-history-item__quantity'>
                              {quantity}
                            </Typography.Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
              </Flex>
              <div className='order-history__total'>
                <Flex vertical gap={'20px'}>
                  <Typography.Title level={4} className='cart-total__title'>
                    Итого
                  </Typography.Title>
                  <Flex vertical gap={'8px'}>
                    <Flex className='cart-total__info'>
                      <Typography.Text className='cart-total__info-text'>
                        Статус заказа:
                      </Typography.Text>
                      <Typography.Text className='order-history__order-info order-history__order-status'>
                        {orderStatus}
                      </Typography.Text>
                    </Flex>
                    <Flex className='cart-total__info'>
                      <Typography.Text className='cart-total__info-text'>
                        Товаров в корзине:
                      </Typography.Text>
                      <Typography.Text className='order-history__order-info'>
                        {order.totalItems}
                      </Typography.Text>
                    </Flex>
                    <Flex className='cart-total__info'>
                      <Typography.Text className='cart-total__info-text'>
                        Общая сумма:
                      </Typography.Text>
                      <Typography.Text className='order-history__order-info'>
                        {order.totalPrice} c
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </Flex>
            <Flex justify='center'>
              {order.items.length > 1 && (
                <Button
                  size='large'
                  iconPosition='end'
                  icon={
                    itemsToShow.includes(order.id) ? (
                      <ArrowUpOutlined style={{ color: '#054EDB' }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: '#054EDB' }} />
                    )
                  }
                  onClick={() => onShowAllClick(order.id)}
                >
                  {itemsToShow.includes(order.id) ? 'Свернуть' : 'Подробнее'}
                </Button>
              )}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  ) : (
    <Empty title='История заказов' text='История заказов пуста' btnText='На главную' />
  );
};
