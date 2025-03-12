import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const response = await axios.get(BASC_URL + 'categories')
            return response.data;

        } catch (error) {
            console.log(error);

        }
    }

)

export const addCategories = createAsyncThunk(
    'categories/addCategories',
    async (data) => {
        try {
            const response = await axios.post(BASC_URL + 'categories', data)
            return response.data;

        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteCategories = createAsyncThunk (
    'categories/deleteCategories',
    async (id) => {
        try {
            const response = await axios.delete(BASC_URL + 'categories/'+ id)
            
            return response.data;

        } catch (error) {
            console.log(error);
            
        }
    }
)

export const updateCategories = createAsyncThunk(
    'categories/updateCategories',
    async (data) => {
        try {
            const response = await axios.put(BASC_URL + 'categories/'+ data.id, data)
            return response.data;
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const updateCategorieStatus = createAsyncThunk(
    'categories/updateCategorieStatus',
    async (data) => {
        try {
            if (data.status === 'panding') {
                const response = await axios.put(BASC_URL + 'categories/'+ data.id, {...data, status:'active'})
                return response.data;
            } else if (data.status === 'active') {
                const response = await axios.put(BASC_URL + 'categories/'+ data.id, {...data, status:'panding'})
                return response.data;
            }
           
        } catch (error) {
            console.log(error);
            
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(addCategories.fulfilled, (state, action) => {
            state.categories = state.categories.concat(action.payload);
        })
        builder.addCase(deleteCategories.fulfilled, (state, action)=>{
            state.categories = state.categories.filter((v) => v.id != action.payload.id)
        })
        builder.addCase(updateCategories.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
        builder.addCase(updateCategorieStatus.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default categoriesSlice.reducer;