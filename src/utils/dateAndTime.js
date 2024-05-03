export const dateToTimeString = (date) => {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
};
export const isValidTimeString = (timeString) => {
  // format 00:10 23:59 //it can also be 27h:01 for 03:01
  return /^\d{2}:\d{2}$/.test(timeString);
};

export const compteNewDateBasedOnTimeString = (currentDate, timeString) => {
  //example: timeString is 10:00 and we want the complete date
  const [hours, minutes] = timeString.split(":");
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  let formattedHours;
  let newDate;
  let isOverflowingNextDay = hours >= 24 ? true : false;

  if (isOverflowingNextDay) {
    formattedHours = hours - 24;
  } else {
    formattedHours = hours;
  }

  newDate = new Date(
    currentYear,
    currentMonth,
    currentDay,
    formattedHours,
    minutes
  );

  if (isOverflowingNextDay) {
    newDate.setDate(currentDate.getDate() + 1);
  }
  return newDate;
};

export const getTimeStringBasedOnNumberOfMinutes = (
  numberOfMinutesSinceBeginingOfTheDay
) => {
  return `${String(
    Math.floor(numberOfMinutesSinceBeginingOfTheDay / 60)
  ).padStart("2", 0)}:${String(
    Math.ceil(numberOfMinutesSinceBeginingOfTheDay % 60)
  ).padStart(2, "0")}`;
};

export const getTotalNumberOfMinutesSinceBeginningOfTheDay = function (
  input,
  inputFormat
) {
  //input can be both Date or timeString
  let hours;
  let minutes;
  if (inputFormat === "Date") {
    hours = input.getHours();
    minutes = input.getMinutes();
  } else if (inputFormat === "timeString") {
    const splittedTimeString = input.split(":");
    hours = Number(splittedTimeString[0]);
    minutes = Number(splittedTimeString[1]);
  }
  return hours * 60 + minutes;
};
export const formatTimeStringAfterMidnightForDisplay = (timeString) => {
  // Séparer les parties heure et minute
  let [hours, minutes] = timeString.split(":");

  // Convertir les parties en nombres
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  // Vérifier si les heures sont supérieures ou égales à 24
  if (hours >= 24) {
    // Si oui, les réinitialiser à 01
    hours -= 24;
    const formattedTimeString = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    return formattedTimeString;
  } else return timeString;
};

export const formatEndTimeStringIfAfterMidnightForDatabase = (
  startTimeString,
  endTimeString
) => {
  // in the database, timeString can be stored as 27:00 to say the service end a 03:00 the next day
  if (
    parseInt(startTimeString.replace(":", "")) >
    parseInt(endTimeString.replace(":", ""))
  ) {
    let [endHours, endMinutes] = endTimeString.split(":");
    endHours = Number(endHours) + 24;
    const formattedEndTimeString = `${endHours
      .toString()
      .padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
    return formattedEndTimeString;
  } else {
    return endTimeString;
  }
};

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
