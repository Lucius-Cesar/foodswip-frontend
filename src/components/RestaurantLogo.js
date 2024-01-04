import { useSelector } from "react-redux";

export default function RestaurantLogo({ className }) {
  const restaurantUniqueValue = useSelector(
    (state) => state.restaurant.uniqueValue
  );
  return (
    <div className={`${className} sm:h-24 sm:w-72`}>
      <img
        className="h-full w-full object-contain"
        src={`/images/${restaurantUniqueValue}/logo.png`}
        alt="Restaurant Logo"
      />
    </div>
  );
}
