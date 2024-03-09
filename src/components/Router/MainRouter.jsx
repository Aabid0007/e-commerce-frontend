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
import AdminProduct from '../AdminLayouts/Layouts/AdminProduct/AdminProduct';
import AdminOrder from '../AdminLayouts/Layouts/AdminOrder/AdminOrder';
import AdminCustomers from '../AdminLayouts/Layouts/AdminCustomers/AdminCustomers';
import UserProductDetails from '../UserLayouts/Layouts/UserProductDetails/UserProductDetails';
import AdminCustomerDetails from '../AdminLayouts/Layouts/AdminCustomerDetails/AdminCustomerDetails';
import AdminProductDetails from '../AdminLayouts/Layouts/AdminProductDetails/AdminProductDetails';

const MainRouter = () => {
  const { token } = useSelector((state) => state.admin);
  const { userId } = useSelector((state) => state.user);
console.log(userId);
  const isLoggedIn = () => {
    const adminToken = Cookies.get('adminToken');
    if (!adminToken && !token) {
      return false;
    }
    return true;
  };
  
  const isUserLoggedIn = () => {
    const userToken = Cookies.get('userToken');
    if (!userToken && !userId) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={isLoggedIn() ? <AdminMainLayouts /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/category/product' element={isLoggedIn() ? <CategoryProductList /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/product'element={isLoggedIn() ? < AdminProduct /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/order' element={isLoggedIn() ? <AdminOrder /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/user-order' element={isLoggedIn() ? <UserOrder /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/customers' element={isLoggedIn() ? <AdminCustomers /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/customers-details' element={isLoggedIn() ? <AdminCustomerDetails /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/product-details' element={<AdminProductDetails />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user' element={<UserMainLayouts /> } />
        <Route path='/user/category/product' element={<UserCategoryList /> } />
        <Route path='/user/category/product-details' element={<UserProductDetails />} />
        <Route path='/user/category/product/cart' element={ isUserLoggedIn() ? <UserCart /> : <Navigate to='/user/login' />} />
        <Route path='/user/orders' element={ isUserLoggedIn() ? <UserOrdersDetails /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/user/category/product/order-details' element={ isUserLoggedIn() ? <OrderDetails /> : <Navigate to='/user/login' />} />
      </Routes>
    </>
  );
};

export default MainRouter;
