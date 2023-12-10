"use client";

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function SideFoodCategories({foodCategories, activeFoodCategory, onFoodCategoryClick}) {
    return (
        <div className ="flex flex-col justify-center h-screen w-screen sm:sticky sm:top-0 sm:w-80">
            <FontAwesomeIcon className ="self-end text-dark-grey absolute top-6 pe-6 sm:hidden" icon = {faX} size = "2xl"></FontAwesomeIcon>
            <div className = "flex flex-col justify-center items-center overflow-y-auto  h-5/6 w-screen sm:w-full sm:border-r-2 border-light-grey">
                {foodCategories.map((foodCategory,i) => <button type = "button" className ={`font-bold ${foodCategory.value === activeFoodCategory.value ? "text-primary":"text-medium-grey"} text-3xl mt-3 mb-3`} 
                key = {i}
                onClick = {() => onFoodCategoryClick(i)}
                >{foodCategory.value}</button>)}
            </div>
        </div>
    )
  }