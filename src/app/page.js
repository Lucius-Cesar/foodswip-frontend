
"use client";
import { useState, useEffect, createRef, useRef} from "react";
import SideFoodCategories from "../components/eaterView/SideFoodCategories"
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
    <>
      <div className = "relative flex flex-row w-full h-full">
      <SideFoodCategories 
        foodCategories={menu.map(foodCategory => ({
          value: foodCategory.value,
          ref: foodCategory.ref
        }))}
        activeFoodCategory = {activeFoodCategory}
        onFoodCategoryClick={(index) => {
          setActiveFoodCategory(menu[index]);
          menu[index].ref.current.scrollIntoView({
            behavior: 'instant',
            block: 'start',
          });
        }}
        />

        <div className = "relative flex-row justify-center md:justify-start ps-12 w-full">
          <div className = "flex flex-col align-center justify-center"> 
          <div className = "h-24 w-72">
            <img className = "h-full w-full object-contain" src={`./images/${restaurant}/logo.png`} alt="Restaurant Logo" />
          </div>
            <TabBtn values = {commandTypes}/>
            {menu.map((foodCategory, i) => (
              <div key={i} ref = {foodCategory.ref} className ="w-full">
                <h1 className = "text-primary text-3xl mt-3 mb-3 font-bold">{foodCategory.value}</h1>
                {foodCategory.foods.map((food, j) => (
                  <FoodCard key={j} food={food} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <CartBtn className = "sticky top-5 right-0 me-5" onClick = {() => setIsCartOpen(!isCartOpen)}/>
        <Cart open={isCartOpen} setOpen = {setIsCartOpen}/>
      </div>
      </>
  )
}