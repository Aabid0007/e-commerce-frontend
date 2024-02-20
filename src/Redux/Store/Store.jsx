import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../Slices/Category.Slice";
import ProductSlice from "../Slices/Product.Slice";
import AdminSlice from "../Slices/Admin.Slice";
import UserSlice from "../Slices/User.Slice";

 const store = configureStore({
    reducer: {
        admin: AdminSlice,
        category: CategorySlice,
        product: ProductSlice,
        user: UserSlice,
    },
})

export default store;