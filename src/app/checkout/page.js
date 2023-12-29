"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Cart from "../../components/eaterView/Cart";
import RestaurantLogo from "../../components/RestaurantLogo";
import OrderTabBtn from "@/components/eaterView/OrderTabBtn";
import FormInput from "../../components/ui/FormInput";
import { ExclamationCircleIcon, EnvelopeIcon } from "@heroicons/react/20/solid";

export default function Checkout() {
  const restaurant = useSelector((state) => state.restaurant);
  const cart = useSelector((state) => state.cart);

  const [activePaymentMethods, setActivePaymentMethods] = useState([]);
  const [form, setForm] = useState({
    adress: "",
    postCode: "",
    city: "",
    firstname: "",
    name: "",
    mail: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (cart.orderType === 0) {
      const paymentMethodsForDelivery =
        restaurant.orderSettings.paymentMethods.filter(
          (paymentMethod) => paymentMethod.delivery === true
        );
      setActivePaymentMethods(paymentMethodsForDelivery);
    } else if (cart.orderType === 1) {
      const paymentMethodsForTakeAway =
        restaurant.orderSettings.paymentMethods.filter(
          (paymentMethod) => paymentMethod.takeAway === true
        );
      setActivePaymentMethods(paymentMethodsForTakeAway);
    }
  }, [cart.orderType]);

  return (
    <div className="h-screen relative flex flex-row overflow-y-auto">
      <div className="flex flex-col grow items-start justify-start px-12 space-y-10">
        <RestaurantLogo path={`images/${restaurant.uniqueValue}/logo.png`} />
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Informations de commande</h2>
          <OrderTabBtn />

          <FormInput label="Adresse" id="adress" />
          <div className="flex flex-row space-x-4">
            <FormInput label="Code postal" id="postcode" />
            <FormInput label="Ville" id="city" />
          </div>
          {cart.orderType === 0 ? (
            <h3 className="font-bold text-lg">
              Estimation des délais de livraison: entre{" "}
              {restaurant.orderSettings.deliveryEstimate.min} et{" "}
              {restaurant.orderSettings.deliveryEstimate.max} min *
            </h3>
          ) : cart.orderType === 1 ? (
            <h3 className="font-bold text-lg">
              Estimation du délai pour emporter:{" "}
              {restaurant.orderSettings.takeAwayEstimate} min *
            </h3>
          ) : null}
          <p>
            * La durée mentionnée est une estimation moyenne à titre indicatif.{" "}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-xl">Moyen de paiement</h2>
          <fieldset className="mt-4">
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
              {activePaymentMethods.map((paymentMethod, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id={i}
                    name="payment-method"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={paymentMethod.value}
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >
                    {paymentMethod.value}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <h2 className="font-bold text-xl">Informations personnelles</h2>
          <div className="flex flex-row space-x-4">
            <FormInput label="Prénom" id="firstname" />
            <FormInput label="Nom" id="lastname" />
          </div>

          <div className="flex flex-row space-x-4">
            <FormInput label="mail" id="mail" placeholder="you@example.com" />
            <FormInput label="N° de téléphone" id="phonenumber" />
          </div>
        </div>
      </div>
      <Cart variant="checkout" />
    </div>
  );
}
