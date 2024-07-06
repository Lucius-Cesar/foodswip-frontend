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
    socket.on("new-order", () => {
      const newOrderSound = new Audio("/sounds/new_order.wav");
      window.navigator.vibrate([2000, 1000, 2000, 1000, 2000, 1000, 2000]);
      newOrderSound.play();
      dispatch(fetchTodayOrders());
    });

    socket.on("update-order", () => {
      //avoid having differnet order status on different device due to cache
      dispatch(fetchTodayOrders());
    });

    // on connect or reconnect after disconnect -> refetch orders
    socket.on("connect", () => {
      dispatch(fetchTodayOrders());
    });

    return () => {
      socket.off("new-order");
      socket.off("update-order");
    };
  }, [socket]);
};

export default useUpdateOrders;
