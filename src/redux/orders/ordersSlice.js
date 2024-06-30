import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../auth/authActions";

export const fetchTodayOrders = createAsyncThunk(
  "fetchTodayOrders",
  async (_, { getState, dispatch }) => {
    const now = new Date();
    const start =
      now.getHours() < 4
        ? new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 1,
            4,
            0,
            0,
            0
          )
        : new Date(now.setHours(4, 0, 0, 0)); // Start of today at 04:00 to avoid bug for services after midnight
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    try {
      const data = await authFetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/orders/?start=${start.toISOString()}&end=${end.toISOString()}&sortBy=estimatedArrivalDate&sortDirection=asc`,
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

export const updateOrderStatus = createAsyncThunk(
  "updateOrderStatus",
  async (body, { getState, dispatch }) => {
    try {
      const data = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/updateStatus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
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
  data: [],
  isLoading: false,
  error: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //fetch today orders
    builder.addCase(fetchTodayOrders.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchTodayOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodayOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //update order status
    builder.addCase(updateOrderStatus.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const orderIndex = state.data.findIndex(
        (order) => order._id === action.payload._id
      );
      state.data[orderIndex] = action.payload;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
  reducers: {
    clearOrdersData: (state) => {
      state.data = [];
    },
    pushOrder: (state, action) => {
      const existingOrderIndex = state.data.findIndex(
        (order) => order.orderNumber === action.payload.orderNumber
      ); //check if the order is already in the list

      if (existingOrderIndex === -1) {
        state.data.push(action.payload);
      }
    },
  },
});

export const { clearOrdersData, pushOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
