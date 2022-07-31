import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ sortBy, order, search, currentPage, categoryId }) => {
    const { data } = await axios.get(
      `https://62b34d614f851f87f458a36c.mockapi.io/item?page=${currentPage}&limit=4${
        categoryId > 0 ? `&category=${categoryId}` : ``
      }&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState = {
  items: [],
  loadStatus: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    getItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.loadStatus = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.loadStatus = 'success';
    },
    [fetchPizzas.rejected]: (state, error) => {
      state.items = [];
      state.loadStatus = 'error';
    },
  },
});

export const { getItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
