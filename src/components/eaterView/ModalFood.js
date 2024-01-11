import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import FoodOptionsFormSelect from "./FoodOptionsFormSelect";
import FoodSupplementsCheckBoxGroup from "./FoodSupplementsCheckBoxGroup";
import DefaultBtn from "../ui/DefaultBtn";
import AddBtn from "../ui/AddBtn";
import MinusBtn from "../ui/MinusBtn";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import {
  addArticleToCart,
  incrementArticleQuantity,
} from "../../app/redux/reducers/cart";

import { addMoney, multiplyMoney } from "@/utils/moneyCalculations";

import findIndexOfArticleInCart from "@/utils/findIndexOfArticleInCart";

export default function ModalFood({ food, open, setOpen }) {
  // AU MOI DU FUTUR: n'oublie pas de trier les options par prix au niveau du backend
  const [foodPrice, setFoodPrice] = useState(food.price);
  const [quantity, setQuantity] = useState(1);

  //default chosenOptions are the first of each formSelect
  const [chosenOptions, setChosenOptions] = useState(
    food.options.length > 0
      ? food.options.flatMap((optionCategory) => optionCategory.items[0])
      : []
  );
  const [chosenSupplements, setChosenSupplements] = useState([]);

  const cart = useSelector((state) => state.cart);
  const handleClose = () => {
    setOpen(false);
    //reset states on close + Timeout for animations
    setTimeout(function () {
      setFoodPrice(food.price);
      setQuantity(1);
      setChosenOptions([]);
      setChosenSupplements([]);
      setChosenOptions(
        food.options.length > 0
          ? food.options.flatMap((optionCategory) => optionCategory.items[0])
          : []
      );
    }, 300);
  };
  const dispatch = useDispatch();
  const handleAddArticleToCart = () => {
    const newArticle = {
      food: food.value,
      foodPrice: foodPrice,
      quantity: quantity,
      options: chosenOptions,
      supplements: chosenSupplements,
    };
    //if cart already contains this article object -> increment
    // /!\ This code is also present in foodCard.js please pay attention to change it in this file too
    const articleIndex = findIndexOfArticleInCart(newArticle, cart.articles);

    if (articleIndex !== -1) {
      dispatch(
        incrementArticleQuantity({
          index: articleIndex,
          increment: newArticle.quantity,
        })
      );
    } else {
      //else add article object to cart
      dispatch(addArticleToCart(newArticle));
    }
    handleClose();
  };
  useEffect(() => {
    //if options and supplements array change, the price for 1 quantity food is recalculate
    const optionsPriceSum = chosenOptions.reduce(
      (accumulator, option) => addMoney(accumulator, option.price),
      0
    );

    const supplementsPriceSum = chosenSupplements.reduce(
      (accumulator, supplement) => addMoney(accumulator, supplement.price),
      0
    );

    setFoodPrice(addMoney(food.price, optionsPriceSum, supplementsPriceSum));
  }, [chosenOptions, chosenSupplements]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-hidden">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col justify-between relative w-screen h-dvh sm:w-7/12 sm:h-auto sm:max-h-screen transform overflow-hidden rounded-lg bg-magnolia text-left shadow-xl transition-all  px-4 pb-4 pt-5">
                <div className="flex fex-row w-full justify-between pb-4">
                  <h2>{food.value}</h2>
                  <button
                    type="button"
                    className={`rounded-md text-gray-400 hover:text-gray-500`}
                    onClick={() => setOpen(false)}
                  >
                    {" "}
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-3 overflow-y-auto px-4">
                  {food.options.length > 0 && (
                    <div className="space-y-2">
                      {food.options.map((option, i) => (
                        <FoodOptionsFormSelect
                          key={i}
                          label={option.label}
                          items={option.items}
                          chosenOptions={chosenOptions}
                          setChosenOptions={setChosenOptions}
                        />
                      ))}
                    </div>
                  )}
                  {food.supplements.length > 0 && (
                    <div>
                      {food.supplements.map((supplement, i) => (
                        <FoodSupplementsCheckBoxGroup
                          key={i}
                          label={supplement.label}
                          items={supplement.items}
                          chosenSupplements={chosenSupplements}
                          setChosenSupplements={setChosenSupplements}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-between py-4">
                  <div className="flex flex-row justify-around w-32">
                    <MinusBtn
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    />
                    {quantity}
                    <AddBtn onClick={() => setQuantity(quantity + 1)} />
                  </div>
                  <DefaultBtn
                    value={`${multiplyMoney(foodPrice, quantity)} €`}
                    className=" w-32 sm:w-40 text-xl font-bold bg-success hover:opacity-90"
                    onClick={handleAddArticleToCart}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
