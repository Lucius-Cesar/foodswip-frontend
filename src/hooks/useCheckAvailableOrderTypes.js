import { useState, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { selectOrderType } from "@/redux/cart/cartSlice";
import { useSelector } from "react-redux";
import OrderTabBtn from "@/components/menu/OrderTabBtn";

// unfortunately, there is a problem if delivery is not available on the first restaurant and we switch to another restaurant that has delivery available =>
// the preselect order type will be takeaway instead of delivery. It is due to the restaurantPublicData that still be the previous restaurant for a very short time. this need to be fixed in the future.
const useCheckAvailableOrderTypes = (
  currentService,
  remainingServicesForToday,
  restaurantStatus
) => {
  const dispatch = useDispatch();
  const defaultOrderTypes = [
    {
      label: "Livraison",
      enabled: false,
    },
    {
      label: "À emporter",
      enabled: false,
    },
  ];
  const [orderTypes, setOrderTypes] = useState(defaultOrderTypes);
  const selectedOrderType = useSelector((state) => state.cart.data.orderType);

  const checkAvailableOrderType = () => {
    const updatedOrderTypes = defaultOrderTypes;

    //if restaurant is closed, disable all order types
    if (!restaurantStatus || restaurantStatus === "closed")
      return updatedOrderTypes;

    if (restaurantStatus === "forced open") {
      const nextService = remainingServicesForToday[0];
      //if restaurant status forced open and no next service -> just enable takeaway
      if (!nextService) {
        updatedOrderTypes[0].enabled = false;
        updatedOrderTypes[1].enabled = true;
        return updatedOrderTypes;
      }
      //if restaurant status forced open and next service is available enable orderType like next service
      if (nextService) {
        if (nextService.delivery) {
          updatedOrderTypes[0].enabled = true;
        }
        if (nextService.takeaway) {
          updatedOrderTypes[1].enabled = true;
        }
        return updatedOrderTypes;
      }
    }
    //if currentService or remaningService
    for (let service of [{ ...currentService }, ...remainingServicesForToday]) {
      if (service.delivery) {
        updatedOrderTypes[0].enabled = true;
      }
      if (service.takeaway) {
        updatedOrderTypes[1].enabled = true;
      }
    }
    return updatedOrderTypes;
  };

  useLayoutEffect(() => {
    //check for available order types
    const updatedOrderTypes = checkAvailableOrderType();
    setOrderTypes(updatedOrderTypes);
  }, [currentService, remainingServicesForToday]);

  const selectDefaultOrderType = () => {
    if (
      selectedOrderType === null ||
      orderTypes[selectedOrderType]?.enabled === false
    ) {
      for (let i = 0; i < orderTypes.length; i++) {
        if (orderTypes[i].enabled) {
          dispatch(selectOrderType(i));
          break;
        }
      }
    }
  };

  useLayoutEffect(() => {
    //select first available order type
    selectDefaultOrderType();
  }, [orderTypes, selectedOrderType]);
  return orderTypes;
};

export default useCheckAvailableOrderTypes;
