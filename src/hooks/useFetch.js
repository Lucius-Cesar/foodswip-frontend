//useFetch.js
import { useState, useEffect } from "react";

function useFetch(url, fetchOptions, fetchTrigger = true) {
  const controller = new AbortController();
  const signal = controller.signal;

  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: false,
  });

  useEffect(() => {
    //if fetchOptions are present -> trigger the fetch
    if (fetchTrigger) {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      fetch(url, fetchOptions, signal).then((response) => {
        response
          .json()
          .then((data) =>
            setState({ data: data, isLoading: false, error: false })
          )
          .catch((err) => {
            setState({
              data: null,
              isLoading: false,
              error: err,
            });
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
