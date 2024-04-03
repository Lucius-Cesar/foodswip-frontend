import { setCredentials, logOut } from "./authSlice";
import AppError from "@/utils/AppError";

function authToken(getState) {
  console.log(typeof getState);

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
  const firstTryData = await response.json();

  if (response.ok) {
    return firstTryData;
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

      const refreshTokenResponseData = await refreshTokenResponse.json();

      //if new access Token is successfully generated => dispatch it in the auth reducers and retry the initial query
      if (refreshTokenResponse.ok) {
        dispatch(setCredentials(refreshTokenResponseData));
        fetchOptions = addAuthTokenToFetchOptions(fetchOptions, getState);

        const retryResponse = await fetch(url, fetchOptions);
        const retryResponseData = await retryResponse.json();
        console.log(retryResponseData);

        if (retryResponse.ok) {
          return retryResponseData;
        } else {
          throw new AppError(
            retryResponseData.error.message,
            retryResponseData.error.status,

            retryResponseData.error.name
          );
        }
      } else {
        //if invalid refreshToken inside cookie or no token cookie => user logout
        if ([401, 403].includes(refreshTokenResponse.status)) {
          dispatch(logOut());
        }
        throw new AppError(
          refreshTokenResponseData.error.message,
          refreshTokenResponseData.error.status,

          refreshTokenResponseData.error.name
        );
      }
    } else {
      throw new AppError(
        firstTryData.error.message,
        firstTryData.error.status,

        firstTryData.error.name
      );
    }
  }
};
