import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    checkout: [],
    error: null
}

export const getBilling = createAsyncThunk(
    'checkout/getBilling',
    async () => {
        try {
            const responce = await axios.get(BASC_URL + "order_list")
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const addBilling = createAsyncThunk(
    'checkout/addBilling',
    async (data) => {
        try {
            const responce = await axios.post(BASC_URL + "order_list", data)
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateBilling = createAsyncThunk(
    'checkout/updateBilling',
    async (data) => {
        try {
            const responce = await axios.put(BASC_URL + "order_list/" + data.id, data)
            return responce.data;
        } catch (error) {
            console.log(error);

        }
    }
)

export const cancelOrder = createAsyncThunk(
    'checkout/cancelOrder',
    async (id) => {
        try {
            const responce = await axios.delete(BASC_URL + "order_list/" + id)
            return responce.data

        } catch (error) {
            console.log(error);

        }
    }
)


const CheckoutSlise = createSlice({
    name: 'checkout',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBilling.fulfilled, (state, action) => {
            state.checkout = action.payload
        })
        builder.addCase(addBilling.fulfilled, (state, action) => {
            state.checkout = state.checkout.concat(action.payload)
        })
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.checkout = state.checkout.filter((v) => v.id != action.payload.id)
        })
        builder.addCase(updateBilling.fulfilled, (state, action) => {
            state.checkout = state?.checkout?.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export default CheckoutSlise.reducer;