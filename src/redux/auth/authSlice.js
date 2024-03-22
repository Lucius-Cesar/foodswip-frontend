import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  error: false,
};

//this function allow to fetch data with a refresh of access token if necessary
export const logIn = createAsyncThunk(
  "login",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login/`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const getAuth = createAsyncThunk(
  "getAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/refreshToken/`,
        {
          credentials: "include",
          method: "GET",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const logOut = createAsyncThunk(
  "logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logOut`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //extraReducers are used for async function
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.data.user = user;
      state.data.token = token;
    },

    resetCredentials: (state, action) => {
      state.data = initialState.data;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAuth.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(getAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(logOut.pending, (state, action) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = initialState.data;
      state.error = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.isLoading = false;
      state.data = initialState.data;
      state.error = action.payload;
    });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
