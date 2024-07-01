"use client";
import { useState, useEffect, createRef, useRef } from "react";

import SideFoodCategories from "../../../components/menu/SideFoodCategories";
import OrderTabBtn from "@/components/menu/OrderTabBtn";
import FoodCard from "@/components/menu/FoodCard";
import CartBtn from "@/components/menu/CartBtn";
import Cart from "@/components/menu/Cart";
import { RestaurantLogo } from "@/components/ui/RestaurantLogo";
import InfoIcon from "@/components/ui/icons/InfoIcon";
import DeliveryIcon from "@/components/ui/icons/DeliveryIcon";
import MinOrderIcon from "@/components/ui/icons/MinOrderIcon";
import BarsIcon from "@/components/ui/icons/BarsIcon";
import ModalInfoRestaurant from "@/components/menu/ModalInfoRestaurant";
import ModalFood from "@/components/menu/ModalFood";
import Preloader from "@/components/ui/Preloader";
import { useSelector, useDispatch } from "react-redux";
import TopBannerClosed from "@/components/menu/TopBannerClosed";
import useRestaurantData from "@/hooks/useRestaurantData";
import useCheckRestaurantStatus from "@/hooks/useCheckRestaurantStatus";
import {
  addArticleToCart,
  incrementArticleQuantity,
} from "@/redux/cart/cartSlice";

import findIndexOfArticleInCart from "@/utils/findIndexOfArticleInCart";

export default function eaterView({ params }) {
  const dispatch = useDispatch();
  useRestaurantData(params.slug, "restaurantPublic");
  //redux
  const restaurant = useSelector((state) => state.restaurantPublic);
  console.log(restaurant.data);
  const cart = useSelector((state) => state.cart);
  //react states
  const {
    restaurantOpen,
    currentService,
    remainingServicesForToday,
    restaurantStatus,
  } = useCheckRestaurantStatus(restaurant);
  const [menu, setMenu] = useState(null);
  const [activeFoodCategoryIndex, setActiveFoodCategoryIndex] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false);
  const [isModalInfoRestaurantOpen, setModalInfoRestaurantOpen] =
    useState(false);
  const [isModalFoodOpen, setIsModalFoodOpen] = useState(false);
  const [food, setFood] = useState(null);

  //ref of the mainContainer to add scrolling event
  const mainContainer = useRef(null);

  const handleAddArticleToCart = (food) => {
    const newArticle = {
      value: food.value,
      food: food._id,
      price: food.price,
      quantity: 1,
      selectedOptions: [],
    };
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

  //extract restaurant unique value based on URL and fetch restaurant data

  useEffect(() => {
    if (!restaurant?.data?.menu) return;
    setMenu(
      restaurant.data.menu.map((foodCategory) => ({
        ...foodCategory,
        ref: createRef(), //create ref for each foodCategory to scroll on it onClick on click and highlight active foodCategory
      }))
    );
  }, [restaurant?.data?.menu]);

  useEffect(() => {
    if (menu && !restaurant.error && !restaurant.isLoading) {
      const handleScroll = () => {
        // logic to execute while scrolling
        menu.forEach((foodCategory, i) => {
          const ref = foodCategory.ref;
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const isInsideTheFoodCategory = rect.top <= 0 && rect.bottom >= 0;

            if (isInsideTheFoodCategory) {
              setActiveFoodCategoryIndex(i);
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
      {(restaurant.isLoading || !menu) && <Preloader />}
      {!restaurant.error && !restaurant.isLoading && menu && (
        <div className="h-svh overflow-clip">
          {!restaurantOpen && (
            <TopBannerClosed onClick={() => setModalInfoRestaurantOpen(true)} />
          )}

          <div
            ref={mainContainer}
            className={`${
              isFoodCategoriesMenuOpen
                ? "overflow-hidden sm:overflow-auto"
                : "overflow-auto"
            } relative sm:flex sm:flex-row h-screen w-screen p-0`}
          >
            <div className="sticky top-3 z-50">
              <button
                className={`${
                  isFoodCategoriesMenuOpen ? "hidden" : "block sm:hidden"
                } ms-2 absolute w-fit h-fit`}
                onClick={() => setFoodCategoriesMenuOpen(true)}
              >
                <BarsIcon className="h-7 w-auto" />
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
              activeFoodCategoryIndex={activeFoodCategoryIndex}
              onFoodCategoryClick={(index) => {
                setFoodCategoriesMenuOpen(false);
                setActiveFoodCategoryIndex(menu[index]);
                //scroll Margin needed because of the top bar when restaurant is closed
                menu[index].ref.current.style.scrollMargin = restaurantOpen
                  ? "-5px"
                  : "-45px";
                menu[index].ref.current.scrollIntoView({
                  block: "start",
                });
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
                    <MinOrderIcon className="h-4 w-3" />
                    <div className="flex flex-row gap-1 sm:gap-2">
                      <p className="text-xs sm:text-sm">Min. commande</p>
                      <p className="text-xs sm:text-sm font-bold">{`${restaurant.data?.publicSettings?.deliveryMin} €`}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="sticky sm:relative pt-2 pb-2 sm:pt-0 top-0 w-full sm:w-auto flex justify-center sm:block bg-white sm:bg-none sm:py-0">
                <OrderTabBtn
                  currentService={currentService}
                  remainingServicesForToday={remainingServicesForToday}
                  restaurantStatus={restaurantStatus}
                />
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
                      <FoodCard
                        key={j}
                        food={food}
                        setFood={setFood}
                        onClick={() => {
                          if (food.optionGroups.length > 0) {
                            setFood(food);
                            setIsModalFoodOpen(true);
                          } else {
                            handleAddArticleToCart(food);
                          }
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <ModalFood
                open={isModalFoodOpen}
                setOpen={setIsModalFoodOpen}
                food={food}
              />
            </div>
            <Cart open={isCartOpen} setOpen={setIsCartOpen} variant="menu" />
          </div>
        </div>
      )}
    </>
  );
}
