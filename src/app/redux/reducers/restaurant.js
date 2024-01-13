import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRestaurant = createAsyncThunk(
  "fetchRestaurant",
  async (uniqueValue) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${uniqueValue}`,
      {
        method: "GET",
      }
    );
    const data = response.json();
    return data;
  }
);

const initialState = {
  value: {},
  isLoading: false,
  error: false,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  //extraReducers are used for async function
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchRestaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {},
});

export const {} = restaurantSlice.actions;
export default restaurantSlice.reducer;
