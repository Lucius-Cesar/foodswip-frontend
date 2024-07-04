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
import MainNavigation from "@/components/pro/MainNavigation";

const page = () => {
  //redux
  const orders = useSelector((state) => state.orders);
  const auth = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const selectedOrder = Number(searchParams.get("order"));
  useRestaurantData(auth.data?.user?.slug, "restaurantAdmin");

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
        <div className="max-w-screen-sm">
          <div
            className={`h-screen py-10 px-3 space-y-4${
              selectedOrder ? "overflow-y-hidden" : ""
            } `}
          >
            <MainNavigation className="" />
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row gap-1">
                <BellAlertIcon className="text-yellow-400 h-6" />
                <p className="text-lg font-extrabold">
                  Nouveau ({newOrders?.length || 0})
                </p>
              </div>
              <div className="space-y-2">
                {newOrders?.map((order, i) => (
                  <OrderCard key={i} order={order} variant={"new"} />
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex flex-row gap-1">
                <CheckCircleIcon className="text-success h-6" />
                <p className="text-lg font-extrabold">
                  Accepté ({acceptedOrders?.length || 0})
                </p>
              </div>
              <div className="space-y-2">
                {acceptedOrders?.map((order, i) => (
                  <OrderCard key={i} order={order} variant={"accepted"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
