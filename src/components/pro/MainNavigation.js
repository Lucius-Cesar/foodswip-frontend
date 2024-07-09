import BarsIcon from "../ui/icons/BarsIcon";
import Link from "next/link";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
export const MainNavigationButton = ({ open, setOpen }) => {
  return (
    <button
      className={`${open && "hidden"} p-2 h-11 w-11 hover:opacity-90`}
      onClick={() => {
        setOpen(true);
      }}
    >
      <BarsIcon className="" />
    </button>
  );
};
export function MainNavigationMenu({ className, open, setOpen }) {
  const pathName = usePathname();
  const navigationItems = [
    { value: "Commandes", link: "/pro/order-manager", subitems: [] },
    {
      value: "Paramètres",
      link: "/pro/settings?q=restaurant",
      subitems: [],
    },
  ];
  return (
    <div
      className={`${
        open ? "fixed bg-white flex" : "hidden"
      } z-50 flex-col justify-center h-screen w-full top-0`}
    >
      <button
        type="button"
        className="absolute rounded-md bg-white text-gray-400 hover:text-gray-500 h-fit width-fit top-4 right-6"
        onClick={() => setOpen(false)}
      >
        <span className="absolute -inset-2.5" />
        <span className="sr-only">Close menu</span>
        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
      </button>
      <div className="flex flex-col justify-center items-center gap-10">
        {navigationItems.map((item, i) => (
          <div className="w-auto">
            <button
              onClick={() => {
                item.link.includes(pathName) && setOpen(false);
              }}
            >
              <Link
                className={`mt-3 mb-3 ${
                  i === 0
                    ? "mt-auto"
                    : i === navigationItems.length - 1
                    ? "mb-auto"
                    : ""
                }`}
                href={item.link}
                key={i}
              >
                <h1
                  className={`${
                    //allow to ignore query params
                    item.link.includes(pathName)
                      ? "text-primary"
                      : "text-medium-grey"
                  }`}
                >
                  {item.value}
                </h1>
              </Link>
            </button>
            <div className="ps-8">
              {item.subitems.map((subitem, j) => (
                <Link key={j} href={subitem.link}>
                  <h2>{subitem.value}</h2>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
