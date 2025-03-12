import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const responce = await axios.get(BASC_URL + 'products')
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const addProducts = createAsyncThunk(
    'products/addProducts',
    async (data) => {
        try {
            const responce = await axios.post(BASC_URL + 'products', data)
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteProducts = createAsyncThunk(
    'products/deleteProducts',
    async (id) => {
        try {
            const responce = await axios.delete(BASC_URL + 'products/' + id)
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateProducts = createAsyncThunk(
    'products/updateProducts',
    async (data) => {
        try {
            const responce = await axios.put(BASC_URL + 'products/' + data.id, data)
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateProductStatus = createAsyncThunk(
    'products/updateStatus',
    async (data) => {
        try {
            if (data.status === 'panding') {
                const response = await axios.put(BASC_URL + 'products/' + data.id, { ...data, status: 'active' })

                return response.data

            } else if (data.status === 'active') {
                const response = await axios.put(BASC_URL + 'products/' + data.id, { ...data, status: 'panding' })

                return response.data
            }


        } catch (error) {
            console.log(error);

        }
    }
)

const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(addProducts.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload);
        })
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.products = state.products.filter((v) => v.id != action.payload.id)
        })
        builder.addCase(updateProducts.fulfilled, (state, action) => {
            state.products = state.products.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
        builder.addCase(updateProductStatus.fulfilled, (state, action) => {
            state.products = state.products.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export default ProductsSlice.reducer;