"use client";
import { useState, useEffect, createRef, useRef } from "react";
import SideFoodCategories from "../components/eaterView/SideFoodCategories";

import OrderTabBtn from "../components/eaterView/OrderTabBtn";
import FoodCard from "../components/eaterView/FoodCard";
import CartBtn from "../components/eaterView/CartBtn";
import Cart from "../components/eaterView/Cart";
import RestaurantLogo from "@/components/RestaurantLogo";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import DeliveryIcon from "@/components/ui/icons/DeliveryIcon";
import MinOrderIcon from "@/components/ui/icons/MinOrderIcon";
import BarsIcon from "@/components/ui/icons/BarsIcon";

import { useSelector } from "react-redux";

export default function Home() {
  const restaurant = useSelector((state) => state.restaurant);
  const cart = useSelector((state) => state.cart);

  // Create a ref for each foodCategory to allow switching active food category while scrolling
  // and going to the selectedFoodCategory onClick in the sideFoodCategoriesMenu
  const menu = restaurant.menu.map((foodCategory) => ({
    ...foodCategory,
    ref: createRef(),
  }));

  const [activeFoodCategory, setActiveFoodCategory] = useState(menu[0]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false);

  //ref of the mainContainer to add scrolling event
  const mainContainer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // logic to execute while scrolling
      menu.forEach((foodCategory) => {
        const ref = foodCategory.ref;
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInsideTheFoodCategory = rect.top <= 0 && rect.bottom >= 0;

          if (isInsideTheFoodCategory) {
            setActiveFoodCategory(foodCategory);
          }
        }
      });
    };

    mainContainer.current.addEventListener("scroll", handleScroll);
    //component destruction
  }, [menu]);

  return (
    <div
      ref={mainContainer}
      className={`${
        isFoodCategoriesMenuOpen
          ? "overflow-hidden sm:overflow-auto"
          : "overflow-auto"
      } relative flex flex-row h-screen`}
    >
      <button
        className={`${
          isFoodCategoriesMenuOpen ? "hidden" : "block sm:hidden"
        } m-1 ms-2 sticky top-1 w-fit h-fit`}
        onClick={() => setFoodCategoriesMenuOpen(true)}
      >
        <BarsIcon className="h-9 w-auto" />
      </button>
      <SideFoodCategories
        open={isFoodCategoriesMenuOpen}
        setOpen={setFoodCategoriesMenuOpen}
        activeFoodCategory={activeFoodCategory}
        onFoodCategoryClick={(index) => {
          setFoodCategoriesMenuOpen(false);
          setActiveFoodCategory(menu[index]);
          menu[index].ref.current.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }}
      />

      <div className="relative flex-row justify-center sm:justify-start ps-0 sm:ps-12 w-full">
        <div className="flex flex-col items-center  sm:items-start">
          <div className="relative flex flex-row gap-1 sm:gap-2">
            <RestaurantLogo />
            <InfoIcon className="h-6 w-6 sm:h-8 sm:w-8 self-center" />
          </div>
          {cart.orderType === 0 && (
            <div className="flex flex-row justify-between w-64 sm:w-96">
              <div className="flex flex-row gap-1 sm:gap-2 pb-4 sm:pb-2">
                <DeliveryIcon className="h-4 w-auto" />
                <div className="flex flex-row gap-1 sm:gap-2">
                  <p className="text-xs sm:text-sm">Livraison</p>
                  <p className="text-xs sm:text-sm font-bold">{` ${restaurant.orderSettings.deliveryFees} €`}</p>
                </div>
              </div>

              <div className="flex flex-row gap-1 sm:gap-2">
                <MinOrderIcon className="h-4 w-4" />
                <div className="flex flex-row gap-1 sm:gap-2">
                  <p className="text-xs sm:text-sm">Min. commande</p>
                  <p className="text-xs sm:text-sm font-bold">{`${restaurant.orderSettings.deliveryMin} €`}</p>
                </div>
              </div>
            </div>
          )}
          <OrderTabBtn />
          {menu.map((foodCategory, i) => (
            <div
              key={i}
              ref={foodCategory.ref}
              className="w-full flex flex-col items-center sm:items-start px-5 sm:px-0 "
            >
              <h1 className="text-primary text-3xl mt-3 mb-3 font-bold">
                {foodCategory.value}
              </h1>
              {foodCategory.foods.map((food, j) => (
                <FoodCard key={j} food={food} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <CartBtn
        className={`${
          isFoodCategoriesMenuOpen ? "hidden sm:flex" : "flex"
        } sticky top-2 sm:top-5 right-0 me-2 sm:me-5`}
        onClick={() => setIsCartOpen(!isCartOpen)}
        isCartOpen={isCartOpen}
      />
      <Cart open={isCartOpen} setOpen={setIsCartOpen} variant="menu" />
    </div>
  );
}
