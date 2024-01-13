"use client";
import { useState, useEffect, createRef, useRef } from "react";
import { usePathname } from "next/navigation";

import SideFoodCategories from "../../../components/eaterView/SideFoodCategories";
import OrderTabBtn from "@/components/eaterView/OrderTabBtn";
import FoodCard from "@/components/eaterView/FoodCard";
import CartBtn from "@/components/eaterView/CartBtn";
import Cart from "@/components/eaterView/Cart";
import RestaurantLogo from "@/components/RestaurantLogo";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import DeliveryIcon from "@/components/ui/icons/DeliveryIcon";
import MinOrderIcon from "@/components/ui/icons/MinOrderIcon";
import BarsIcon from "@/components/ui/icons/BarsIcon";
import ModalInfoRestaurant from "@/components/eaterView/ModalInfoRestaurant";
import { useSelector, useDispatch } from "react-redux";

import TopBannerClosed from "@/components/eaterView/TopBannerClosed";
import isRestaurantOpen from "@/utils/isRestaurantOpen";
import { fetchRestaurant } from "../../redux/reducers/restaurant";

export default function eaterView() {
  const pathname = usePathname();

  //redux
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant);

  const cart = useSelector((state) => state.cart);

  //react states
  const [restaurantOpen, setRestaurantOpen] = useState(true);
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
    const pathnameParts = pathname.split("/");
    const restaurantUniqueValue = pathnameParts[pathnameParts.length - 1];
    dispatch(fetchRestaurant(restaurantUniqueValue));
  }, [pathname]);

  useEffect(() => {
    if (
      restaurant.value.restaurantSettings?.schedule &&
      restaurant.value.restaurantSettings?.exceptionnalClosings
    ) {
      const checkRestaurantOpen = isRestaurantOpen(
        restaurant.value.restaurantSettings.schedule,
        restaurant.value.restaurantSettings.exceptionnalClosings
      );
      setRestaurantOpen(checkRestaurantOpen);
      setScrollBarHeight(checkRestaurantOpen ? "0px" : "-45px"); //scrollBarHeight -45bx needed when topBanner
    }
    if (restaurant.value.menu) {
      setMenu(
        restaurant.value.menu.map((foodCategory) => ({
          ...foodCategory,
          ref: createRef(), //create ref for each foodCategory to scroll on it onClick on click and highlight active foodCategory
        }))
      );
      setActiveFoodCategory(restaurant.value.menu[0]);
    }
  }, [restaurant.value]);

  useEffect(() => {
    if (menu) {
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
      {restaurant.isLoading && <p>loading ...</p>}
      {menu && (
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
                console.log(scrollBarHeight);
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
                      <p className="text-xs sm:text-sm font-bold">{` ${restaurant.value.orderSettings.deliveryFees} €`}</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-1 sm:gap-2">
                    <MinOrderIcon className="h-4 w-4" />
                    <div className="flex flex-row gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm">Min. commande</p>
                      <p className="text-xs sm:text-sm font-bold">{`${restaurant.value.orderSettings.deliveryMin} €`}</p>
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
      )}
    </>
  );
}
