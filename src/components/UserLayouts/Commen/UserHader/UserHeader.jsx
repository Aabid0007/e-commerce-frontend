import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts, userLogout } from '../../../../Redux/Slices/User.Slice';
import './UserHeader.css'
import { getProducts, updateCategoryId } from '../../../../Redux/Slices/Product.Slice';
import image from "../../../../assets/e-commerce-logo.png";

const UserHeader = () => {
  const { totalQuantity } = useSelector((state) => state.user);
  const { categoryId } = useSelector((state) => state.product);
  const userId = Cookies.get('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate('/user');
    dispatch(updateCategoryId(''));
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/user/login');
  };

  useEffect(() => {
    if (userId) {
      dispatch(getAllCarts(userId));
    }
  }, [dispatch, userId]);


  const handleOrdersDetails = () => {
    navigate('/user/orders');
  };

  const handleAddedCart = () => {
    navigate('/user/category/product/cart');
  };

  useEffect(() => {
    if (categoryId !== '') {
      dispatch(getProducts({ categoryId }));
    }
  }, [dispatch, categoryId]);

  const handleSearchChange = (e) => {
    const newSearchQuery = e.target.value;
    dispatch(getProducts({ categoryId, searchQuery: newSearchQuery, }));
  };


  return (
    <header>
      <div className='container'>
        <div className='MainHeading'>
          <div className='Header_Section'>
            <div className='Heading'>
              <div className='headerList'>
                <ul>
                  <li><img className='headerLogo' onClick={() => handleItemClick()} src={image} alt="" /></li>
                  <li>Home</li>
                  <li onClick={() => handleItemClick()}>Categories</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className='searchBox'>
                <input className='searchInput' type="search" placeholder='Search...' onChange={handleSearchChange} />
              </div>
              <div className='yourOrders' onClick={() => { handleOrdersDetails() }}>Orders</div>
              <div className='productCart' onClick={() => { handleAddedCart() }}>
                <span className="material-symbols-outlined"> shopping_bag </span>
                <span className='CartValue'>{totalQuantity ? totalQuantity : 0}</span>
              </div>
              <div className='Logout'>
                <button className='logoutBtn' onClick={handleLogout}>{`${userId ? "Logout" : "Login"}`}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default UserHeader