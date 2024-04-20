import { useLayoutEffect, useState } from "react";
import checkIfRestaurantOpen from "@/utils/checkIfRestaurantOpen";
const checkingIntervalInMs = 1 * 60 * 1000; //1 minute

//the first useEffect check if restaurant Status change while restaurant.data change
let intervalId;

export default function useCheckRestaurantStatus(restaurantState) {
  const [restaurantOpen, setRestaurantOpen] = useState();
  const checkRestaurantStatus = () => {
    const updatedRestaurantOpen = checkIfRestaurantOpen(restaurantState);
    if (updatedRestaurantOpen !== restaurantOpen) {
      setRestaurantOpen(updatedRestaurantOpen);
    }
  };
  useLayoutEffect(() => {
    if (restaurantState.data) {
      checkRestaurantStatus();
      clearInterval(); //clear interval if restaurant.data changed and put a new one
      intervalId = setInterval(() => {
        // Effectuer le check à intervalles réguliers (toutes les 5 minutes)
        checkRestaurantStatus();
      }, checkingIntervalInMs);
      return () => clearInterval(intervalId);
    } //component destruction => clearInterval
  }, [restaurantState.data]);
  return { restaurantOpen, setRestaurantOpen };
}
