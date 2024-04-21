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
    <img
      className="max-h-24 max-w-48 sm:max-w-96 sm:max-h-40"
      src={`/images/${uniqueValue}/logo.png`}
      alt="Restaurant Logo"
    />
  );
}
