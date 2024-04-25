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

export default function checkIfRestaurantOpen(restaurant) {
  const restaurantStatus = {
    open: false,
    currentService: null,
    remainingServicesForCurrentDay: [],
  };
  restaurantStatus.open = false;
  const schedule = restaurant.data.publicSettings.schedule;
  const exceptionalClosings =
    restaurant.data.publicSettings.exceptionalClosings;
  const statusOverride = restaurant.data.publicSettings.statusOverride;

  const currentDate = new Date();
  //by default getDay assign sunday as 0, we want sunday as 6 and monday as 0 to fit the restaurantschedule content
  const currentDayOfWeek = getDayIndex(currentDate);
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentMinutesOfDay = currentHours * 60 + currentMinutes;

  const servicesOfCurrentDay = schedule[currentDayOfWeek].services;

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
      restaurantStatus.open = true;
      return restaurantStatus;
    } else {
      restaurantStatus.open = false;
      return restaurantStatus;
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
      restaurantStatus.open = true;
      break;
    }
  }

  //if date not in an exceptionnal closing range , check the schedule of the restaurant

  if (restaurantStatus.open || exceptionalClosings.length === 0) {
    if (schedule[currentDayOfWeek].services.length === 0) {
      restaurantStatus.open = false; //restaurant is closed if there are no services for that dayofweek in the schedule
    } else {
      for (i; i < servicesOfCurrentDay.length; i++) {
        const serviceStartNumberOfHours = Number(
          servicesOfCurrentDay[i].start.split(":")[0]
        );
        const serviceStartNumberOfMinutes =
          60 * serviceStartNumberOfHours +
          Number(servicesOfCurrentDay[i].split(":")[1]);

        const serviceEndNumberOfHours = Number(
          servicesOfCurrentDay[i].end.split(":")[0]
        );
        const serviceEndNumberOfMinutes =
          60 * serviceEndNumberOfHours +
          Number(servicesOfCurrentDay[i].end.split(":")[1]);

        /* if current Date is within the service range -> open true , all services with an higher index are considered as remaining services for the current day
          because all services are pre sorted bu start*/
        if (
          isWithinServiceHours(
            currentMinutesOfDay,
            serviceStartNumberOfMinutes,
            serviceEndNumberOfMinutes
          )
        ) {
          restaurantStatus.open = true;
          restaurantStatus.currentService = servicesOfCurrentDay[i];
          restaurantStatus.remainingServicesForCurrentDay = schedule[
            currentDayOfWeek
          ].services.slice(i + 1, schedule[currentDayOfWeek].services.length);
          break;
          //if the service starts after the current date, push it into remainingServicesForCurrentDay
        } else if (serviceStartNumberOfMinutes > currentMinutesOfDay) {
          restaurantStatus.remainingServicesForCurrentDay.push(
            servicesOfCurrentDay[i]
          );
          //restaurants appears open for order in advance if there is other services for the current day
          restaurantStatus.open = true;
        }
        restaurantStatus.open = false; //restaurant is closed if current date don't fit in any services for the current day
      }
    }
  }
  return restaurantStatus;
}
