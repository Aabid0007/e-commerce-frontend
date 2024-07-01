import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, updateCategoryId } from '../../../../Redux/Slices/Product.Slice'
import AddProduct from './AddProduct/AddProduct'
import DeleteProduct from './DeleteProduct/DeleteProduct'
import EditProduct from './EditProduct/EditProduct'
import { getCategories } from '../../../../Redux/Slices/Category.Slice'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import AdminHeader from '../AdminHeader/AdminHeader'
import { useNavigate } from 'react-router-dom'
import "./AdminProduct.css"

const AdminProduct = () => {
  const { product, loading, error, categoryId } = useSelector((state) => state.product);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productId, setProductId] = useState('');
  const { category } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ categoryId, searchQuery }));
  }, [dispatch, categoryId, searchQuery]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    dispatch(updateCategoryId(categoryId));
  };
  const handleProductDetails = (productId) => {
    navigate('/admin/product-details', { state: { productId } })
  };
  const handleEditModalOpen = (productId) => {
    setEditModal(true);
    setProductId(productId);
  }
  const handleDeleteModalOpen = (productId) => {
    setDeleteModal(true);
    setProductId(productId);
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
                  <h2>Products</h2>
                  <button className='addBtn product' onClick={() => setAddModal(true)}>Create new</button>
                </div>
                <div className='ProductSection'>
                  <div className='CardHeader'>
                    <input type="text" placeholder='Search...' />
                    <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}  >
                      <option value=''>All category</option>
                      {category && category.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='productDetails'>
                    {!loading && product && product.length === 0  && (
                      <div className="noData">No products available </div>
                    )}
                    {product[0] && product?.map((products) => (
                      <div className='productCard' key={products._id} >
                        <div className='productCardImg' onClick={() => handleProductDetails(products._id)} >
                          <img src={`http://localhost:5001/${products.images[0]}`} alt="" />
                        </div>
                        <div className='cardContent'>
                          <h3>{products.name}</h3>
                          <p>{products.description}</p>
                          <div className='price'>${products.price}</div>
                          <div className='productAction'>
                            <button className='productBtn edit' onClick={() => handleEditModalOpen(products._id)} >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className='productBtn delete' onClick={() => handleDeleteModalOpen(products._id)}>
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {
                    addModal && <AddProduct closeModal={() => setAddModal(false)} />
                  }
                  {
                    editModal && <EditProduct editModalClose={() => setEditModal(false)} productId={productId} />
                  }
                  {
                    deleteModal && <DeleteProduct deleteModalClose={() => setDeleteModal(false)} productId={productId} />
                  }
                  {
                    loading && <div className="loading"> Loading ... </div>
                  }
                  {
                    error && <div className="error"> {error} </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProduct