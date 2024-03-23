import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppError from "@/utils/AppError";
import Cookies from "js-cookie";
const initialState = {
  data: null,
  isLoading: false,
  error: false,
};

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
      Cookies.remove("token");
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
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

function authToken(getState) {
  return getState().auth.data.token;
}

function addAuthTokenToFetchOptions(fetchOptions, getState) {
  const fetchOptionsWithAuth = {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.headers || {}),
      Authorization: `Bearer ${authToken(getState)}`,
    },
  };
  return fetchOptionsWithAuth;
}

// fetch with auth check and refresh auth if expired, passing getState and dispatch is needed when used from an asyncThunkFunction
export const authFetch = async (url, fetchOptions, getState, dispatch) => {
  fetchOptions = addAuthTokenToFetchOptions(fetchOptions, getState, dispatch);
  const response = await fetch(url, fetchOptions);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    //if response.status 401,403 => invalid access token, try to generate one with the refresh token cookie
    if ([401, 403].includes(response.status)) {
      const refreshTokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/refreshToken`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      //if new access Token is successfully generated => dispatch it in the auth reducers and retry the initial query
      if (refreshTokenResponse.ok) {
        const credentialsData = await refreshTokenResponse.json();
        dispatch(setCredentials(credentialsData));
        fetchOptions = addAuthTokenToFetchOptions(fetchOptions);

        const retryResponse = await fetch(url, fetchOptions);
        if (retryResponse.ok) {
          data = retryResponse.json();
          return data;
        } else {
          throw new AppError(data);
        }
      } else {
        //if invalid refreshToken inside cookie or no token cookie => user logout
        if ([401, 403].includes(refreshTokenResponse.status)) {
          dispatch(logOut());
        }
        throw new AppError(data);
      }
    } else {
      throw new AppError(data);
    }
  }
};
//export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
