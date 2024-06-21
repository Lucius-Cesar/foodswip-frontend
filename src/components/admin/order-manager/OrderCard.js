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
const OrderCard = ({ order }) => {
  console.log(order);
  return (
    <>
      <div className="flex flex-row text-lg rounded-xl bg-magnolia w-full h-32 ring-inset ring-1 ring-gray-300">
        <div className="w-9/12 h-full border-e border-gray-300 p-3">
          <div className="flex flex-col justify-between items-start h-full">
            <p className="font-bold">
              {order.customer.firstname} {order.customer.lastname}
            </p>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row gap-1 items-start">
                <div className="">
                  {switchOrderTypeIcon(order.orderType, "h-5")}
                </div>
                <p>{switchOrderTypeLabel(order.orderType)}</p>
              </div>
              <div className="flex flex-row gap-1 items-start">
                {switchPaymentMethodIcon(order.paymentMethod, "h-6")}
                <p className="align-text-bottom">
                  {switchPaymentMethodLabel(order.paymentMethod)}
                </p>
              </div>
            </div>
            <p className="font-bold"> {order.totalSum} €</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-3/12  p-3">
          <ClockIcon className="h-10 text-primary" />
          <p className="font-bold text-center">
            {dateToTimeString(order.estimatedArrivalDate)}
          </p>
          <p className="text-sm text-center">
            Passée à {dateToTimeString(order.creationDate)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
