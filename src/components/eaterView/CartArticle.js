import AddBtn from "../ui/AddBtn";
import MinusBtn from "../ui/MinusBtn";

import {
  incrementArticleQuantity,
  decrementArticleQuantity,
} from "@/redux/reducers/cart";
import { useDispatch } from "react-redux";

import { multiplyMoney } from "../../utils/moneyCalculations";

export default function CartArticle({ article, index }) {
  const dispatch = useDispatch();
  const handleAddBtn = () => {
    dispatch(incrementArticleQuantity({ index: index, increment: 1 }));
  };
  const handleMinusBtn = () => {
    dispatch(decrementArticleQuantity(index));
  };
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-1">
          <p className="font-bold">{article.quantity}</p> <p>X</p>{" "}
          <p className="font-bold">{article.value}</p>
        </div>
        <p className="font-bold">
          {multiplyMoney(article.quantity, article.price)} €
        </p>
      </div>
      {article.selectedOptions.length > 0 && (
        <p className="text-sm">
          {article.selectedOptions.map((option) => option.value).join(", ")}
        </p>
      )}
      {article.selectedSupplements.length > 0 && (
        <p className="text-sm ">
          Suppléments:{" "}
          {article.selectedSupplements
            .map((supplements) => supplements.value)
            .join(", ")}
        </p>
      )}
      <div className="flex flex-row justify-start space-x-2">
        <MinusBtn onClick={handleMinusBtn} /> <AddBtn onClick={handleAddBtn} />
      </div>
    </div>
  );
}
