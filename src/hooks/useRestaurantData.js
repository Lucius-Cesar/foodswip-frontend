import { useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getRestaurantPublicData,
  clearRestaurantPublicData,
} from "@/redux/restaurantPublic/restaurantPublicSlice"
import { getRestaurantAdminData } from "@/redux/restaurantAdmin/restaurantAdminSlice"

import { clearCart } from "@/redux/cart/cartSlice"

function useRestaurantData(slug, target) {
  const dispatch = useDispatch()
  if (target === "restaurantPublic") {
    const restaurantPublic = useSelector((state) => state.restaurantPublic)
    useLayoutEffect(() => {
      if (slug !== restaurantPublic.data?.slug) {
        dispatch(clearRestaurantPublicData())
        dispatch(getRestaurantPublicData(slug)).then(() =>
          dispatch(clearCart())
        )
      } else if (slug) {
        dispatch(getRestaurantPublicData(slug))
        //if restaurant is not the same in localStorage => clear cart
      }
    }, [slug])
  } else if (target === "restaurantAdmin") {
    // auth token is necessary to fetch these data
    const auth = useSelector((state) => state.auth)

    useLayoutEffect(() => {
      //if authenticated and the restaurant is not the same as stored in localStorage
      if (auth.data?.token) {
        dispatch(getRestaurantAdminData(slug))
      }
    }, [auth.data?.token])
  }
}
export default useRestaurantData
