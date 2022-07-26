import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },

    decPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count >= 2) {
        findItem.count--;
      }
    },

    removePizza(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearPizzas(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addPizza, removePizza, clearPizzas, decPizza } = cartSlice.actions;

export default cartSlice.reducer;
