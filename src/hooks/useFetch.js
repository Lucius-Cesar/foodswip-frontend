//useFetch.js
import { useState, useEffect } from "react";

function useFetch(url, fetchOptions, fetchTrigger = true) {
  const controller = new AbortController();
  const signal = controller.signal;

  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: false,
    status: null,
  });

  useEffect(() => {
    //if fetchOptions are present -> trigger the fetch
    if (fetchTrigger) {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      fetch(url, fetchOptions, signal).then((response) => {
        setState((prevState) => ({ ...prevState, status: response.status }));
        response
          .json()
          .then((data) => {
            if (data.error) {
              setState((prevState) => ({
                ...prevState,
                data: null,
                isLoading: false,
                error: data.error,
              }));
            } else {
              setState((prevState) => ({
                ...prevState,
                data: data,
                isLoading: false,
                error: false,
              }));
            }
          })
          .catch((err) => {
            setState((prevState) => ({
              ...prevState,
              data: null,
              isLoading: false,
              error: err,
            }));
          });
      });
    }

    return () => {
      controller.abort();
    };
  }, [url, fetchTrigger]);

  return state;
}

export default useFetch;
