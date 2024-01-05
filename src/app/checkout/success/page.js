"use client";

import { useSelector } from "react-redux";
import RestaurantLogo from "@/components/RestaurantLogo";
import SuccessIcon from "@/components/ui/icons/SuccessIcon";
import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon";

export default function Success() {
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurant);
  const currentDate = new Date();

  const deliveryDate = new Date(currentDate);
  deliveryDate.setMinutes(
    currentDate.getMinutes() + restaurant.orderSettings.deliveryEstimate.max
  );
  const formattedDeliveryTime = `${deliveryDate.getHours()}:${String(
    deliveryDate.getMinutes()
  ).padStart(2, "0")}`;

  let takeAwayDate = new Date(currentDate);
  takeAwayDate.setMinutes(
    currentDate.getMinutes() + restaurant.orderSettings.takeAwayEstimate
  );
  const formattedTakeAwayTime = `${takeAwayDate.getHours()}:${String(
    takeAwayDate.getMinutes()
  ).padStart(2, "0")}`;

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      <RestaurantLogo className="h-24 w-72" />

      <div className="flex flex-col justify-center items-center">
        <SuccessIcon className="h-24 w-24 mb-6" />
        <p className="font-bold text-2xl">Merci pour votre commande #1</p>
        <p className="text-lg text-center">
          Votre commande a bien été validée.
        </p>
        {cart.orderType === 0 && (
          <p className="text-center text-lg">
            Elle vous sera livrée à<br></br>
            <span className="font-bold text-3xl">{formattedDeliveryTime}</span>
          </p>
        )}
        {cart.orderType === 1 && (
          <p className="text-center text-lg">
            Vous pouvez venir la chercher au restaurant à<br></br>
            <span className="font-bold text-3xl text-center">
              {formattedTakeAwayTime}
            </span>
          </p>
        )}
      </div>

      <FoodSwipIcon className="h-12 sm:h-10 w-auto" />
    </div>
  );
}
