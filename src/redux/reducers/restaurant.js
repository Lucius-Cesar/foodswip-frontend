import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRestaurant = createAsyncThunk(
  "fetchRestaurant",
  async (uniqueValue) => {
    const data = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${uniqueValue}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    return data;
  }
);

const initialState = {
  data: {},
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
      state.data = action.payload;
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
