import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

export const getCoupon = createAsyncThunk(
    'coupon/getCoupon',
    async () => {
        try {
            const responce = await axios.get(BASC_URL + 'coupon')
            return responce.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async (data) => {
        try {
            const responce = await axios.post(BASC_URL + 'coupon', data)
            return responce.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/deleteCoupon',
    async (id) => {
        try {
            const responce = await axios.delete(BASC_URL + 'coupon/'+id)
            return responce.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async (data) => {
        try {
            const responce = await axios.put(BASC_URL + 'coupon/'+data.id, data)
            return responce.data
        } catch (error) {
            console.log(error);

        }
    }
)

const CouponSlice = createSlice({
    name: 'coupon',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload;
        })
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.concat(action.payload)
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id != action.payload.id)
        })
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default CouponSlice.reducer;