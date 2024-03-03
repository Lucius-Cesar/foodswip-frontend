import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon.js";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Header(isSettingsActive = false) {
  return (
    <>
      <div className="sticky top-0 flex flex-row justify-between items-center h-18 p-6">
        <div className="ml-auto mr-auto">
          <FoodSwipIcon />
        </div>
        <button>
          <Cog6ToothIcon
            className={`h-10 w-10 ${
              isSettingsActive ? "text-primary" : "text-dark-grey"
            }`}
          />
        </button>
      </div>
    </>
  );
}
