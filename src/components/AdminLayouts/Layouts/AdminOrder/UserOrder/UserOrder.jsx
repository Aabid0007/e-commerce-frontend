import React, { useEffect } from 'react'
import "./UserOrder.css"
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../../../Redux/Slices/Admin.Slice';
import AdminSideBar from '../../AdminSideBar/AdminSideBar';
import AdminHeader from '../../AdminHeader/AdminHeader';

const UserOrder = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orderId = location.state.orderId;
    const { orderById } = useSelector((state) => state.admin);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);

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
                        <div className='pageBody'>

                            <div className='productPage'>
                                <div className='productHeading'>
                                    <h2>Order Details</h2>
                                </div>
                                <div className='orderSection'>
                                    <div className='orderHeader'>
                                        <div className='orderSubHead'>
                                            <div className='orderDate'>
                                                <span className="material-symbols-outlined">
                                                    calendar_month
                                                </span>
                                               <h4 className='OrderInfo'> {formatDate(orderById.orderDate)}</h4>
                                            </div>
                                            <span className='OrderInfo'>
                                                Order ID: {orderById._id}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='ordersDetails'>
                                        <div className='userOrderDetails'>
                                            <div className='orderinfo'>
                                                <div className='customerInfoIcon'>
                                                    <i className="fa-solid fa-user"></i>
                                                </div>
                                                <div className='orderInfoContent'>
                                                    <span>Customer</span>
                                                    <div>{orderById.customerEmail}</div>
                                                    <div>{orderById.userId}</div>
                                                </div>

                                            </div>
                                            <div className='orderinfo'>
                                                <div className='orderInfoIcon'>
                                                    <i className="fa-solid fa-truck"></i>
                                                </div>
                                                <div className='orderInfoContent'>
                                                    <span> Order info</span>
                                                    <div className='shippingAddress'> Shipping:{orderById.shippingAddress?.city}
                                                        <span> {orderById.shippingAddress?.country}</span>
                                                        <span>{orderById.shippingAddress?.line1}</span>
                                                        <span>{orderById.shippingAddress?.line2} {orderById.shippingAddress?.state} {orderById.shippingAddress?.postal_code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orderinfo'>
                                                <div className='customerInfoIcon'>
                                                    <i className="fa-solid fa-location-dot"></i>
                                                </div>
                                                <div className='orderInfoContent'>
                                                    <span>Deliver to</span>
                                                    <div className='shippingAddress'>Address: {orderById.billingAddress?.city}
                                                        <span> {orderById.billingAddress?.country}</span>
                                                        <span> {orderById.billingAddress?.line1}</span>
                                                        <span> {orderById.billingAddress?.line2} {orderById.billingAddress?.state} {orderById.billingAddress?.postal_code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='orderDetailsTable'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Unit Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderById.products?.map((order) => (
                                                        <tr key={order._id}>
                                                            <td>
                                                                <div className='productBox'>
                                                                    <img className='productImg' src={`http://localhost:5001/${order.product[0]?.images[0]}`} alt="" />
                                                                    {order.product[0]?.name}
                                                                </div>
                                                            </td>
                                                            <td>${order.product[0]?.price}</td>
                                                            <td>{order.quantity}</td>
                                                            <td>${order.quantity * order.product[0].price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className='orderedProductTotal'>
                                                <span> Subtotal: ${orderById.totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOrder