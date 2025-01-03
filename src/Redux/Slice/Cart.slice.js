import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const pid = action.payload.id;
            const amount = action.payload.price

            const index = state.cart.findIndex((v) => v.pid === pid)


            if (index === -1) {
                state.cart.push({ pid, amount: amount, qty: 1 })
            } else {
                state.cart[index].qty++
            }
        },
        increment: (state, action) => {
            const pid = action.payload

            const index = state.cart.findIndex((v) => v.pid === pid)

            state.cart[index].qty++;
        },
        decrement: (state, action) => {
            const pid = action.payload

            const index = state.cart.findIndex((v) => v.pid === pid);

            if (state.cart[index].qty > 1) {
                state.cart[index].qty--;
            }
        },
        deleteCart:(state, action) => {
           const pid = action.payload;

           const index = state.cart.findIndex((v) => v.pid === pid)

           const fData = state.cart.filter((v) => v.pid != pid)

           state.cart = fData

        }

    }
})

export const { addtoCart, increment, decrement, deleteCart } = CartSlice.actions;

export default CartSlice.reducer;