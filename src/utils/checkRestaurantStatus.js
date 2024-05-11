import {
  getDayIndex,
  isDateWithinStartEnd,
  isWithinServiceHours,
  getTotalNumberOfMinutesSinceBeginningOfTheDay,
  dateToTimeString,
} from "@/utils/dateAndTime"

export default function checkRestaurantStatus(restaurant) {
  let restaurantOpen = false
  let overrideRestaurantOpen
  let currentService = null
  let remainingServicesForToday = []
  let restaurantStatus
  const schedule = restaurant.data.publicSettings.schedule
  const exceptionalClosings = restaurant.data.publicSettings.exceptionalClosings
  const statusOverride = restaurant.data.publicSettings.statusOverride
  const currentDate = new Date()
  //by default getDay assign sunday as 0, we want sunday as 6 and monday as 0 to fit the restaurantschedule content
  const currentDayOfWeek = getDayIndex(currentDate)
  const currentMinutesOfDay = getTotalNumberOfMinutesSinceBeginningOfTheDay(
    currentDate,
    "Date"
  )
  const servicesOfCurrentDay = schedule[currentDayOfWeek].services
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
      restaurantOpen = true
      overrideRestaurantOpen = true
      // if status open is forced -> no end to current service (it is not really true but it is a marker to avoid order in advance for forced opening periods)
      currentService = {
        start: dateToTimeString(new Date(statusOverride.start)),
        end: dateToTimeString(new Date(statusOverride.end)),
      }
      restaurantStatus = "forced open"
    } else {
      restaurantOpen = false
      restaurantStatus = "closed"
      overrideRestaurantOpen = false
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
      restaurantOpen = true
      break
    }
  }

  //if date not in an exceptionnal closing range , check the schedule of the restaurant

  if (restaurantOpen || exceptionalClosings.length === 0) {
    if (schedule[currentDayOfWeek].services.length === 0) {
      restaurantOpen = false //restaurant is closed if there are no services for that dayofweek in the schedule
    } else {
      for (let i = 0; i < servicesOfCurrentDay.length; i++) {
        const serviceStartNumberOfMinutes =
          getTotalNumberOfMinutesSinceBeginningOfTheDay(
            servicesOfCurrentDay[i].start,
            "timeString"
          )
        const serviceEndNumberOfMinutes =
          getTotalNumberOfMinutesSinceBeginningOfTheDay(
            servicesOfCurrentDay[i].end,
            "timeString"
          )

        /* if current Date is within the service range -> open true , all services with an higher index are considered as remaining services for the current day
          because all services are pre sorted bu start*/
        if (
          isWithinServiceHours(
            currentMinutesOfDay,
            serviceStartNumberOfMinutes,
            serviceEndNumberOfMinutes
          )
        ) {
          restaurantOpen = true
          currentService = servicesOfCurrentDay[i]
          remainingServicesForToday = schedule[currentDayOfWeek].services.slice(
            i + 1,
            schedule[currentDayOfWeek].services.length
          )
          break
          //if the service starts after the current date, push it into remainingServicesForToday
        } else if (serviceStartNumberOfMinutes > currentMinutesOfDay) {
          remainingServicesForToday.push(servicesOfCurrentDay[i])
          //restaurants appears open for order in advance if there is other services for the current day
        }
        //if remaning services during current day ? restaurantStatus.open true else false
        restaurantOpen = remainingServicesForToday.length ? true : false
      }
    }
  }
  // if there is an oveerideRestaurantOpen True , override the result
  restaurantOpen =
    overrideRestaurantOpen != null ? overrideRestaurantOpen : restaurantOpen
  if (overrideRestaurantOpen) {
    restaurantStatus = "forced open"
  } else if (restaurantOpen && currentService?.start) {
    restaurantStatus = "open"
  } else if (restaurantOpen && remainingServicesForToday.length) {
    restaurantStatus = "pre order"
  } else if (!restaurantOpen) {
    restaurantStatus = "closed"
  }

  return {
    restaurantOpen,
    currentService,
    remainingServicesForToday,
    restaurantStatus,
  }
}
