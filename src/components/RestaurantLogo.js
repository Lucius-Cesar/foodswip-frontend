import { useSelector } from "react-redux";

export default function RestaurantLogo({ className }) {
  const restaurantUniqueValue = useSelector(
    (state) => state.restaurant.value.uniqueValue
  );
  return (
    <div className={`${className} sm:h-auto sm:w-96 sm:pt-2 sm:pb-2`}>
      <img
        className="h-full w-full object-contain"
        src={`/images/${restaurantUniqueValue}/logo.png`}
        alt="Restaurant Logo"
      />
    </div>
  );
}
