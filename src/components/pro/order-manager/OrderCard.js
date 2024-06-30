"use client";
import {
  switchPaymentMethodLabel,
  switchOrderTypeLabel,
} from "@/utils/switchLabel";
import {
  switchPaymentMethodIcon,
  switchOrderTypeIcon,
} from "@/components/ui/icons/SwitchIcon";
import { ClockIcon } from "@heroicons/react/24/outline";
import { dateToTimeString } from "@/utils/dateAndTime";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
const OrderCard = ({ order }) => {
  const searchParams = useSearchParams();
  const selectedOrder = Number(searchParams.get("order"));

  // orderCard is displayed if no order is selected or if the selected order is different from the current order
  if (!selectedOrder || selectedOrder !== order.orderNumber) {
    return (
      <>
        <Link
          href={`?${new URLSearchParams({
            order: order.orderNumber,
          })}`}
          className="flex flex-row text-sm rounded-xl bg-magnolia w-full ring-inset ring-1 ring-gravel py-2"
        >
          <div className="w-9/12 border-e border-gravel px-2">
            <div className="flex flex-col gap-0.5 justify-between items-start h-full">
              <p className="font-bold">
                {order.customer.firstname} {order.customer.lastname}
              </p>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row items-start gap-1">
                  <div className="">
                    {switchOrderTypeIcon(order.orderType, "h-3.5")}
                  </div>
                  <p className="font-bold">
                    {switchOrderTypeLabel(order.orderType)}
                  </p>
                </div>
                <div className="flex flex-row items-start  gap-1">
                  {switchPaymentMethodIcon(order.paymentMethod, "h-4")}
                  <p className="font-bold">
                    {switchPaymentMethodLabel(order.paymentMethod)}
                  </p>
                </div>
              </div>
              <p className="font-bold"> {order.totalSum} €</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-3/12  p-1">
            <ClockIcon className="h-6 text-primary" />
            <p className="font-bold text-center">
              {dateToTimeString(order.estimatedArrivalDate)}
            </p>
            <p className="text-xs text-center">
              Passée à {dateToTimeString(order.creationDate)}
            </p>
          </div>
        </Link>
      </>
    );
  } else {
    return <OrderDetails order={order} />;
  }
};

export default OrderCard;
