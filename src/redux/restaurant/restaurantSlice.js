import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../auth/authSlice";

export const fetchRestaurant = createAsyncThunk(
  "fetchRestaurant",
  async (uniqueValue) => {
    const data = await fetch(
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

export const postRestaurantSettings = createAsyncThunk(
  "postRestaurantSettings",
  async (payload, { getState, dispatch }) => {
    try {
      const data = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/updateRestaurantSettings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        getState,
        dispatch
      );
      return data;
    } catch (error) {
      console.error(error);
    }
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
      state.error = false;
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchRestaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(postRestaurantSettings.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(postRestaurantSettings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postRestaurantSettings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {},
});

export const { updateRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
