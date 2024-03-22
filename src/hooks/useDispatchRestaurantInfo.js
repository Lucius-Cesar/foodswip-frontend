import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurant } from "@/redux/restaurant/restaurantSlice";

function useDispatchRestaurantsInfo(uniqueValue) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (uniqueValue) {
      dispatch(fetchRestaurant(uniqueValue));
    }
  }, [uniqueValue]);
}
export default useDispatchRestaurantsInfo;
