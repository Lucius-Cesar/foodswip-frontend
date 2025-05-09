import { useState, useEffect } from "react";
import AppError from "@/utils/AppError";

function useFetch(url, fetchOptions, fetchTrigger = true, setFetchTrigger) {
  const [state, setState] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        let response;
        response = await fetch(url, fetchOptions);
        if (!response.ok) {
          throw new AppError(
            response.statusText,
            response.status,
            `Error${response.statusText}`
          );
        }

        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          data: data,
          isLoading: false,
          error: null,
        }));
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

export default useFetch;
