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
import ModalInfoRestaurant from "@/components/eaterView/ModalInfoRestaurant";
TopBannerClosed;
import { useSelector } from "react-redux";
import TopBannerClosed from "@/components/eaterView/TopBannerClosed";
import isRestaurantOpen from "@/utils/isRestaurantOpen";

export default function Home() {
  const restaurant = useSelector((state) => state.restaurant);
  const cart = useSelector((state) => state.cart);
  const [restaurantOpen, setRestaurantOpen] = useState(null);

  // Create a ref for each foodCategory to allow switching active food category while scrolling
  // and going to the selectedFoodCategory onClick in the sideFoodCategoriesMenu
  const menu = restaurant.menu.map((foodCategory) => ({
    ...foodCategory,
    ref: createRef(),
  }));

  const [activeFoodCategory, setActiveFoodCategory] = useState(menu[0]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false);

  const [isModalInfoRestaurantOpen, setModalInfoRestaurantOpen] =
    useState(false);

  //ref of the mainContainer to add scrolling event
  const mainContainer = useRef(null);

  let scrollBarHeight;
  useEffect(() => {
    const checkRestaurantOpen = isRestaurantOpen(
      restaurant.restaurantSettings.schedulde,
      restaurant.restaurantSettings.exceptionnalClosings
    );
    setRestaurantOpen(checkRestaurantOpen);
    scrollBarHeight = checkRestaurantOpen ? "0px" : "-45px";
  }, []);
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
    <div className="h-svh overflow-clip">
      {!restaurantOpen && <TopBannerClosed />}

      <div
        ref={mainContainer}
        className={`${
          isFoodCategoriesMenuOpen
            ? "overflow-hidden sm:overflow-auto"
            : "overflow-auto"
        } relative sm:flex sm:flex-row h-screen w-screen p-0`}
      >
        <div className="sticky top-0 z-10">
          <button
            className={`${
              isFoodCategoriesMenuOpen ? "hidden" : "block sm:hidden"
            } m-1 ms-2 absolute top-1 w-fit h-fit`}
            onClick={() => setFoodCategoriesMenuOpen(true)}
          >
            <BarsIcon className="h-9 w-auto" />
          </button>
        </div>

        <div className="sticky top-0 z-10 sm:order-last me-2 sm:me-5">
          <CartBtn
            className={`${
              isFoodCategoriesMenuOpen ? "hidden sm:block" : "block"
            } absolute sm:relative right-0 top-2 sm:top-5`}
            onClick={() => setIsCartOpen(!isCartOpen)}
            isCartOpen={isCartOpen}
          />
        </div>

        <SideFoodCategories
          open={isFoodCategoriesMenuOpen}
          setOpen={setFoodCategoriesMenuOpen}
          activeFoodCategory={activeFoodCategory}
          onFoodCategoryClick={(index) => {
            setFoodCategoriesMenuOpen(false);
            setActiveFoodCategory(menu[index]);
            //scroll Margin needed because of the top bar when restaurant is closed

            menu[index].ref.current.style.scrollMargin = scrollBarHeight;
            menu[index].ref.current.scrollIntoView({ block: "start" });
          }}
        />

        <div className="flex flex-col w-full sm:ps-12 items-center sm:items-start">
          <div className="relative flex flex-row gap-1 sm:gap-2">
            <RestaurantLogo className="h-14 w-48" />
            <button
              className="self-center"
              onClick={() => setModalInfoRestaurantOpen(true)}
            >
              <InfoIcon className="h-6 w-6 sm:h-8 sm:w-8 hover:" />
            </button>
            <ModalInfoRestaurant
              open={isModalInfoRestaurantOpen}
              setOpen={setModalInfoRestaurantOpen}
            />
          </div>
          {cart.orderType === 0 && (
            <div className="flex flex-row justify-between w-64 sm:w-96 pb-2">
              <div className="flex flex-row gap-1 sm:gap-2">
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
          <div className="sticky sm:relative pt-2 pb-2 sm:pt-0 top-0 w-full sm:w-auto flex justify-center sm:block  bg-white sm:bg-none sm:py-0">
            <OrderTabBtn />
          </div>
          <div className="flex flex-col w-full pb-14">
            {menu.map((foodCategory, i) => (
              <div
                key={i}
                ref={foodCategory.ref}
                className="w-full flex flex-col items-center sm:items-start p-2 sm:p-0"
              >
                <h1 className="text-primary mt-12 mb-3">
                  {foodCategory.value}
                </h1>
                {foodCategory.foods.map((food, j) => (
                  <FoodCard key={j} food={food} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <Cart open={isCartOpen} setOpen={setIsCartOpen} variant="menu" />
      </div>
    </div>
  );
}
