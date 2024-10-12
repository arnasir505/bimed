interface PromotionProduct {
  id: string;
  img: string;
  discountPercentage: number;
}

export const promotions: PromotionProduct[] = [
  {
    id: '101',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 55,
  },
  {
    id: '102',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 70,
  },
  {
    id: '103',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 25,
  },
];
