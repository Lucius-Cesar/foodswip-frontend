"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { addNote, updateTotalSum } from "@/redux/cart/cartSlice";
import { addMoney, subtractMoney } from "@/utils/moneyCalculations";

import CartIcon from "../ui/icons/CartIcon";
import CartArticle from "./CartArticle";

import DefaultBtn from "../ui/DefaultBtn";
import checkIfRestaurantOpen from "@/utils/checkIfRestaurantOpen";

export default function Cart({ open, setOpen, variant }) {
  const primary = "#F97247"; //sorry for this
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurantPublic);

  const dispatch = useDispatch();
  const router = useRouter();
  const [totalSum, setTotalSum] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    deliveryMin: "",
    restaurantClosed: "",
  });

  const onClickOrderBtn = () => {
    const restaurantOpen = checkIfRestaurantOpen(restaurant);
    if (!restaurantOpen) {
      setValidationErrors((previous) => ({
        ...previous,
        restaurantClosed: "Le restaurant est actuellement fermé",
      }));
    } else {
      setValidationErrors((previous) => ({
        ...previous,
        restaurantClosed: "",
      }));
    }
    if (
      cart.data.articlesSum < restaurant.data.publicSettings.deliveryMin &&
      cart.data.orderType === 0
    ) {
      setValidationErrors((previous) => ({
        ...previous,
        deliveryMin: `${subtractMoney(
          restaurant.data.publicSettings.deliveryMin,
          cart.data.articlesSum
        )} € d'achats restants pour profiter de la Livraison`,
      }));
    } else
      setValidationErrors((previous) => ({ ...previous, deliveryMin: "" }));

    setValidationErrors((previous) => {
      if (Object.values(previous).every((value) => value === "")) {
        router.push(`${restaurant.data.uniqueValue}/checkout`, {
          scroll: false,
        });
      }
      return previous;
    });
  };

  useEffect(() => {
    //0 for delivery orderType
    if (cart.data.orderType === 0) {
      setTotalSum(
        addMoney(
          cart.data.articlesSum,
          restaurant.data.publicSettings.deliveryFees
        )
      );
      setTotalSum(cart.data.articlesSum);
    }
    if (
      cart.data.orderType === 1 ||
      cart.data.articlesSum >= restaurant.data.publicSettings.deliveryMin
    ) {
      setValidationErrors((previous) => ({ ...previous, deliveryMin: "" }));
    }
    dispatch(updateTotalSum(totalSum));
  }, [cart.data]);

  const cartContent = (
    <div className="flex col h-full flex-col bg-magnolia">
      <div
        className={`${
          variant === "checkout" ? "justify-end" : "justify-between"
        } flex flex-row items-start py-6 px-4  sm:px-6 h-28`}
      >
        <button
          type="button"
          className={`${
            variant === "checkout" ? "hidden" : ""
          } sticky rounded-md text-gray-400 hover:text-gray-500`}
          onClick={() => setOpen(false)}
        >
          <span className="absolute -inset-2.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button
          onClick={() => setOpen(false)}
          className={`rounded-3xl h-fit w-fit b-white outline outline-primary ${
            variant === "checkout" ? "pointer-events-none" : ""
          }`}
        >
          <CartIcon color={primary} />
        </button>
      </div>
      {cart.data.articles.length > 0 ? (
        <>
          <div className="flex flex-col space-y-5 grow overflow-auto px-4 sm:px-6 pb-0.5">
            {cart.data.articles.map((article, i) => (
              <CartArticle article={article} key={i} index={i} />
            ))}
          </div>
          <div className="flex flex-col justify-around mt-5 px-4 sm:px-6 h-56 pb-2">
            <div className="border-t-2 border-light-grey mb-1"></div>
            <div className="flex flex-row justify-between">
              <p className="font-medium">
                {cart.data.numberOfArticles} articles
              </p>
              <p className="font-medium">{cart.data.articlesSum} €</p>
            </div>
            {cart.data.orderType === 0 && (
              <div className="flex flex-row justify-between">
                <p className="font-medium">Frais de livraison</p>
                <p className="font-medium">
                  {restaurant.data.publicSettings.deliveryFees} €
                </p>
              </div>
            )}

            <div className="flex flex-row justify-between">
              <p className="font-bold">Total</p>
              <p className="font-bold">{totalSum} €</p>
            </div>

            <div>
              <div className="mt-2 flex flex-col justify-around space-y-3">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  placeholder="Ajouter une note"
                  onChange={(e) => dispatch(addNote(e.target.value))}
                  value={cart.data.note}
                  style={{ resize: "none" }}
                  className="block h-12 w-full rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {variant === "menu" && (
                  <div className="text-center">
                    {validationErrors.restaurantClosed && (
                      <p className="font-bold text-error-danger self-center">
                        {validationErrors.restaurantClosed}
                      </p>
                    )}
                    {validationErrors.deliveryMin && (
                      <p className="font-bold text-error-danger self-end">
                        {validationErrors.deliveryMin}
                      </p>
                    )}
                    <DefaultBtn
                      value={"Commander"}
                      className="w-72 h-10 text-xl font-bold bg-success hover:opacity-90 self-center"
                      onClick={onClickOrderBtn}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-2xl text-dark-grey font-bold text-center">
          Le panier est vide
        </p>
      )}
    </div>
  );

  if (variant === "menu") {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="absolute inset-0">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex  m-w-full sm:max-w-screen-sm  pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen sm:max-w-sm">
                    {cartContent}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  } else if (variant === "checkout") {
    return (
      <div className="h-auto sm:h-screen w-screen sm:w-72 md:w-80 lg:w-96	static sm:sticky top-0 border border-gravel sm:start-full">
        {cartContent}
      </div>
    );
  }
}
