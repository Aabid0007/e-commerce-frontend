import React, { useEffect } from 'react'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import AdminHeader from '../AdminHeader/AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../../../../Redux/Slices/Admin.Slice'

const AdminCustomers = () => {
    const { Customers } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch]);

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
                                    <h2>Customers</h2>
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
                                                    <th>Customer ID</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>phone</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Customers?.map((customer,index) => (
                                                    <tr key={customer._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{customer._id}</td>
                                                        <td>{customer.username}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.phone}</td>
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

export default AdminCustomers