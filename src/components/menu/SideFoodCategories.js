"use client";

import { useEffect, useState, useRef, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

export default function SideFoodCategories({
  activeFoodCategoryIndex,
  onFoodCategoryClick,
  open,
  setOpen,
}) {
  const menu = useSelector((state) => state.restaurantPublic.data.menu).map(
    (foodCategory) => ({
      ...foodCategory,
      ref: createRef(), //create ref for each foodCategory
    })
  );

  const sideMenuContainer = useRef(null);

  useEffect(() => {
    //this useEffect check if activeFoodCategory is visible in current scroll, if not scroll into it
    if (menu) {
      const ref = menu[activeFoodCategoryIndex]?.ref;
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top > 0 && rect.bottom <= window.innerHeight;
        if (!isVisible) {
          ref.current.scrollIntoView({ block: "start" });
        }
      }
    }
  }, [menu, activeFoodCategoryIndex]);

  return (
    <div
      className={`${
        open ? "fixed bg-white flex" : "hidden"
      } sm:bg-none z-10 sm:flex flex-col justify-center h-dvh w-screen sm:sticky top-0 sm:w-80`}
      ref={sideMenuContainer}
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
      <div className="self-center flex flex-col items-center overflow-y-auto overflow-x-hidden h-5/6 w-screen sm:w-full border-r-2 border-light-grey  px-4">
        {menu.map((foodCategory, i) => (
          <button
            type="button"
            className={`${
              i === activeFoodCategoryIndex
                ? "text-primary"
                : "text-medium-grey"
            } ${
              // mt auto on first item and margin bottom on last item to center , justify-content center bug if y-scroll
              i === 0 ? "mt-auto" : i === menu.length - 1 ? "mb-auto" : ""
            } mt-3 mb-3`}
            key={i}
            onClick={() => onFoodCategoryClick(i)}
            ref={foodCategory.ref}
          >
            <h1 className="font-title">{foodCategory.title}</h1>
          </button>
        ))}
      </div>
    </div>
  );
}
