import React, { useEffect } from 'react'
import './UserOrdersDetails.css'
import UserHeader from '../../Commen/UserHader/UserHeader'
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../../../Redux/Slices/User.Slice';
import Cookies from 'js-cookie';

const UserOrdersDetails = () => {
    const userId = Cookies.get('userId');
    const { UserOrders } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrder(userId));
    },[dispatch,userId])

    console.log(UserOrders);

    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='MainHeading'>
                    <UserHeader />
                </div>
            </div>
        </div>
    )
}

export default UserOrdersDetails