import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    contact: [],
    error: null
}

export const getContact = createAsyncThunk(
    'contact/getContact',
    async () => {
        try {
            const response = await axios.get(BASC_URL + 'contact')

            return response.data;
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const addContact = createAsyncThunk(
    'contact/addContact',
    async (data) => {
        try {
            const response = await axios.post(BASC_URL + 'contact', data)
            return response.data;

        } catch (error) {
            console.log(error);

        }
    }
)

const ContactSlice = createSlice({
    name: 'contact',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getContact.fulfilled, (state, action) =>{
            state.contact = action.payload;
        })
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.contact = state.contact.concat(action.payload)
        })
    }
})

export default ContactSlice.reducer;