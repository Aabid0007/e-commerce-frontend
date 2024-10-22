import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import AdminHeader from '../AdminHeader/AdminHeader';
import { getProductById } from '../../../../Redux/Slices/Product.Slice';
import { useDispatch, useSelector } from 'react-redux';

const AdminProductDetails = () => {
    const location = useLocation();
    const productId = location.state.productId;
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const dispatch = useDispatch();
    const { productById } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProductById(productId));
    }, [dispatch, productId]);


    const handleThumbnailClick = (index) => {
        setMainImageIndex(index);
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
                            <div className='productsDetails'>
                                <div className='productsImages'> {productById && productById.images?.map((image, index) => (
                                    <img key={index} src={`http://localhost:5001/${image}`} onClick={() => handleThumbnailClick(index)} alt='' />
                                ))}</div>
                                <div className='productsSection'>
                                    <div className='productsImageSection'>
                                        {productById && productById.images && productById.images.length > 0 && (
                                            <div className='productsImg'>
                                                <img src={`http://localhost:5001/${productById.images[mainImageIndex]}`} alt="" />
                                            </div>
                                        )}
                                    </div>
                                    <div className='productsContentSection'>
                                        <h3>{productById.name}</h3>
                                        <span>${productById.price}</span>
                                        <span>{productById.description}</span>
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

export default AdminProductDetails