import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getRestaurantPublicData = createAsyncThunk(
  "GetRestaurantPublicData",
  async (uniqueValue) => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/restaurants/public/${uniqueValue}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err))
    return data
  }
)

const initialState = {
  data: {},
  isLoading: false,
  error: false,
}

export const restaurantPublicSlice = createSlice({
  name: "restaurantPublic",
  initialState,
  //extraReducers are used for async function
  extraReducers: (builder) => {
    builder.addCase(getRestaurantPublicData.pending, (state, action) => {
      state.isLoading = true
      state.error = false
    })
    builder.addCase(getRestaurantPublicData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(getRestaurantPublicData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
  reducers: {
    clearRestaurantPublicData: (state, action) => {
      state.data = initialState.data
    },
  },
})

export const { clearRestaurantPublicData } = restaurantPublicSlice.actions
export default restaurantPublicSlice.reducer
