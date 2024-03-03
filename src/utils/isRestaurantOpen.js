function isRestaurantOpen(schedule, exceptionalClosings) {
  let restaurantOpen = false;
  const currentDate = new Date();
  //by default getDay assign sunday as 0, we want sunday as 6 and monday as 0 to fit the restaurantschedule content
  const currentDayOfWeek = (currentDate.getDay() + 6) % 7;
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentMinutesOfDay = currentHours * 60 + currentMinutes;

  function isDateWithinStartEnd(date, start, end) {
    return date >= start && date <= end;
  }
  function isWithinServiceHours(
    currentMinutesOfDay,
    serviceStartMinutes,
    serviceEndMinutes
  ) {
    return (
      currentMinutesOfDay >= serviceStartMinutes &&
      currentMinutesOfDay <= serviceEndMinutes
    );
  }
  for (const exceptionalClosing of exceptionalClosings) {
    if (
      !isDateWithinStartEnd(
        currentDate,
        exceptionalClosing.start,
        exceptionalClosing.end
      )
    ) {
      restaurantOpen = true;
      break;
    }
  }
  if (restaurantOpen) {
    if (schedule[currentDayOfWeek].services.length === 0) {
      restaurantOpen = false; //restaurant is closed if there are no services for that dayofweek in the schedule
    } else {
      for (const service of schedule[currentDayOfWeek].services) {
        const serviceStartNumberOfHours = Number(service.start.split(":")[0]);
        const serviceStartNumberOfMinutes =
          60 * serviceStartNumberOfHours + Number(service.start.split(":")[1]);

        const serviceEndNumberOfHours = Number(service.end.split(":")[0]);
        const serviceEndNumberOfMinutes =
          60 * serviceEndNumberOfHours + Number(service.end.split(":")[1]);

        if (
          isWithinServiceHours(
            currentMinutesOfDay,
            serviceStartNumberOfMinutes,
            serviceEndNumberOfMinutes
          )
        ) {
          restaurantOpen = true;
          break;
        }
        restaurantOpen = false; //restaurant is closed if current date don't fit in any services for the current day of week
      }
    }
  }

  return restaurantOpen;
}

export default isRestaurantOpen;
