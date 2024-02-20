import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminMainLayouts from '../AdminLayouts/Layouts/AdminMainLayouts/AdminMainLayouts';
import AdminLogin from '../AdminLayouts/Layouts/AdminLogin/AdminLogin';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import CategoryProductList from '../AdminLayouts/Layouts/AdminCategory/CategoryProductList/CategoryProductList';
import UserRegister from '../UserLayouts/Layouts/UserRegister/UserRegister';
import UserLogin from '../UserLayouts/Layouts/UserLogin/UserLogin';
import UserMainLayouts from '../UserLayouts/Layouts/UserMainLayouts/UserMainLayouts';
import UserCategoryList from '../UserLayouts/Layouts/UserCategoryList/UserCategoryList';
import UserCart from '../UserLayouts/Layouts/UserCart/UserCart';
import CheckoutSuccess from '../UserLayouts/Layouts/CheckoutSuccess/CheckoutSuccess';
import OrderDetails from '../UserLayouts/Layouts/OrderDetails/OrderDetails';
import UserOrder from '../AdminLayouts/Layouts/AdminOrder/UserOrder/UserOrder';
import UserOrdersDetails from '../UserLayouts/Layouts/UserOrdersDetails/UserOrdersDetails';
const MainRouter = () => {
  const { token } = useSelector((state) => state.admin);
  const { Token } = useSelector((state) => state.user);

  const isLoggedIn = () => {

    const adminToken = Cookies.get('adminToken');
    if (!adminToken && !token) {
      return false;
    }
    return true;
  };
  const isLoggedInUser = () => {
    const userToken = Cookies.get('userToken');
    if (!userToken && !Token) {
      return false;
    }
    return true;
  };


  return (
    <>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={isLoggedIn() ? <AdminMainLayouts /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/category/product' element={<CategoryProductList />} />
        <Route path='/admin/user-order' element={<UserOrder />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user' element={isLoggedInUser() ? <UserMainLayouts /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product' element={isLoggedInUser() ? <UserCategoryList /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product/cart' element={isLoggedInUser() ? <UserCart /> : <Navigate to='/user/login' />} />
        <Route path='/user/orders' element={isLoggedInUser() ? <UserOrdersDetails /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/user/category/product/order-details' element={<OrderDetails />} />
      </Routes>
    </>
  );
};

export default MainRouter;
