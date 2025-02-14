import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    favorite: [],
    error: null
}

const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addtoFavorite: (state, action) => {
            const pid = action.payload.id

            const index = state?.favorite?.findIndex((v)=> v === pid)

            if (index === -1) {
                state.favorite.push(pid)
            } else {
                state.favorite = state.favorite.filter((v) => v!= pid)
            }

        }
    }
})

export const { addtoFavorite } = FavoriteSlice.actions

export default FavoriteSlice.reducer;