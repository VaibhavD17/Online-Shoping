import { combineReducers } from "@reduxjs/toolkit";
import categorieSlice from "../Slice/Categorie.slice";
import subcategorieSlice from "../Slice/Subcategorie.slice"
import ProductsSlice from "../Slice/Products.slice"

export const rootReducer = combineReducers({
    categories: categorieSlice,
    subCategories: subcategorieSlice,
    products: ProductsSlice
})