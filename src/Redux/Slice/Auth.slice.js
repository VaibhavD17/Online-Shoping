import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/basicURL";


const initialState = {
    isLoading: false,
    auth: [],
    error: null
}

export const addRegistration = createAsyncThunk(
    'auth/addRegistration',
    async (data) => {
        try {
            const response = await axios.post(BASC_URL + 'auth', data)

            return response.data
        } catch (error) {
            console.log(error);

        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        try {
            const response = await axios.get(BASC_URL + 'auth')
            const fData = response.data


            const user = fData.find((v) => v.email === data.values.email && v.password === data.values.password)

            console.log(user);

            if (user) {
                data.navigate('/#')
                alert("Login Success")

                return user
            } else {
                return alert("Email or Password dose not match")
            }


        } catch (error) {
            console.log(error);

        }
    }
)

export const updateStatus = createAsyncThunk(
    'auth/updateStatus',
    async (data) => {
        try {
            const response = await axios.get(BASC_URL + 'auth')
            const fData = response.data

            const userIndex = fData.findIndex((v) => v.email === data.forgotEmail)

            console.log(data);

            console.log(fData);

            console.log(userIndex);




            if (userIndex !== -1) {
                const userData = {
                    ...fData[userIndex],
                    isActive: data.isActive
                }

                await axios.put(`${BASC_URL}auth/${userData.id}`, userData)
                alert('Registration Successful')
                return userData;
            }


        } catch (error) {
            alert('User not found');
            return null
        }
    }
)

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (data) => {
        try {
            const response = await axios.get(BASC_URL + 'auth')
            const fData = response.data

            const userIndex = fData.findIndex((v) => v.email === data.forgotEmail)


            if (userIndex !== -1) {
                const updateUser = {
                    ...fData[userIndex],
                    password: data.password,
                    confirm_password: data.confirm_password
                }

                await axios.put(`${BASC_URL}auth/${updateUser.id}`, updateUser)
                alert('Password updated successfully');
                return updateUser;

            } else {
                alert('User not found');
                return null
            }


            console.log(data);
            console.log(fData);


        } catch (error) {
            console.log(error);

        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        return null
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addRegistration.fulfilled, (state, action) => {
            state.auth = state?.auth?.concat(action.payload)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.auth = action.payload
        })
        builder.addCase(updateStatus.fulfilled, (state, action) => {
            state.auth = state?.auth?.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.auth = state?.auth?.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.auth = action.payload
        })
    }
})


export default AuthSlice.reducer