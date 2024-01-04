"use client";
import RestaurantLogo from "@/components/RestaurantLogo";
import SuccessIcon from "@/components/ui/icons/SuccessIcon";
import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon";
export default function success() {
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      <RestaurantLogo className="h-24 w-72" />

      <div className="flex flex-col justify-center items-center">
        <SuccessIcon className="h-24 w-24 mb-6" />
        <p className="font-bold text-2xl sm:text-xl">
          Merci pour votre commande #1
        </p>
        <p className="text-xl sm:text-base text-center">
          Votre commande a bien été envoyée est actuellement en attente d’être
          validée.<br></br>Vous recevrez un mail de confirmation dans les
          prochaines minutes, contenant les informations sur les délais de
          livraison ou de retrait.
        </p>
      </div>

      <FoodSwipIcon className="h-12 sm:h-10 w-auto" />
    </div>
  );
}
