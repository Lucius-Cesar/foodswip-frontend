import { useEffect, useState } from "react";
import AddBtn from "../ui/AddBtn";

import { useDispatch, useSelector } from "react-redux";

export default function FoodCard({ food, onClick }) {
  const cart = useSelector((state) => state.cart);

  const [isModalOpen, setModalOpen] = useState(false);
  const [foodQuantityInCart, setFoodQuantityInCart] = useState(null);

  function sumFoodQuantityInCart() {
    // check if food is already in cart articles to display food quantity instead of add btn
    let totalQuantity = 0;

    // Vérifier si le panier et la nourriture sont définis
    // Parcourir tous les articles dans le panier
    cart.data.articles.forEach((article) => {
      // Vérifier si l'ID de la nourriture correspond à l'ID de la nourriture de l'article
      if (article.food === food._id) {
        // Si la correspondance est trouvée, ajouter la quantité de l'article à la somme totale
        totalQuantity += article.quantity;
      }
    });
    totalQuantity !== foodQuantityInCart &&
      setFoodQuantityInCart(totalQuantity);
  }

  useEffect(() => {
    sumFoodQuantityInCart();
  }, [cart.data.articles]);

  return (
    <>
      <button
        className="flex flex-row items-center justify-between w-full sm:w-11/12 min-h-32 h-auto bg-magnolia rounded-lg border border-gravel mt-3 mb-3 p-4 sm:hover:brightness-95"
        onClick={() => onClick()}
      >
        <div className="flex flex-col justify-between items-start h-full me-4">
          <p className="font-extrabold">{food.value}</p>
          <p className=" text-start">{food.description}</p>
          <p className="font-bold"> {food.price + " €"}</p>
        </div>
        {foodQuantityInCart ? (
          <button className="rounded-full outline outline-primary p-1  text-primary shadow-sm h-fit w-fit">
            <div className="h-6 w-6 text-center font-bold text-xl">
              {foodQuantityInCart}
            </div>
          </button>
        ) : (
          <AddBtn />
        )}
      </button>
    </>
  );
}
