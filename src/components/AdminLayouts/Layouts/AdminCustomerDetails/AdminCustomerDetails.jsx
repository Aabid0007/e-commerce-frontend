import React, { useEffect } from 'react'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import AdminHeader from '../AdminHeader/AdminHeader'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrder } from '../../../../Redux/Slices/User.Slice'
import './AdminCustomerDetails.css'

const AdminCustomerDetails = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const dispatch = useDispatch();
    const { UserOrders } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserOrder(userId));
    }, [dispatch, userId])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };
    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='Main_Heading'>
                    <AdminHeader />
                </div>
            </div>
            <div className='PageSection'>
                <div className='container'>
                    <div className="pageContent">
                        <div className='adminSideBar'>
                            <AdminSideBar />
                        </div>
                        <div className='tableBody'>
                            <div className='ProductSection'>
                                <div className='AdminCustomerInfo'>
                                    <span className='customerId'>Customer ID: {UserOrders[0]?.userId}</span>
                                    <span className='customerId'>Customer Email: {UserOrders[0]?.customerEmail}</span>
                                    </div>
                                  {UserOrders && UserOrders?.map((order) => (
                                    <div className='AdminCustomerDetails' key={order._id}>
                                       <div className='customerInfoDetails'>
                                       <span>Order ID: {order._id}</span>
                                        <span>Order Date: {formatDate(order.orderDate)}</span>
                                        <span>Order Status: {order.orderStatus}</span>
                                       </div>

                                      <table>
                                      <thead>
                                          <tr>
                                              <th>Sl.No</th>
                                              <th>Product</th>
                                              <th>Quantity</th>
                                              <th>Price</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {order.products.map((customer, index) => (
                                              <tr key={customer._id}>
                                                  <td>{index + 1}</td>
                                                  <td> <div className='productBox'>
                                                      <img className='productImg' src={`http://localhost:5001/${customer.product[0]?.images[0]}`} alt="" />
                                                      {customer.product[0]?.name}
                                                  </div></td>
                                                  <td>{customer.quantity}</td>
                                                  <td>${customer.product[0]?.price}</td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                                  </div>
                                  ))}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCustomerDetails