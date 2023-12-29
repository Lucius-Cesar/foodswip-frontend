"use client";
import RestaurantLogo from "@/components/RestaurantLogo";
import SuccessIcon from "@/components/ui/icons/SuccessIcon";
import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon";
export default function success() {
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center p-2">
      <div className="w-screen h-screen flex flex-col items-center">
        <RestaurantLogo />
        <div className="flex flex-col justify-center items-center space-y-2 mt-6">
          <SuccessIcon className="h-24 w-24 mb-6" />
          <p className="font-bold text-xl">Merci pour votre commande #1</p>
          <p>
            Votre commande a bien été envoyée est actuellement en attente d’être
            validée.
          </p>
          <p>
            Vous recevrez un mail de confirmation dans les prochaines minutes,
            contenant les informations sur les délais de livraison ou de
            retrait.
          </p>
        </div>
      </div>
      <FoodSwipIcon className="h-10 w-auto" />
    </div>
  );
}
