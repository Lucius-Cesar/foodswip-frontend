import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRestaurant } from "@/redux/reducers/restaurant";

function useDispatchRestaurantsInfo(uniqueValue) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRestaurant(uniqueValue));
  }, [uniqueValue]);
}
export default useDispatchRestaurantsInfo;
