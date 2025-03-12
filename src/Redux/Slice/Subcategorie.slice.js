import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";

const initialState = {
    isLoading: false,
    subCategories: [],
    error: null
}

export const getSubCategories = createAsyncThunk(
    'subCategories/getSubCategories',
    async () => {
        try {
            const response = await axios.get(BASC_URL + 'subCategories')
            return response.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const addSubCategories = createAsyncThunk(
    'subCategories/addSubCategories',
    async (data) => {
        try {
            const response = await axios.post(BASC_URL + 'subCategories', data)
            return response.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteSubCategories = createAsyncThunk(
    'subCategories/deleteSubCategories',
    async (id) => {
        try {
            const response = await axios.delete(BASC_URL + `subCategories/` + id)
            return response.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateSubcategories = createAsyncThunk(
    'subCategories/updateSubcategories',
    async (data) => {
        try {
            const response = await axios.put(BASC_URL + 'subCategories/' + data.id, data)
            return response.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateSubcategorieStatus = createAsyncThunk(
    'subCategories/updateSubcategorieStatus',
    async (data) => {
        try {

            if (data.status === 'panding') {

                const response = await axios.put(BASC_URL + 'subCategories/' + data.id, { ...data, status: 'active' })

                return response.data

            } else if (data.status === 'active') {

                const response = await axios.put(BASC_URL + 'subCategories/' + data.id, { ...data, status: 'panding' })

                return response.data
            }


        } catch (error) {
            console.log(error);

        }
    }
)

const subcategorieSlice = createSlice({
    name: 'subCategories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubCategories.fulfilled, (state, action) => {
            state.subCategories = action.payload;
        })
        builder.addCase(addSubCategories.fulfilled, (state, action) => {
            state.subCategories = state.subCategories.concat(action.payload)
        })
        builder.addCase(deleteSubCategories.fulfilled, (state, action) => {
            state.subCategories = state.subCategories.filter((v) => v.id != action.payload.id)
        })
        builder.addCase(updateSubcategories.fulfilled, (state, action) => {
            state.subCategories = state.subCategories.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
        builder.addCase(updateSubcategorieStatus.fulfilled, (state, action) => {
            state.subCategories = state.subCategories.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
    }
})

export default subcategorieSlice.reducer;