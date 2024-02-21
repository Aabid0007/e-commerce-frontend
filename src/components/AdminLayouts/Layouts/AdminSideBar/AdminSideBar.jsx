import React from 'react'
import "./AdminSideBar.css"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../Redux/Slices/Admin.Slice';
import { updateCategoryId } from '../../../../Redux/Slices/Product.Slice';

const AdminSideBar = () => {
  const { token } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = () => {
    dispatch(updateCategoryId(""))
    navigate('/admin/product')
  }
  

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('adminToken',token);
    navigate('/admin/login');
  };

  return (
    <div className='sideBarSection'>
      <ul>
        <li onClick={() =>  navigate('/admin')}><i className="icon fas fa-list"></i>Categories</li>
        <li onClick={() => handleProductClick()}><i className='icon fas fa-shopping-bag'></i>Products</li>
        <li onClick={() => navigate('/admin/order')}><i className='icon fas fa-shopping-bag'></i>Orders</li>
        <li onClick={() => navigate('/admin/customers')}><i className="icon fas fa-user"></i>Customers</li>
        <button className='LogoutBtn' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</button>
      </ul>
    </div>
  )
}

export default AdminSideBar