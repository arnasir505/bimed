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
  {
    id: '104',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 30,
  },
  {
    id: '105',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 40,
  },
  {
    id: '106',
    img: 'src/assets/images/promotions-carousel-img.png',
    discountPercentage: 10,
  },
];
