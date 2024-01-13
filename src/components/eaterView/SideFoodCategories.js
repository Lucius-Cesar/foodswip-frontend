"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function SideFoodCategories({
  activeFoodCategory,
  onFoodCategoryClick,
  open,
  setOpen,
}) {
  const menu = useSelector((state) => state.restaurant.value.menu);
  return (
    <div
      className={`${
        open ? "fixed bg-white flex" : "hidden"
      } sm:bg-none z-10 sm:flex flex-col justify-center h-dvh w-screen sm:sticky top-0 sm:w-80`}
    >
      <button
        type="button"
        className="sm:hidden absolute rounded-md bg-white text-gray-400 hover:text-gray-500 h-fit width-fit top-4 right-6"
        onClick={() => setOpen(false)}
      >
        <span className="absolute -inset-2.5" />
        <span className="sr-only">Close menu</span>
        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
      </button>
      <div className="self-center flex flex-col justify-center items-center overflow-y-auto h-5/6 w-screen sm:w-full border-r-2 border-light-grey">
        {menu.map((foodCategory, i) => (
          <button
            type="button"
            className={`${
              foodCategory.value === activeFoodCategory.value
                ? "text-primary"
                : "text-medium-grey"
            } mt-3 mb-3`}
            key={i}
            onClick={() => onFoodCategoryClick(i)}
          >
            <h1>{foodCategory.value}</h1>
          </button>
        ))}
      </div>
    </div>
  );
}
