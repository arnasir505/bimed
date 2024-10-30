import { Flex, Typography } from 'antd';
import './style.css';
import { useAppSelector } from 'shared/config';
import { selectFavoriteItems } from 'entities/user';
import { ProductCard } from 'widgets/product-card';
import { useEffect, useState } from 'react';
import { Empty } from 'shared/ui';

export const ProfileFavorites = () => {
  const favorites = useAppSelector(selectFavoriteItems);
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState(true);

  useEffect(() => {
    if (!favorites) {
      return;
    }
    if (favorites.length > 0) {
      setIsFavoritesEmpty(false);
    }
  }, [favorites]);

  return (
    <Flex vertical className='favorites'>
      {isFavoritesEmpty ? (
        <Empty title='Избранное' text='В избранном пока пусто' btnText='На главную' />
      ) : (
        <>
          <Typography.Title level={4} className='favorites__title'>
            Избранное
          </Typography.Title>
          <div className='favorites__wrapper'>
            {favorites?.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </>
      )}
    </Flex>
  );
};
