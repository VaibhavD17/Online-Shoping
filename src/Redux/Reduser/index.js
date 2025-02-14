import { combineReducers } from "@reduxjs/toolkit";
import categorieSlice from "../Slice/Categorie.slice";
import subcategorieSlice from "../Slice/Subcategorie.slice"
import ProductsSlice from "../Slice/Products.slice"
import CartSlice from "../Slice/Cart.slice"
import CouponSlice from "../Slice/Coupon.slice"
import CheckoutSlise from '../Slice/Checkout.slice'
import FavoriteSlice from '../Slice/Favorite.slice'

export const rootReducer = combineReducers({
    categories: categorieSlice,
    subCategories: subcategorieSlice,
    products: ProductsSlice,
    cart:CartSlice,
    coupon:CouponSlice,
    checkout:CheckoutSlise,
    favorite:FavoriteSlice
})