import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartIcon from "../ui/icons/CartIcon"
import CartArticle from "./CartArticle"

import {useSelector} from  "react-redux"

import { addMoney } from '@/utils/moneyCalculations'
import DefaultBtn from '../ui/DefaultBtn'

export default function Cart({open, setOpen}){
    const primary = "#F97247" //sorry for this
    const cart = useSelector((state) => state.cart);
    const orderSettings = useSelector((state) => state.restaurant.orderSettings);
    const [totalSum, setTotalSum] = useState(null)

    useEffect(() => {
      //0 for delivery orderType
      cart.orderType == 0 ? setTotalSum(addMoney(cart.articlesSum, orderSettings.deliveryFees)) : setTotalSum(cart.articlesSum)
    }, [cart])

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

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm" >
                  <div className="flex col h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="overflow-hidden">
                      <div className="flex flex-row items-start justify-between pb-6 px-4 sm:px-6 pt-0.5">    
                          <button
                            type="button"
                            className="sticky rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                          </button>
                          <div className =  "flex justify-center items-center rounded-3xl h-fit w-fit b-white outline outline-primary">
                            <CartIcon color = {primary}/>
                          </div>
                        </div>
                        <div className = "flex flex-col space-y-5 max-h-56 overflow-auto px-4 sm:px-6 pb-0.5">
                          {cart.articles.map((article,i) => <CartArticle article = {article} key={i} index = {i}/>)}
                        </div>
                        {cart.articles.length > 0 ? (
                          <div className = "flex flex-col justify-around mt-5 sm:border-t-2 border-light-grey px-4 sm:px-6 ">
                          <div className = "flex flex-row justify-between">
                            <p className ="font-medium">{cart.numberOfArticles} articles</p>
                            <p className ="font-medium">{cart.articlesSum} €</p>
                          </div>
                          { cart.orderType == 0 && <div className = "flex flex-row justify-between">
                            <p className ="font-medium">Frais de livraison</p>
                            <p className ="font-medium">{orderSettings.deliveryFees} €</p>
                          </div>}
                          <div className = "flex flex-row justify-between">
                            <p className = "font-bold">Total</p>
                            <p className = "font-bold">{totalSum} €</p>
                          </div>

                          <div>
      <div className="mt-2 flex flex-col justify-around space-y-3">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          placeholder="Ajouter un message"
          style={{ resize: 'none' }}
          className="block h-12 w-full rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          defaultValue={''}
        />
          <DefaultBtn value = {"Commander"} className = "w-72 h-10 text-xl font-bold bg-success self-center"/>

      </div>
    </div>
                          

                        </div>
                        ) : null}
                        </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}