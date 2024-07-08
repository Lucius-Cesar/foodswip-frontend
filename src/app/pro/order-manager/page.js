"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayOrders } from "@/redux/orders/ordersSlice";
import OrderCard from "@/components/pro/order-manager/OrderCard";
import useCheckAuth from "@/hooks/useCheckAuth";
import useRefreshAuth from "@/hooks/useRefreshAuth";
import useUpdateOrders from "@/hooks/useUpdateOrders";
import useNotifSubscription from "@/hooks/useNotifSubscription";
import useRestaurantData from "@/hooks/useRestaurantData";
import { useSearchParams } from "next/navigation";
import { BellAlertIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Preloader from "@/components/ui/Preloader";
import {
  MainNavigationMenu,
  MainNavigationButton,
} from "@/components/pro/MainNavigation";
import OrderNotifications from "@/components/pro/order-manager/OrderNotifications";

const page = () => {
  //redux
  const orders = useSelector((state) => state.orders);
  const auth = useSelector((state) => state.auth);
  useRestaurantData(auth.data?.user?.slug, "restaurantAdmin");

  const [isMainNavigationOpen, setMainNavigationOpen] = useState(false);
  //hooks for auth and websocket
  useRefreshAuth();
  useCheckAuth();
  useNotifSubscription();
  useUpdateOrders();

  const newOrders = orders.data?.filter((order) => order.status === "new");
  const acceptedOrders = orders.data?.filter(
    (order) => order.status === "accepted"
  );

  return (
    <>
      {!orders.data ? (
        <Preloader />
      ) : (
        <div className="h-screen flex flex-col w-full overflow-y-hidden">
          <div className="bg-white w-full">
            <MainNavigationButton
              open={isMainNavigationOpen}
              setOpen={setMainNavigationOpen}
            />
          </div>
          <MainNavigationMenu
            open={isMainNavigationOpen}
            setOpen={setMainNavigationOpen}
          />
          <div className="px-3 space-y-4 h-full w-full overflow-y-auto">
            <div className="flex flex-col space-y-2 max-w-screen-sm ">
              <div className="flex flex-row gap-1">
                <BellAlertIcon className="text-yellow-400 h-6" />
                <p className="text-lg font-extrabold">
                  Nouveau ({newOrders?.length || 0})
                </p>
              </div>
              <div className="space-y-2">
                {newOrders?.map((order, i) => (
                  <OrderCard key={i} order={order} />
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2 max-w-screen-sm ">
              <div className="flex flex-row gap-1">
                <CheckCircleIcon className="text-success h-6" />
                <p className="text-lg font-extrabold">
                  Accepté ({acceptedOrders?.length || 0})
                </p>
              </div>
              <div className="space-y-2">
                {acceptedOrders?.map((order, i) => (
                  <OrderCard key={i} order={order} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <OrderNotifications />
    </>
  );
};

export default page;
