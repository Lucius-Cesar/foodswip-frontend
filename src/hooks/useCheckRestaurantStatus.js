import { useLayoutEffect, useState } from "react";
import checkRestaurantStatus from "@/utils/checkRestaurantStatus";
const checkingIntervalInMs = 1 * 60 * 1000; //1 minute

//the first useEffect check if restaurant Status change while restaurant.data change
let intervalId;

export default function useCheckRestaurantStatus(restaurant) {
  const [restaurantOpen, setRestaurantOpen] = useState(null);
  const [currentService, setCurrentService] = useState(null);
  const [remainingServicesForCurrentDay, setRemainingServicesForCurrentDay] =
    useState(null);
  const [restaurantStatus, setRestaurantStatus] = useState(null);

  const updateRestaurantStatus = () => {
    const {
      restaurantOpen: newRestaurantOpen,
      currentService: newCurrentService,
      remainingServicesForCurrentDay: newRemainingServicesForCurrentDay,
      restaurantStatus: newRestaurantStatus,
    } = checkRestaurantStatus(restaurant);

    if (newRestaurantOpen !== restaurantOpen) {
      setRestaurantOpen(newRestaurantOpen);
    }
    if (newCurrentService !== currentService) {
      setCurrentService(newCurrentService);
    }
    if (newRemainingServicesForCurrentDay !== remainingServicesForCurrentDay) {
      setRemainingServicesForCurrentDay(newRemainingServicesForCurrentDay);
    }
    if (newRestaurantStatus !== restaurantStatus) {
      setRestaurantStatus(newRestaurantStatus);
    }
  };
  useLayoutEffect(() => {
    if (!restaurant?.data?.publicSettings) return;
    clearInterval(); //clear interval if restaurant.data changed and put a new one
    updateRestaurantStatus();
    intervalId = setInterval(() => {
      // Effectuer le check à intervalles réguliers (toutes les minutes)
      updateRestaurantStatus();
    }, checkingIntervalInMs);
    return () => clearInterval(intervalId);
  }, [restaurant?.data?.publicSettings]);

  return {
    restaurantOpen,
    setRestaurantOpen,
    currentService,
    remainingServicesForCurrentDay,
    restaurantStatus,
  };
}
