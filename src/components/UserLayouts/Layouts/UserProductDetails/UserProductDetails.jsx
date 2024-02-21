import React, { useEffect, useState } from 'react'
import UserHeader from '../../Commen/UserHader/UserHeader'
import './UserProductDetails.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../../../Redux/Slices/Product.Slice'
import { addToCart } from '../../../../Redux/Slices/User.Slice'
import Cookies from 'js-cookie'
const UserProductDetails = () => {
    const { productById } = useSelector((state) => state.product);
    console.log(productById);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = Cookies.get('userId');
    const productId = location.state.productId;
    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        dispatch(getProductById(productId))
    }, [dispatch, productId]);
    const handleAddToCart = (productId) => {
        if (addedToCart) {
            dispatch(addToCart({ userId, productId, quantity: 1 }));
            setAddedToCart((prev) => ({ ...prev, [productId]: true }))
        }
    };
    const handleAddedCart = () => {
        navigate('/user/category/product/cart')
    }

    return (
        <div className='PageSection'>
            <div className='container'>
                <div className='MainHeading'>
                    <UserHeader />
                </div>
                <div className='productsDetails'>
                    <div className='productsSection'>
                        <div className='productsImageSection'>
                            {productById && productById.images && productById.images.length > 0 && (
                                <div className='productsImg'>
                                    <img src={`http://localhost:5001/${productById.images[0]}`} alt="" />
                                </div>
                            )}
                        </div>
                        <div className='productsContentSection'>
                            <h3>{productById.name}</h3>
                            <span>${productById.price}</span>
                            <span>{productById.description}</span>
                            <div className='productAction'>
                                {!addedToCart[productById._id] ? (
                                    <button
                                        className='productCartBtn'
                                        onClick={() => handleAddToCart(productById._id)}
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <button className='productCartBtn' onClick={() => handleAddedCart()} >
                                        Added to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProductDetails