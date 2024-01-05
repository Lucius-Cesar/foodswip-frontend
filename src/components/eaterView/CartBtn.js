import CartIcon from "../ui/icons/CartIcon";
import { useState } from "react";

import { useSelector } from "react-redux";
export default function CartBtn({ className, onClick, isCartOpen }) {
  const numberOfArticles = useSelector((state) => state.cart.numberOfArticles);

  const [isHovered, setIsHovered] = useState(false);
  const primary = "#F97247";
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <button
      type="button"
      className={`flex justify-center items-center rounded-3xl ${
        isHovered || isCartOpen
          ? "bg-white outline outline-primary"
          : "bg-primary"
      } rounded-xl h-fit w-fit sm:rounded-2xl ${className}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onClick}
    >
      <div className="h-10 w-10 sm:h-16 sm:w-16 relative">
        <CartIcon
          color={isHovered || isCartOpen ? primary : "white"}
          className="w-full h-full"
        />
        <div className="absolute leading-6 w-6 sm:leading-7 sm:w-7 -bottom-2 -left-2 rounded-full bg-gravel flex items-center justify-center">
          {numberOfArticles > 0 && (
            <p className="text-white font-bold text-base sm:text-lg">
              {numberOfArticles}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
