import { useState, useEffect } from "react";
import { store } from "@/redux/store";
import { authFetch } from "@/redux/auth/authActions";
import AppError from "@/utils/AppError";

import { icon } from "@fortawesome/fontawesome-svg-core";

function useAuthFetch(url, fetchOptions, fetchTrigger = true, setFetchTrigger) {
  //alternative to useFetch but refresh access token if necessary
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const data = await authFetch(
          url,
          fetchOptions,
          store.getState,
          store.dispatch
        );
        if (data.error) {
          throw new AppError(data.error);
        } else {
          setState((prevState) => ({
            ...prevState,
            data: data,
            isLoading: false,
            error: null,
          }));
        }
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          data: null,
          isLoading: false,
          error: error,
        }));
      } finally {
        //reset the fetch Trigger to false if setFetchTrigger function is passed on
        setFetchTrigger && setFetchTrigger(false);
      }
    };

    if (fetchTrigger) {
      fetchData();
    }
  }, [url, fetchTrigger]);

  return state;
}

export default useAuthFetch;
