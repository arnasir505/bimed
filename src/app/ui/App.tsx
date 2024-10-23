import { Home } from 'pages/home';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import { Catalog } from 'pages/catalog';
import { ProductInfo } from 'pages/product-info';
import { NotFound } from 'pages/404';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/products/:id' element={<ProductInfo />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
