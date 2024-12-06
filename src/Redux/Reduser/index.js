import { combineReducers } from "@reduxjs/toolkit";
import categorieSlice from "../Slice/Categorie.slice"

export const rootReducer = combineReducers({
    categories: categorieSlice
})