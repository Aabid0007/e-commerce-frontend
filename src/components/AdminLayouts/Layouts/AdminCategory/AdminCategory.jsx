import React, { useEffect, useState } from 'react'
import "./AdminCategory.css"
import AddCategory from './AddCategory/AddCategory'
import EditCategory from './EditCategory/EditCategory';
import DeleteCategory from './DeleteCategory/DeleteCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../Redux/Slices/Category.Slice';
import { useNavigate } from 'react-router-dom';

const AdminCategory = () => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.category);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    const handleCategoryImageClick = (categoryId) => {
        navigate('/admin/category/product', { state: { categoryId } });
    };

    const handleCategoryEditModal = (categoryId) => {
        setCategoryId(categoryId);
        setEditModal(true);
    };

    const handleCategoryDeleteModal = (categoryId) => {
        setCategoryId(categoryId);
        setDeleteModal(true);
    };

    return (
        <div className='categoryPage'>
            <div className='contentHeading'>
                <h3>Categories</h3>
            </div>
            <div className='addContactBtn'>
                <button className='addBtn' onClick={() => setAddModal(true)}><span className="material-symbols-outlined"> add
                </span><h4>Add Category</h4></button>
            </div>
            <div className='page_content_section_table'>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Sl.No
                            </th>
                            <th>
                                Icon
                            </th>
                            <th>
                                Category
                            </th>

                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category[0] && category?.map((categories, index) => (
                            <tr key={categories._id}>
                                <td>{index + 1}</td>
                                <td className='categoryImg' onClick={() => handleCategoryImageClick(categories._id)} >
                                    <div className='profile'>
                                        <img src={`http://localhost:5001/${categories.images}`} alt="" />
                                    </div>
                                </td>
                                <td>{categories.name}</td>
                                <td>
                                    <div className='contact_action'>
                                        <button className="contact_btn edit_btn" onClick={() => handleCategoryEditModal(categories._id)} >
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className="contact_btn delete_btn" onClick={() => handleCategoryDeleteModal(categories._id)}>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                loading && <div className="loading"> Loading ... </div>
            }
            {
                error && <div className="error"> {error} </div>
            }
            {addModal && <AddCategory closeModal={() => { setAddModal(false) }} />}
            {editModal && <EditCategory editModalClose={() => { setEditModal(false) }} categoryId={categoryId} />}
            {deleteModal && <DeleteCategory deleteModalClose={() => { setDeleteModal(false) }} categoryId={categoryId} />}
        </div>
    )
}

export default AdminCategory