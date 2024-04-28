const pushValuesInTimeChoicesArray = (
  restaurant,
  orderType,
  timeChoicesArray,
  startInMinutes,
  endInMinutes,
  timeIncrement
) => {
  /*const serviceEndNumberOfHours = Number(service.end.split(":")[0]);
    const serviceEndNumberOfMinutes = service.end.split(":")[1];
    const numberOfMinutesServiceEnd = serviceEndNumberOfHours * 60 + serviceEndNumberOfMinutes;
    */

  let minutesToAddToStart;
  if (orderType === 0) {
    minutesToAddToStart = restaurant.data.publicSettings.deliveryEstimate.max;
  } else if (orderType === 1) {
    minutesToAddToStart = restaurant.data.publicSettings.takeAwayEstimate;
  }

  const minTimeInMinutes = startInMinutes + minutesToAddToStart;
  const maxTimeInMinutes =
    Math.ceil(endInMinutes / timeIncrement) * timeIncrement;

  for (let i = minTimeInMinutes; i <= maxTimeInMinutes; i += timeIncrement) {
    //in the format "8:10"
    let timeChoiceString = `${String(Math.floor(i / 60)).padStart(
      "2",
      0
    )}:${String(Math.ceil(i % 60)).padStart(2, "0")}`;
    timeChoicesArray.push(timeChoiceString);
  }
};

export default function getTimeChoicesArray(
  restaurant,
  orderType,
  timeIncrement,
  currentService,
  remainingServicesForCurrentDay
) {
  let timeChoicesArray = [];
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const numberOfMinuteCurrentDay = currentHours * 60 + currentMinutes;
  //if we are in current service
  if (currentService?.start) {
    const serviceEndNumberOfHours = Number(currentService.end.split(":")[0]);
    const serviceEndNumberOfMinutes = Number(currentService.end.split(":")[1]);
    const numberOfMinutesServiceEnd =
      serviceEndNumberOfHours * 60 + serviceEndNumberOfMinutes;
    pushValuesInTimeChoicesArray(
      restaurant,
      orderType,
      timeChoicesArray,
      numberOfMinuteCurrentDay,
      numberOfMinutesServiceEnd,
      timeIncrement
    );
  }

  for (let service of remainingServicesForCurrentDay) {
    //service start
    const serviceStartNumberOfHours = Number(service.start.split(":")[0]);
    const serviceStartNumberOfMinutes = Number(service.start.split(":")[1]);
    const numberOfMinutesServiceStart =
      serviceStartNumberOfHours * 60 + serviceStartNumberOfMinutes;

    //service end
    const serviceEndNumberOfHours = Number(service.end.split(":")[0]);
    const serviceEndNumberOfMinutes = Number(service.end.split(":")[1]);
    const numberOfMinutesServiceEnd =
      serviceEndNumberOfHours * 60 + serviceEndNumberOfMinutes;

    pushValuesInTimeChoicesArray(
      restaurant,
      orderType,
      timeChoicesArray,
      numberOfMinutesServiceStart,
      numberOfMinutesServiceEnd,
      timeIncrement
    );
  }
  return timeChoicesArray;
}
