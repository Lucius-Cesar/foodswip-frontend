import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartIcon from "../ui/icons/CartIcon";
import CartArticle from "./CartArticle";
import { useSelector } from "react-redux";
import { addMoney } from '@/utils/moneyCalculations';
import DefaultBtn from '../ui/DefaultBtn';

export default function CartForCheckout({ open, setOpen }) {
  const primary = "#F97247"; // sorry for this
  const cart = useSelector((state) => state.cart);
  const orderSettings = useSelector((state) => state.restaurant.orderSettings);
  const [totalSum, setTotalSum] = useState(null);

  useEffect(() => {
    // 0 for delivery orderType
    cart.orderType === 0
      ? setTotalSum(addMoney(cart.articlesSum, orderSettings.deliveryFees))
      : setTotalSum(cart.articlesSum);
  }, [cart]);

  return (
    <div className="flex flex-col space-y-5 h-screen overflow-auto px-4 sm:px-6 pb-0.5 sticky top-0  w-screen max-w-sm">
      <div className="flex flex-row items-start justify-between pb-6 px-4  pt-6 sm:px-6">
        <button
          type="button"
          className="sticky rounded-md bg-white text-gray-400 hover:text-gray-500"
          onClick={() => setOpen(false)}
        >
          <span className="absolute -inset-2.5" />
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <div className="flex justify-center items-center rounded-3xl h-fit w-fit b-white outline outline-primary">
          <CartIcon color={primary} />
        </div>
      </div>

      <div className="flex flex-col space-y-5 max-h-56 overflow-auto px-4 sm:px-6 pb-0.5">
        {cart.articles.map((article, i) => (
          <CartArticle article={article} key={i} index={i} />
        ))}
      </div>

      {cart.articles.length > 0 ? (
        <div className="flex flex-col justify-around mt-5 px-4 sm:px-6">
          <div className="border-t-2 border-light-grey mb-1"></div>
          <div className="flex flex-row justify-between">
            <p className="font-medium">{cart.numberOfArticles} articles</p>
            <p className="font-medium">{cart.articlesSum} €</p>
          </div>
          {cart.orderType === 0 && (
            <div className="flex flex-row justify-between">
              <p className="font-medium">Frais de livraison</p>
              <p className="font-medium">{orderSettings.deliveryFees} €</p>
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
                placeholder="Ajouter un message"
                style={{ resize: 'none' }}
                className="block h-12 w-full rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                defaultValue={''}
              />
              <DefaultBtn
                value={"Commander"}
                className="w-72 h-10 text-xl font-bold bg-success hover:opacity-90 self-center"
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-4xl text-dark-grey font-bold text-center">
          Remplis moi la besace <br /> J'ai trop faim !
        </p>
      )}
    </div>
  );
}
