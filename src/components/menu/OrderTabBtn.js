import TabBtn from "../ui/TabBtn"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrderType } from "@/redux/cart/cartSlice"
import { DefaultNotification } from "../ui/Notifications"
import useCheckAvailableOrderTypes from "@/hooks/useCheckAvailableOrderTypes"
export default function OrderTabBtn({
  onChange,
  currentService,
  remainingServicesForToday,
  restaurantStatus,
}) {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const currentOrderType = useSelector((state) => state.cart.data.orderType)
  const orderTypes = useCheckAvailableOrderTypes(
    currentService,
    remainingServicesForToday,
    restaurantStatus
  )
  const changeOrderType = (newOrderType) => {
    if (restaurantStatus === "closed") {
      setMessage("L'établissement est actuellement fermé")
      setShowMessage(true)
    } else if (newOrderType === 0) {
      if (orderTypes[0].enabled) {
        dispatch(selectOrderType(newOrderType))

        onChange && onChange()
      } else {
        setMessage("La livraison est actuellement indisponible")
        setShowMessage(true)
      }
    } else if (newOrderType === 1) {
      if (orderTypes[1].enabled) {
        dispatch(selectOrderType(newOrderType))
        onChange && onChange()
      } else {
        setMessage("Les commandes à emporter sont actuellement indisponibles")
        setShowMessage(true)
      }
    }
  }

  return (
    <div className="relative flex flex-col gap-2">
      <TabBtn
        values={orderTypes}
        currentTab={currentOrderType}
        onClickTab={changeOrderType}
      />

      <DefaultNotification
        show={showMessage}
        setShow={setShowMessage}
        expirationTime={4000}
        className={`absolute top-10 right-0`}
      >
        <p className="text-sm font-medium text-center">{message}</p>
      </DefaultNotification>
    </div>
  )
}
