import React from 'react'
import './UserMainLayouts.css'
import UserCategory from '../UserCategory/UserCategory';
import UserHeader from '../../Commen/UserHader/UserHeader';
import MainBanner from '../MainBanner/MainBanner';

const UserMainLayouts = () => {

    return (
        <div className='MainPage'>
            <UserHeader />
            <>
                <MainBanner />
                <UserCategory />
            </>
        </div>
    )
}

export default UserMainLayouts