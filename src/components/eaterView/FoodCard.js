import { useEffect, useState } from "react";
import AddBtn from "../ui/AddBtn";
import ModalFood from "./ModalFood";

import { useDispatch, useSelector } from "react-redux";
import {
  addArticleToCart,
  incrementArticleQuantity,
} from "../../redux/cart/cartSlice";

import findIndexOfArticleInCart from "../../utils/findIndexOfArticleInCart";
export default function FoodCard({ food, foodCategoryIndex }) {
  const dispatch = useDispatch();
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

  const handleAddArticleToCart = () => {
    const newArticle = {
      value: food.value,
      food: food._id,
      price: food.price,
      quantity: 1,
      selectedOptions: [],
      selectedSupplements: [],
      foodCategoryIndex: foodCategoryIndex,
    };
    //if cart already contains this article object -> increment
    // /!\ This code is also present in foodCard.js please pay attention to change it in this file too
    const articleIndex = findIndexOfArticleInCart(
      newArticle,
      cart.data.articles
    );

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
  };

  const onClickAddBtn = () => {
    food.options.length > 0 || food.supplements.length > 0
      ? setModalOpen(true)
      : handleAddArticleToCart();
  };

  return (
    <>
      <button
        className="flex flex-row items-center justify-between w-full sm:w-11/12 min-h-32 h-auto bg-magnolia rounded-lg border border-gravel mt-3 mb-3 p-4 hover:brightness-95"
        onClick={onClickAddBtn}
      >
        <div className="flex flex-col justify-between items-start h-full">
          <p className="font-extrabold">{food.value}</p>
          <p className=" text-start">{food.description}</p>
          <p className="font-bold"> {food.price + " €"}</p>
        </div>
        <div className="ml-4">
          {foodQuantityInCart ? (
            <button className="rounded-full l-8 w-8 pt-1 outline outline-primary  flex justify-center items-center font-bold text-xl text-primary">
              {foodQuantityInCart}
            </button>
          ) : (
            <AddBtn />
          )}
        </div>
      </button>

      <ModalFood
        open={isModalOpen}
        setOpen={setModalOpen}
        food={food}
        foodCategoryIndex={foodCategoryIndex}
      />
    </>
  );
}
