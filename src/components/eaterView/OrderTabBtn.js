import TabBtn from "../ui/TabBtn"
import { useState, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectOrderType } from "@/redux/cart/cartSlice"
import { DefaultNotification } from "../ui/Notifications"

export default function OrderTabBtn({
  onChange,
  currentService,
  remainingServicesForToday,
  restaurantStatus,
}) {
  const dispatch = useDispatch()
  const [orderTypes, setOrderTypes] = useState([
    { label: "Livraison", enabled: false },
    { label: "À emporter", enabled: false },
  ])

  const [message, setMessage] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const currentOrderType = useSelector((state) => state.cart.data.orderType)
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

  const checkAvailableOrderType = () => {
    if (!restaurantStatus || restaurantStatus === "closed") return

    for (let service of [{ ...currentService }, ...remainingServicesForToday]) {
      const updatedOrderTypes = [...orderTypes]
      if (!service) return
      if (service.delivery) {
        updatedOrderTypes[0].enabled = true
      }
      if (service.takeaway) {
        updatedOrderTypes[1].enabled = true
      }
      setOrderTypes(updatedOrderTypes)
    }
  }

  useLayoutEffect(() => {
    checkAvailableOrderType()
    //handle default orderType based on what is available
    if (!orderTypes[0].enabled && orderTypes[1].enabled) {
      dispatch(selectOrderType(1))
    }
    if (!orderTypes[1].enabled && orderTypes[0].enabled) {
      dispatch(selectOrderType(0))
    }
  }, [currentService, remainingServicesForToday])

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
