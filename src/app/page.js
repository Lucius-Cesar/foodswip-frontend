"use client";
import { useState, useEffect, createRef, useRef} from "react";
import SideFoodCategories from "../components/eaterView/SideFoodCategories"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TabBtn from "../components/ui/TabBtn"
import FoodCard from "../components/eaterView/FoodCard"

import Image from 'next/image';
import CartBtn from "../components/eaterView/CartBtn"
import Cart from "../components/eaterView/Cart"

import { useSelector } from "react-redux";

export default function Home() {
  const restaurant = useSelector(state => state.restaurant)
  const commandTypes = ["Livraison", "À emporter"]

  // Create a ref for each foodCategory to allow switching active food category while scrolling 
  // and going to the selectedFoodCategory onClick in the sideFoodCategoriesMenu
  const menu = restaurant.menu.map((foodCategory) => ({
    ...foodCategory,
    ref: createRef(),
  }));

  const [activeFoodCategory, setActiveFoodCategory] = useState(menu[0]);

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false)

  //ref of the mainContainer to add scrolling event   
  const mainContainer = useRef(null)

    useEffect(() => {
      const handleScroll = () => {
        // logic to execute while scrolling
        menu.forEach(foodCategory => {
          const ref = foodCategory.ref;
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const isInsideTheFoodCategory = (
              rect.top <= 0 &&
              rect.bottom >= 0 
            );
  
            if (isInsideTheFoodCategory) {
              setActiveFoodCategory(foodCategory)            
            }
          }
        }
          )
      };


      mainContainer.current.addEventListener('scroll', handleScroll);
      //component destruction
    }, [menu]);


return(
  <div ref = {mainContainer} className = {`${isFoodCategoriesMenuOpen ? "overflow-hidden sm:overflow-auto" : "overflow-auto"} relative flex flex-row h-screen`}>
  <button className = {`${isFoodCategoriesMenuOpen ? "hidden" : "block sm:hidden"} sticky top-2 left-2 w-fit h-fit`} onClick = {() => setFoodCategoriesMenuOpen(true)}>
      <FontAwesomeIcon icon = {faBars} size = "2xl"/> 
      </button>
      <SideFoodCategories 
        open = {isFoodCategoriesMenuOpen}
        setOpen = {setFoodCategoriesMenuOpen}
        activeFoodCategory = {activeFoodCategory}
        onFoodCategoryClick={(index) => {
          setFoodCategoriesMenuOpen(false)
          setActiveFoodCategory(menu[index]);
          menu[index].ref.current.scrollIntoView({
            behavior: 'instant',
            block: 'start',
          });
        }}
        />

        <div className = "relative flex-row justify-center sm:justify-start ps-0 sm:ps-12 w-full">
          <div className = "flex flex-col items-center  sm:items-start"> 
          <div className = "h-14 w-56 sm:h-24 sm:w-72">
            <img className = "h-full w-full object-contain" src={`./images/${restaurant.uniqueValue}/logo.png`} alt="Restaurant Logo" />
          </div>
            <TabBtn values = {commandTypes}/>
            {menu.map((foodCategory, i) => (
              <div key={i} ref = {foodCategory.ref} className ="w-full flex flex-col items-center sm:items-start">
                <h1 className = "text-primary text-3xl mt-3 mb-3 font-bold">{foodCategory.value}</h1>
                {foodCategory.foods.map((food, j) => (
                  <FoodCard key={j} food={food} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <CartBtn className = {`${isFoodCategoriesMenuOpen ? "hidden sm:flex" : "flex"} sticky top-2 sm:top-5 right-0 me-2 sm:me-5`} onClick = {() => setIsCartOpen(!isCartOpen)} isCartOpen = {isCartOpen}/>
        <Cart open={isCartOpen} setOpen = {setIsCartOpen}/>
      </div>
  )
}