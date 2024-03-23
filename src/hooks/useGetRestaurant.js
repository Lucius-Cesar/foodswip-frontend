import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";

function useGetRestaurant(uniqueValue) {
  const dispatch = useDispatch();
  const prevUniqueValue = useRef(null);

  useLayoutEffect(() => {
    // check if uniqueValue has changed
    if (uniqueValue && uniqueValue !== prevUniqueValue.current) {
      dispatch(fetchRestaurant(uniqueValue));
      prevUniqueValue.current = uniqueValue;
    }
  }, [uniqueValue, dispatch]);
}
export default useGetRestaurant;
