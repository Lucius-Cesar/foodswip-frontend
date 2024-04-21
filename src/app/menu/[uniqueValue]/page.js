"use client";
import { useState, useEffect, createRef, useRef } from "react";
import { usePathname } from "next/navigation";

import SideFoodCategories from "../../../components/eaterView/SideFoodCategories";
import OrderTabBtn from "@/components/eaterView/OrderTabBtn";
import FoodCard from "@/components/eaterView/FoodCard";
import CartBtn from "@/components/eaterView/CartBtn";
import Cart from "@/components/eaterView/Cart";
import RestaurantLogo from "@/components/ui/RestaurantLogo";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import DeliveryIcon from "@/components/ui/icons/DeliveryIcon";
import MinOrderIcon from "@/components/ui/icons/MinOrderIcon";
import BarsIcon from "@/components/ui/icons/BarsIcon";
import ModalInfoRestaurant from "@/components/eaterView/ModalInfoRestaurant";
import Preloader from "@/components/ui/Preloader";
import { useSelector, useDispatch } from "react-redux";
import TopBannerClosed from "@/components/eaterView/TopBannerClosed";
import checkIfRestaurantOpen from "@/utils/checkIfRestaurantOpen";
import useRestaurantData from "@/hooks/useRestaurantData";
import useCheckRestaurantStatus from "@/hooks/useCheckRestaurantStatus";
import useMouseFlow from "@/hooks/useMouseFlow";

export default function eaterView({ params }) {
  useRestaurantData(params.uniqueValue, "restaurantPublic");
  //redux
  const restaurant = useSelector((state) => state.restaurantPublic);
  const cart = useSelector((state) => state.cart);

  //react states
  const { restaurantOpen, setRestaurantOpen } =
    useCheckRestaurantStatus(restaurant);
  const [scrollBarHeight, setScrollBarHeight] = useState("0px");
  const [menu, setMenu] = useState(null);
  const [activeFoodCategory, setActiveFoodCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false);
  const [isModalInfoRestaurantOpen, setModalInfoRestaurantOpen] =
    useState(false);

  //ref of the mainContainer to add scrolling event
  const mainContainer = useRef(null);

  //extract restaurant unique value based on URL and fetch restaurant data

  useEffect(() => {
    if (
      restaurant.data.publicSettings?.schedule &&
      restaurant.data.publicSettings?.exceptionalClosings
    ) {
      setScrollBarHeight(restaurantOpen ? "-10px" : "-45px"); //scrollBarHeight -45px needed when topBanner
    }
    if (restaurant.data.menu) {
      setMenu(
        restaurant.data.menu.map((foodCategory) => ({
          ...foodCategory,
          ref: createRef(), //create ref for each foodCategory to scroll on it onClick on click and highlight active foodCategory
        }))
      );
      setActiveFoodCategory(restaurant.data.menu[0]);
    }
  }, [restaurant.data]);

  useEffect(() => {
    if (menu && !restaurant.error && !restaurant.isLoading) {
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
    }
  }, [menu]);

  return (
    <>
      {restaurant.error && <p className="error-danger">{restaurant.error}</p>}
      {restaurant.isLoading && <Preloader />}
      {!restaurant.error && !restaurant.isLoading && menu && (
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
              <div className="relative flex flex-row items-center justify-center   me-4 mt-2 mb-4  sm:me-6 sm:my-6">
                <RestaurantLogo from={"restaurantPublic"} />
                <button
                  className="absolute -right-8 sm:-right-14"
                  onClick={() => setModalInfoRestaurantOpen(true)}
                >
                  <InfoIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
                <ModalInfoRestaurant
                  open={isModalInfoRestaurantOpen}
                  setOpen={setModalInfoRestaurantOpen}
                />
              </div>
              {cart.data.orderType === 0 && (
                <div className="flex flex-row justify-between w-64 sm:w-96 pb-2">
                  <div className="flex flex-row gap-1 sm:gap-2">
                    <DeliveryIcon className="h-4 w-auto" />
                    <div className="flex flex-row gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm">Livraison</p>
                      <p className="text-xs sm:text-sm font-bold">{` ${restaurant.data?.publicSettings?.deliveryFees} €`}</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-1 sm:gap-2">
                    <MinOrderIcon className="h-4 w-4" />
                    <div className="flex flex-row gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm">Min. commande</p>
                      <p className="text-xs sm:text-sm font-bold">{`${restaurant.data?.publicSettings?.deliveryMin} €`}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="sticky sm:relative pt-2 pb-2 sm:pt-0 top-0 w-full sm:w-auto flex justify-center sm:block bg-white sm:bg-none sm:py-0">
                <OrderTabBtn />
              </div>
              <div className="flex flex-col w-full pb-24">
                {menu.map((foodCategory, i) => (
                  <div
                    key={i}
                    ref={foodCategory.ref}
                    className="w-full flex flex-col items-center sm:items-start p-2 sm:p-0"
                  >
                    <h1 className="font-title text-primary mt-12 mb-3">
                      {foodCategory.title}
                    </h1>
                    {foodCategory.foods.map((food, j) => (
                      <FoodCard key={j} food={food} foodCategoryIndex={i} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <Cart open={isCartOpen} setOpen={setIsCartOpen} variant="menu" />
          </div>
        </div>
      )}
    </>
  );
}
