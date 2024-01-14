import TabBtn from "../ui/TabBtn";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderType } from "@/redux/reducers/cart";

export default function OrderTabBtn() {
  const dispatch = useDispatch();

  const orderTypes = useSelector(
    (state) => state.restaurant.value.orderSettings.orderTypes
  );

  const currentOrderType = useSelector((state) => state.cart.value.orderType);
  const changeOrderType = (value) => {
    dispatch(selectOrderType(value));
  };

  //set the default orderType depending on which one is enabled
  useLayoutEffect(() => {
    if (!orderTypes[currentOrderType]?.enabled) {
      const activeOrderTypes = orderTypes.filter(
        (orderType) => orderType.enabled === true
      );
      activeOrderTypes.length && changeOrderType(activeOrderTypes[0].value);
    }
  }, [orderTypes, currentOrderType]);

  return (
    <TabBtn
      values={orderTypes}
      currentTab={currentOrderType}
      onClickTab={changeOrderType}
    />
  );
}
