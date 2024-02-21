import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import "./AdminMainLayouts.css"
import AdminCategory from '../AdminCategory/AdminCategory'

const AdminMainLayouts = () => {

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
                            <AdminCategory />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMainLayouts