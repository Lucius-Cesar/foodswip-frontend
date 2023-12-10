
"use client";
import { useState } from "react";
import SideFoodCategories from "../components/eaterView/SideFoodCategories"
import TabBtn from "../components/ui/TabBtn"
import FoodCard from "../components/eaterView/FoodCard"
import menu from "../utils/exampleMenu"

export default function Home() {
  const [restaurant, setRestaurant] = useState('dodopizza')
  const commandTypes = ["Livraison", "À emporter"]

  const [activeFoodCategory, setActiveFoodCategory] = useState(menu[0]);


return(
    <>
      <div className = "relative flex flex-row">
        <SideFoodCategories foodCategories = {menu.map(foodCategory => foodCategory.value)}  activeFoodCategory = {activeFoodCategory.value}/>
        <div className = "relative flex-row justify-center md:justify-start ps-12 w-full">
          <div className = "flex flex-col align-center justify-center"> 
          <div className = "h-24 w-72">
            <img  className = "h-full w-full object-contain" src={`./images/${restaurant}/logo.png`} alt="Restaurant Logo" />
          </div>
            <TabBtn values = {commandTypes}/>
            {menu.map((foodCategory, i) => (
              <div key={i} className ="w-full">
                <h1 className = "text-primary text-3xl mt-3 mb-3 font-bold">{foodCategory.value}</h1>
                {foodCategory.foods.map((food, j) => (
                  <FoodCard key={j} food={food} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  )
}