import { logOut, setCredentials } from "@/redux/auth/authSlice";
import { store } from "../store";
import AppError from "@/utils/AppError";

function authToken() {
  return store.getState().auth.data.token;
}

function addAuthTokenToFetchOptions(fetchOptions) {
  const fetchOptionsWithAuth = {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.headers || {}),
      Authorization: `Bearer ${authToken()}`,
    },
  };
  return fetchOptionsWithAuth;
}

export const authFetch = async (url, fetchOptions) => {
  fetchOptions = addAuthTokenToFetchOptions(fetchOptions);
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
        store.dispatch(setCredentials(credentialsData));
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
          store.dispatch(logOut());
        }
        throw new AppError(data);
      }
    } else {
      throw new AppError(data);
    }
  }
};
