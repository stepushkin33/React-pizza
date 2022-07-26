import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности(по убыванию)',
    sortType: 'raiting',
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload;
    },

    setSort(state, action) {
      state.sort = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },

    resetFilters(state) {
      state.currentPage = 0;
      state.sort = initialState.sort;
      state.categoryId = initialState.categoryId;
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setFilters, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
