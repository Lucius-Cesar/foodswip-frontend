import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"

import FoodOptions from "./FoodOptions"
import DefaultBtn from "../ui/DefaultBtn"
import AddBtn from "../ui/AddBtn"
import MinusBtn from "../ui/MinusBtn"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { useDispatch, useSelector } from "react-redux"
import {
  addArticleToCart,
  incrementArticleQuantity,
} from "../../redux/cart/cartSlice"

import {
  addMoney,
  multiplyMoney,
  subtractMoney,
} from "@/utils/moneyCalculations"

import findIndexOfArticleInCart from "@/utils/findIndexOfArticleInCart"

export default function ModalFood({ open, setOpen, food }) {
  // AU MOI DU FUTUR: n'oublie pas de trier les options par prix au niveau du backend
  const [articlePrice, setArticlePrice] = useState(null)
  const [quantity, setQuantity] = useState(1)

  //default selectedOptions are the first of each formSelect
  const [selectedOptions, setSelectedOptions] = useState(null)
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    if (!open || !food) return
    setArticlePrice(food.price)
    setQuantity(1)
    const optionsFlatMap =
      food?.optionGroups?.length > 0
        ? food.optionGroups
            //skip optionGroups with no entries required
            .filter((optionGroup) => !optionGroup.isMultiChoices)
            .flatMap((optionGroup) => optionGroup.options[0])
        : []
    setSelectedOptions(optionsFlatMap)
  }, [open, food])

  const handleClose = () => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  const handleAddArticleToCart = () => {
    const updatedSelectedOptions = selectedOptions.filter(
      (option) => option.isNeededInOrder
    )

    const newArticle = {
      value: food.value,
      food: food._id,
      price: articlePrice,
      quantity: quantity,
      selectedOptions: updatedSelectedOptions,
    }

    //if cart already contains this article object -> increment
    // /!\ This code is also present in foodCard.js please pay attention to change it in this file too
    const newArticleIndex = findIndexOfArticleInCart(
      newArticle,
      cart.data.articles
    )
    if (newArticleIndex !== -1) {
      dispatch(
        incrementArticleQuantity({
          index: newArticleIndex,
          increment: newArticle.quantity,
        })
      )
    } else {
      //else add article object to cart
      dispatch(addArticleToCart(newArticle))
    }
    handleClose()
  }

  useEffect(() => {
    if (!selectedOptions || !food) return

    //if options and supplements array change, the price for 1 quantity food is recalculate
    const optionsPriceSum = selectedOptions.reduce(
      (accumulator, option) => addMoney(accumulator, option.price),
      0
    )

    setArticlePrice(addMoney(food.price, optionsPriceSum))
  }, [food, selectedOptions])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => handleClose()}>
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
              <Dialog.Panel className="flex flex-col justify-between relative w-screen h-dvh sm:w-7/12 sm:h-auto sm:max-h-screen transform overflow-hidden  rounded-xl bg-magnolia text-left shadow-xl transition-all  px-4 pb-4 pt-5">
                <div className="flex fex-row w-full justify-between pb-4">
                  <h2 className="font-title">{food?.value}</h2>
                  <button
                    type="button"
                    className={`rounded-md text-gray-400 hover:text-gray-500`}
                    onClick={() => handleClose()}
                  >
                    {" "}
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-3 overflow-y-auto px-4">
                  {food?.optionGroups?.length > 0 && (
                    <div className="space-y-2">
                      {food?.optionGroups?.map((optionGroup, i) => {
                        // options can be food references
                        let items = optionGroup.options

                        return (
                          <FoodOptions
                            key={i}
                            label={optionGroup.label}
                            isMultiChoices={optionGroup.isMultiChoices}
                            items={items}
                            selectedOptions={selectedOptions}
                            setSelectedOptions={setSelectedOptions}
                          />
                        )
                      })}
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
                    value={` Ajouter | ${multiplyMoney(
                      articlePrice,
                      quantity
                    )} €`}
                    className="animate-[bounce_1s_ease_8s_infinite] relative py-2 px-12 text-xl font-bold bg-success hover:opacity-90"
                    onClick={handleAddArticleToCart}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
