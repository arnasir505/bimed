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
import { ProfileInfo } from 'widgets/profile-info';
import { ProfileFavorites } from 'widgets/profile-favorites';
import { Promotions } from 'pages/promotions';
import { News } from 'pages/news';
import { NewsFull } from 'pages/news-full';
import { Branches } from 'pages/branches';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/promotions' element={<Promotions />} />
      <Route path='/products/:id' element={<ProductInfo />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/phone-verification' element={<PhoneVerification />} />
      <Route path='/news' element={<News />} />
      <Route path='/news/:id' element={<NewsFull />} />
      <Route path='/branches' element={<Branches />} />
      <Route path='/profile' element={<Profile />}>
        <Route path='' element={<ProfileInfo />} />
        <Route path='favorites' element={<ProfileFavorites />} />
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
