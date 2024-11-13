
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 cart_redux: [],
 search_redux: "",
 categoryWiseFilter_redux:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setCart_Redux: (state, action) => {
      state.cart_redux = action.payload;
    },
    setSearch__Redux: (state, action) => {
      state.search_redux = action.payload;
    },
    setCategoryWiseFilter_Redux: (state, action) => {
      state.categoryWiseFilter_redux = action.payload;
    },
    
  
  },
});

export const {
  setCart_Redux,
  setSearch__Redux,
  setCategoryWiseFilter_Redux
} = userSlice.actions;

export default userSlice.reducer;