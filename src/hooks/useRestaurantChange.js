import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearRestaurantPublicData } from "@/redux/restaurantPublic/restaurantPublicSlice"

const useRestaurantChange = (uniqueValue) => {
  const dispatch = useDispatch()
  const restaurantPublic = useSelector((state) => state.restaurantPublic)
  useLayoutEffect(() => {
    if (uniqueValue !== restaurantPublic.data.uniqueValue) {
      dispatch(clearRestaurantPublicData())
    }
  }, [uniqueValue])
}

export default useRestaurantChange
