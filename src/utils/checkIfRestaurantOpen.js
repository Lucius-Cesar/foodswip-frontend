export const getDayIndex = (date) => (date.getDay() + 6) % 7;

export const isDateWithinStartEnd = (date, start, end) => {
  return date >= start && date < end;
};
export const isWithinServiceHours = (
  currentMinutesOfDay,
  serviceStartMinutes,
  serviceEndMinutes
) => {
  return (
    currentMinutesOfDay >= serviceStartMinutes &&
    currentMinutesOfDay < serviceEndMinutes
  );
};

export default function checkIfRestaurantOpen(restaurantState) {
  let restaurantOpen = false;
  const schedule = restaurantState.data.publicSettings.schedule;
  const exceptionalClosings =
    restaurantState.data.publicSettings.exceptionalClosings;
  const statusOverride = restaurantState.data.publicSettings.statusOverride;

  const currentDate = new Date();
  //by default getDay assign sunday as 0, we want sunday as 6 and monday as 0 to fit the restaurantschedule content
  const currentDayOfWeek = getDayIndex(currentDate);
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentMinutesOfDay = currentHours * 60 + currentMinutes;

  //first look if current date is in the range of a statusOverride (force opening or closing of the restaurant, not depended from schedule or exceptionnal closings)
  if (
    isDateWithinStartEnd(
      currentDate,
      new Date(statusOverride?.start),
      new Date(statusOverride?.end)
    )
  ) {
    //if open true
    if (statusOverride.open) {
      return true;
    } else {
      return false;
    }
  }

  //if current date not in the range of a statusOverride, check if the current date is in the range of an exceptionnal closing
  for (const exceptionalClosing of exceptionalClosings) {
    if (
      !isDateWithinStartEnd(
        currentDate,
        new Date(exceptionalClosing.start),
        new Date(exceptionalClosing.end)
      )
    ) {
      restaurantOpen = true;
      break;
    }
  }

  //if date not in an exceptionnal closing range , check the schedule of the restaurant

  if (restaurantOpen || exceptionalClosings.length === 0) {
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
