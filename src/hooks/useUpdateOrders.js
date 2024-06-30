import useSocket from "./useSocket";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushOrder, fetchTodayOrders } from "@/redux/orders/ordersSlice";
const useUpdateOrders = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("new-order", (newOrder) => {
      dispatch(pushOrder(newOrder));
    });

    // on connect or reconnect after disconnect -> refetch orders
    socket.on("connect", () => {
      dispatch(fetchTodayOrders());
    });

    return () => {
      socket.off("new-order");
    };
  }, [socket]);
};

export default useUpdateOrders;
