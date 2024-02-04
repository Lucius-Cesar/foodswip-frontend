import { useEffect, useState } from "react";
import AddBtn from "../ui/AddBtn";
import ModalFood from "./ModalFood";

import { useDispatch, useSelector } from "react-redux";
import {
  addArticleToCart,
  incrementArticleQuantity,
} from "../../redux/reducers/cart";

import findIndexOfArticleInCart from "../../utils/findIndexOfArticleInCart";
export default function FoodCard({ food, foodCategoryIndex }) {
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);

  const cart = useSelector((state) => state.cart);

  const handleAddArticleToCart = () => {
    const newArticle = {
      value: food.value,
      food: food._id,
      price: food.price,
      quantity: 1,
      options: [],
      supplements: [],
      categoryIndex: foodCategoryIndex,
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
    <div className="flex flex-row items-center justify-between w-full sm:w-11/12 min-h-32 h-auto bg-magnolia rounded-lg border border-gravel mt-3 mb-3 p-4">
      <div className="flex flex-col justify-between h-full">
        <p className="font-extrabold">{food.value}</p>
        <p>{food.description}</p>
        <p className="font-bold"> {food.price + " €"}</p>
      </div>
      <AddBtn onClick={onClickAddBtn} />
      <ModalFood
        open={isModalOpen}
        setOpen={setModalOpen}
        food={food}
        foodCategoryIndex={foodCategoryIndex}
      />
    </div>
  );
}
