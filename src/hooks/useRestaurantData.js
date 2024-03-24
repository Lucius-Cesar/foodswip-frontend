import { useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantPublicData } from "@/redux/restaurantPublic/restaurantPublicSlice";
import { getRestaurantAdminData } from "@/redux/restaurantAdmin/restaurantAdminSlice";

import { clearCart } from "@/redux/cart/cartSlice";

function useRestaurantData(uniqueValue, target) {
  const dispatch = useDispatch();
  if (target === "restaurantPublic") {
    const restaurantPublic = useSelector((state) => state.restaurantPublic);
    useLayoutEffect(() => {
      dispatch(getRestaurantPublicData(uniqueValue));
      //if restaurant is not the same in localStorage => clear cart
      if (uniqueValue !== restaurantPublic.data?.uniqueValue) {
        dispatch(clearCart());
      }
    }, [uniqueValue]);
  } else if (target === "restaurantAdmin") {
    // auth token is necessary to fetch these data
    const auth = useSelector((state) => state.auth);
    const restaurantAdmin = useSelector((state) => state.restaurantAdmin);

    useLayoutEffect(() => {
      //if authenticated and the restaurant is not the same as stored in localStorage
      if (
        auth.data?.token &&
        uniqueValue !== restaurantAdmin.data?.uniqueValue
      ) {
        dispatch(getRestaurantAdminData(uniqueValue));
      }
    }, [uniqueValue, auth.data?.token]);
  }
}
export default useRestaurantData;
