
"use client";
import { useState, useEffect, createRef, useRef} from "react";
import SideFoodCategories from "../components/eaterView/SideFoodCategories"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TabBtn from "../components/ui/TabBtn"
import FoodCard from "../components/eaterView/FoodCard"
import exampleMenu from "../utils/exampleMenu"

import Image from 'next/image';
import CartBtn from "../components/eaterView/CartBtn"
import Cart from "../components/eaterView/Cart"

export default function Home() {
  const [restaurant, setRestaurant] = useState('dodopizza')
  const commandTypes = ["Livraison", "À emporter"]

  const menuWithRefs = exampleMenu.map((foodCategory) => ({
    ...foodCategory,
    ref: createRef(),
  }));

  const [menu, setMenu] = useState(menuWithRefs)
  const [activeFoodCategory, setActiveFoodCategory] = useState(exampleMenu[0]);

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFoodCategoriesMenuOpen, setFoodCategoriesMenuOpen] = useState(false)


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


      window.addEventListener('scroll', handleScroll);
      //component destruction
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [menu]);


return(
    <body className = {`${isFoodCategoriesMenuOpen ? "overflow-hidden sm:overflow-auto" : "overflow-auto"}`}>
      <div className = "relative flex flex-row">
      <button className = {`${isFoodCategoriesMenuOpen ? "hidden" : "block sm:hidden"} sticky top-2 left-2 w-fit h-fit`} onClick = {() => setFoodCategoriesMenuOpen(true)}>
      <FontAwesomeIcon icon = {faBars} size = "2xl"/> 
      </button>
      <SideFoodCategories 
        open = {isFoodCategoriesMenuOpen}
        setOpen = {setFoodCategoriesMenuOpen}
        foodCategories={menu.map(foodCategory => ({
          value: foodCategory.value,
          ref: foodCategory.ref
        }))}
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
            <img className = "h-full w-full object-contain" src={`./images/${restaurant}/logo.png`} alt="Restaurant Logo" />
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
      </body>
  )
}