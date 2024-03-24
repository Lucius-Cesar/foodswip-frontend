import { useSelector } from "react-redux";

export default function RestaurantLogo({ className, from }) {
  const uniqueValue = useSelector((state) => {
    if (from === "restaurantPublic") {
      return state.restaurantPublic.data.uniqueValue;
    } else if (from === "restaurantAdmin") {
      return state.restaurantAdmin.data.uniqueValue;
    } else {
      return null; // Handle other cases if necessary
    }
  });
  return (
    <div className={`${className} sm:h-auto sm:w-96 sm:pt-2 sm:pb-2`}>
      <img
        className="h-full w-full object-contain"
        src={`/images/${uniqueValue}/logo.png`}
        alt="Restaurant Logo"
      />
    </div>
  );
}
