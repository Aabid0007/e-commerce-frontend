import React from 'react'
import './UserMainLayouts.css'
import UserCategory from '../UserCategory/UserCategory';
import UserHeader from '../../Commen/UserHader/UserHeader';

const UserMainLayouts = () => {

    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='MainHeading'>
                    <UserHeader />
                </div>
                <div>
                    <UserCategory />
                </div>
            </div>
        </div>
    )
}

export default UserMainLayouts