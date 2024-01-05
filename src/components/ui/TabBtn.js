import { useState } from "react";
export default function TabBtn({ values, currentTab, onClickTab }) {
  return (
    <div className="flex flex-row justify-center items-center bg-light-grey w-fit h-fit p-1 rounded-s-full rounded-e-full">
      {values.map((value, i) => (
        <button
          type="button"
          onClick={() => {
            /* click not allowed is value is disabled */ !value?.enabled
              ? null
              : onClickTab(i);
          }}
          key={i}
          className={`${
            /* pointer not allowed if value is disabled */ !value?.enabled
              ? "cursor-not-allowed pointer-events-auto"
              : currentTab === i
              ? "bg-primary focus:bg-primary focus:text-white text-white"
              : "bg-light-grey text-dark-grey hover:bg-light-grey-700"
          } h-8 w-32 sm:w-48 table ps-5 pe-5 rounded-s-full rounded-e-full`}
        >
          {
            typeof value === "string"
              ? value
              : value.label /* value.value if object*/
          }
        </button>
      ))}
    </div>
  );
}
