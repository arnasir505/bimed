import { products } from 'data/products';
import './style.css';

export const ProductCard = () => {
  return (
    <div className='wrapper'>
      {products.map((item) => (
        <div key={item.id} className='product-card'>
          <div>
            <img src={item.img || ''} alt='' style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>{item.name}</div>
          <div>{item.oldPrice}</div>
          <div>{item.newPrice}</div>
        </div>
      ))}
    </div>
  );
};
