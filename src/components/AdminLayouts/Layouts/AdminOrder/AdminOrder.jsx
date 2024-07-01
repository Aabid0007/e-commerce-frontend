import React, { useEffect } from 'react'
import './AdminOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../../../Redux/Slices/Admin.Slice';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminHeader from '../AdminHeader/AdminHeader';
const AdminOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

    const handleOrderClick = (orderId) => {
        navigate('/admin/user-order', { state: { orderId } })
    }

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
                            <div className='produtcPage'>
                                <div className='productHeading'>
                                    <h2>Orders</h2>
                                </div>
                                <div className='ProductSection'>
                                    <div className='CardHeader'>
                                        <input type="text" placeholder='Search...' />
                                    </div>
                                    <div className='AdminOrderDetails'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sl.No</th>
                                                    <th>Order ID</th>
                                                    <th>Email</th>
                                                    <th>Total</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders && orders?.map((order, index) => (
                                                    <tr key={order._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{order._id}</td>
                                                        <td>{order.customerEmail}</td>
                                                        <td>{`$${order.totalAmount}`}</td>
                                                        <td>{formatDate(order.orderDate)}</td>
                                                        <td ><span className='AdminOrderStatus'>{order.orderStatus}</span></td>
                                                        <td className='AdminOrderTable' onClick={() => handleOrderClick(order._id)}>
                                                            <i className="fa-solid fa-eye"></i>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default AdminOrder