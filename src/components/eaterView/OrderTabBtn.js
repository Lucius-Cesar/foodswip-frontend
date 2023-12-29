import TabBtn from "../ui/TabBtn";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderType } from "@/app/redux/reducers/cart";

export default function OrderTabBtn() {
  const dispatch = useDispatch();

  const orderTypes = useSelector(
    (state) => state.restaurant.orderSettings.orderTypes
  );

  const currentOrderType = useSelector((state) => state.cart.orderType);

  const changeOrderType = (value) => {
    dispatch(selectOrderType(value));
  };

  //set the default orderType depending on which one is enabled
  useLayoutEffect(() => {
    if (!orderTypes[currentOrderType].enabled) {
      const activeOrderTypes = orderTypes.filter(
        (orderType) => orderType.enabled === true
      );
      activeOrderTypes.length && changeOrderType(activeOrderTypes[0].value);
    }
  }, []);

  return (
    <TabBtn
      values={orderTypes}
      currentTab={currentOrderType}
      onClickTab={changeOrderType}
    />
  );
}
