import { useLayoutEffect, useState } from "react";
import checkRestaurantStatus from "@/utils/checkRestaurantStatus";
const checkingIntervalInMs = 1 * 60 * 1000; //1 minute

//the first useEffect check if restaurant Status change while restaurant.data change
let intervalId;

export default function useCheckRestaurantStatus(restaurant) {
  const {
    restaurantOpen: checkRestaurantOpen,
    currentService: checkCurrentService,
    remainingServicesForCurrentDay: checkRemainingServicesForCurrentDay,
  } = checkRestaurantStatus(restaurant);

  const [restaurantOpen, setRestaurantOpen] = useState(checkRestaurantOpen);
  const [currentService, setCurrentService] = useState(checkCurrentService);
  const [remainingServicesForCurrentDay, setRemainingServicesForCurrentDay] =
    useState(checkRemainingServicesForCurrentDay);

  const checkRestaurantStatusChanges = () => {
    const { restaurantOpen: updatedRestaurantOpen } =
      checkRestaurantStatus(restaurant);
    if (updatedRestaurantOpen !== restaurantOpen) {
      setRestaurantOpen(updatedRestaurantOpen);
    }
  };
  useLayoutEffect(() => {
    if (restaurant?.data?.publicSettings && !restaurant?.isLoading) {
      clearInterval(); //clear interval if restaurant.data changed and put a new one
      checkRestaurantStatusChanges();
      intervalId = setInterval(() => {
        // Effectuer le check à intervalles réguliers (toutes les minutes)
        checkRestaurantStatusChanges();
      }, checkingIntervalInMs);
      return () => clearInterval(intervalId);
    } //component destruction => clearInterval
  }, [restaurant?.data?.publicSettings]);

  return {
    restaurantOpen,
    setRestaurantOpen,
    currentService,
    remainingServicesForCurrentDay,
  };
}
