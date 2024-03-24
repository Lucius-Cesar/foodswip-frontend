import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../auth/authSlice";

export const getRestaurantAdminData = createAsyncThunk(
  "GetRestaurantAdminData",
  async (uniqueValue, { getState, dispatch }) => {
    try {
      const data = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/admin/${uniqueValue}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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

export const updateRestaurantSettings = createAsyncThunk(
  "updateRestaurantSettings",
  async (payload, { getState, dispatch }) => {
    try {
      const data = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/admin/updateRestaurantSettings`,
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

export const restaurantAdminSlice = createSlice({
  name: "restaurantAdmin",
  initialState,
  //extraReducers are used for async function
  extraReducers: (builder) => {
    builder.addCase(getRestaurantAdminData.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getRestaurantAdminData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRestaurantAdminData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(updateRestaurantSettings.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateRestaurantSettings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateRestaurantSettings.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {
    clearRestaurantAdminData: (state, action) => {
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
  },
});

export const { clearRestaurantAdminData } = restaurantAdminSlice.actions;
export default restaurantAdminSlice.reducer;
