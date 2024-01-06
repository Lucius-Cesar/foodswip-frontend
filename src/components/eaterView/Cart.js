"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addNote } from "@/app/redux/reducers/cart";
import { addMoney } from "@/utils/moneyCalculations";

import CartIcon from "../ui/icons/CartIcon";
import CartArticle from "./CartArticle";
import DefaultBtn from "../ui/DefaultBtn";

import Link from "next/link";

export default function Cart({ open, setOpen, variant }) {
  const primary = "#F97247"; //sorry for this
  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurant);

  const dispatch = useDispatch();
  const router = useRouter();
  const [totalSum, setTotalSum] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    deliveryMin: "",
  });

  const onClickOrderBtn = () => {
    setValidationErrors((previous) => {
      if (Object.values(previous).every((value) => value === "")) {
        router.push("/checkout", { scroll: false });
      }
      return previous;
    });
  };

  useEffect(() => {
    //0 for delivery orderType
    if (cart.orderType === 0) {
      setTotalSum(
        addMoney(cart.articlesSum, restaurant.orderSettings.deliveryFees)
      );
      cart.articlesSum < restaurant.orderSettings.deliveryMin
        ? setValidationErrors((previous) => ({
            ...previous,
            deliveryMin: `${
              restaurant.orderSettings.deliveryMin - cart.articlesSum
            } € d'achats restants pour profiter de la Livraison`,
          }))
        : setValidationErrors((previous) => ({ ...previous, deliveryMin: "" }));
    } else if (cart.orderType === 1) {
      setTotalSum(cart.articlesSum);
    }
  }, [cart]);

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
        <div className="rounded-3xl h-fit w-fit b-white outline outline-primary">
          <CartIcon color={primary} />
        </div>
      </div>
      {cart.articles.length > 0 ? (
        <>
          <div className="flex flex-col space-y-5 grow overflow-auto px-4 sm:px-6 pb-0.5">
            {cart.articles.map((article, i) => (
              <CartArticle article={article} key={i} index={i} />
            ))}
          </div>
          <div className="flex flex-col justify-around mt-5 px-4 sm:px-6 h-56 pb-2">
            <div className="border-t-2 border-light-grey mb-1"></div>
            <div className="flex flex-row justify-between">
              <p className="font-medium">{cart.numberOfArticles} articles</p>
              <p className="font-medium">{cart.articlesSum} €</p>
            </div>
            {cart.orderType === 0 && (
              <>
                {validationErrors.deliveryMin ? (
                  <p className="font-bold text-error-danger self-end">
                    {validationErrors.deliveryMin}
                  </p>
                ) : (
                  <div className="flex flex-row justify-between">
                    <p className="font-medium">Frais de livraison</p>
                    <p className="font-medium">
                      {restaurant.orderSettings.deliveryFees} €
                    </p>
                  </div>
                )}
              </>
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
                  value={cart.note}
                  style={{ resize: "none" }}
                  className="block h-12 w-full rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {variant === "menu" && (
                  <div className="text-center">
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
