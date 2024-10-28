import { Home } from 'pages/home';
import { Route, Routes } from 'react-router-dom';
import { Catalog } from 'pages/catalog';
import { ProductInfo } from 'pages/product-info';
import { NotFound } from 'pages/404';
import { SignIn } from 'pages/sign-in';
import { SignUp } from 'pages/sign-up';
import './style.css';
import { PhoneVerification } from 'pages/phone-verification';
import { Profile } from 'pages/profile';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/products/:id' element={<ProductInfo />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/phone-verification' element={<PhoneVerification />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
