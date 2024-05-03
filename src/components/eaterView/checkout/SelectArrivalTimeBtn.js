import { useState, useEffect } from "react";
import SelectBtn from "@/components/ui/SelectBtn";
import ClockLinesIcon from "@/components/ui/icons/ClockLinesIcon";
import { useSelector } from "react-redux";
import DefaultModal from "@/components/ui/DefaultModal";
import DefaultBtn from "@/components/ui/DefaultBtn";
import { current } from "@reduxjs/toolkit";
import { arrivalTimeValidation } from "@/utils/validations";
import {
  getTotalNumberOfMinutesSinceBeginningOfTheDay,
  getTimeStringBasedOnNumberOfMinutes,
  formatTimeStringAfterMidnightForDisplay,
} from "@/utils/dateAndTime";

const pushValuesInTimeChoicesArray = (
  restaurant,
  orderType,
  timeChoicesArray,
  startInMinutes,
  endInMinutes,
  timeIncrement,
  currentService
) => {
  let minutesToAddToStart;
  if (orderType === 0) {
    // if restaurant is in service
    if (currentService?.start) {
      minutesToAddToStart = restaurant.data.publicSettings.deliveryEstimate.max;
    } else {
      minutesToAddToStart = restaurant.data.publicSettings.deliveryEstimate.min;
    }
  } else if (orderType === 1) {
    minutesToAddToStart = restaurant.data.publicSettings.takeAwayEstimate;
  }

  const minTimeInMinutes =
    Math.ceil((startInMinutes + minutesToAddToStart) / timeIncrement) *
    timeIncrement;
  const maxTimeInMinutes =
    Math.ceil(endInMinutes / timeIncrement) * timeIncrement;

  for (let i = minTimeInMinutes; i <= maxTimeInMinutes; i += timeIncrement) {
    //in the format "8:10"
    let timeChoiceString = getTimeStringBasedOnNumberOfMinutes(i);
    timeChoicesArray.push(timeChoiceString);
  }
};

function getTimeChoicesArray(
  restaurant,
  orderType,
  timeIncrement,
  currentService,
  remainingServicesForCurrentDay
) {
  let timeChoicesArray = [];
  const currentDate = new Date();
  const numberOfMinuteCurrentDay =
    getTotalNumberOfMinutesSinceBeginningOfTheDay(currentDate, "Date");
  //if we are in current service

  if (currentService?.start && currentService?.end) {
    const numberOfMinutesServiceEnd =
      getTotalNumberOfMinutesSinceBeginningOfTheDay(
        currentService.end,
        "timeString"
      );
    pushValuesInTimeChoicesArray(
      restaurant,
      orderType,
      timeChoicesArray,
      numberOfMinuteCurrentDay,
      numberOfMinutesServiceEnd,
      timeIncrement,
      currentService
    );
  }

  for (let service of remainingServicesForCurrentDay) {
    //service start

    const numberOfMinutesServiceStart =
      getTotalNumberOfMinutesSinceBeginningOfTheDay(
        service.start,
        "timeString"
      );

    const numberOfMinutesServiceEnd =
      getTotalNumberOfMinutesSinceBeginningOfTheDay(service.end, "timeString");

    pushValuesInTimeChoicesArray(
      restaurant,
      orderType,
      timeChoicesArray,
      numberOfMinutesServiceStart,
      numberOfMinutesServiceEnd,
      timeIncrement,
      currentService
    );
  }
  return timeChoicesArray;
}

function ModalSelectArrivalTime({
  open,
  setOpen,
  orderType,
  timeChoicesArray,
  timeString,
  setTimeString,
  currentService,
  defaultOptionArrivalTimeSelect,
  setValidationErrors,
}) {
  let errorMessage;
  const [validationErrorMessage, setValidationErrorMessage] = useState(false);
  const validation = (value) => {
    //if order in advance and timestring is null or the default message
    if (value !== timeString) {
      setTimeString(value);
      arrivalTimeValidation(
        value,
        defaultOptionArrivalTimeSelect,
        setValidationErrors,
        currentService,
        "arrivalTime"
      );
    }
    if (
      !currentService?.start &&
      (!value || value === defaultOptionArrivalTimeSelect)
    ) {
      errorMessage = "Veuillez choisir une heure";
      setValidationErrorMessage(errorMessage);
    } else {
      setOpen(false);
      setValidationErrorMessage(false);
    }
  };

  return (
    <DefaultModal open={open} setOpen={setOpen}>
      <h2>
        {orderType === 0
          ? "Délai de livraison"
          : orderType === 1
          ? "Délai pour emporter"
          : null}
      </h2>
      <div>
        <label
          htmlFor={"timeSelect"}
          className="block text-medium sm:text-sm font-medium leading-"
        >
          <p className="text-lg">
            {orderType === 0
              ? "À quelle heure désirez-vous être livré ?"
              : orderType === 1
              ? "À quelle heure désirez-vous emporter ?"
              : null}
          </p>
        </label>
        <select
          id={"timeSelect"}
          name={"timeSelect"}
          className="mt-2 block w-full rounded-md border-0 py-3 sm:py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary text-lg"
          value={timeString}
          onChange={(e) => {
            if (e.target.value !== defaultOptionArrivalTimeSelect) {
              validation(e.target.value);
            }
          }}
        >
          {timeChoicesArray?.map((item, i) => (
            <option
              key={i}
              selected={0}
              value={item}
              className={`${
                item === defaultOptionArrivalTimeSelect && "hidden"
              }`}
            >
              {item !== defaultOptionArrivalTimeSelect
                ? formatTimeStringAfterMidnightForDisplay(item)
                : item}
            </option>
          ))}
        </select>
      </div>
      <DefaultBtn
        onClick={() => {
          //check if currentService, if not and the timeString is the defaultOptionArrivalTimeSelect set it to null
          // for currentService timeString is not obligatory needed
          const updatedTimeString =
            currentService?.start &&
            timeString === defaultOptionArrivalTimeSelect
              ? null
              : timeString;
          // if we are it is an orderInAdvance and
          validation(updatedTimeString);
        }}
        value="Valider"
        className="bg-success text-xl w-40"
      ></DefaultBtn>
      <p className="mt-2 text-error-danger">{validationErrorMessage}</p>
    </DefaultModal>
  );
}
export default function SelectArrivalTimeBtn({
  currentService,
  remainingServicesForCurrentDay,
  timeString,
  setTimeString,
  validationError,
  setValidationErrors,
  timeInterval,
  defaultOptionArrivalTimeSelect,
}) {
  const restaurant = useSelector((state) => state.restaurantPublic);
  const cart = useSelector((state) => state.cart);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeChoicesArray, setTimeChoiceArray] = useState(null);
  console.log(currentService);
  console.log(remainingServicesForCurrentDay);
  useEffect(() => {
    setTimeChoiceArray(() => {
      // if status open is forced -> no end to current service (it is not really true but it is a marker to avoid order in advance for forced opening periods)

      if (currentService?.start) {
        return [
          "Dès que possible",
          ...getTimeChoicesArray(
            restaurant,
            cart.data.orderType,
            timeInterval,
            currentService,
            remainingServicesForCurrentDay
          ),
          ,
        ];
      } else {
        return [
          defaultOptionArrivalTimeSelect,
          ...getTimeChoicesArray(
            restaurant,
            cart.data.orderType,
            timeInterval,
            currentService,
            remainingServicesForCurrentDay
          ),
          ,
        ];
      }
    });
  }, [
    restaurant.data,
    cart.data.orderType,
    currentService,
    remainingServicesForCurrentDay,
  ]);

  return (
    <>
      <ModalSelectArrivalTime
        open={modalOpen}
        setOpen={setModalOpen}
        orderType={cart.data.orderType}
        timeChoicesArray={timeChoicesArray}
        timeString={timeString}
        setTimeString={setTimeString}
        currentService={currentService}
        defaultOptionArrivalTimeSelect={defaultOptionArrivalTimeSelect}
        setValidationErrors={setValidationErrors}
      />
      <SelectBtn
        status={`${currentService?.start || timeString ? "success" : "fail"}`}
        onClick={() => setModalOpen(true)}
        validationError={validationError}
      >
        <ClockLinesIcon />
        <div className="flex flex-col items-start">
          <p className="font-semibold text-start">
            {
              // current service & ti
              currentService?.start &&
              timeString !== defaultOptionArrivalTimeSelect ? (
                <p>
                  {cart.data.orderType === 0
                    ? "Estimation du délai de livraison :"
                    : "Estimation du délai pour emporter :"}
                </p>
              ) : !timeString ||
                timeString === defaultOptionArrivalTimeSelect ? (
                <p>
                  {cart.data.orderType === 0
                    ? "Selectionnez une heure pour la livraison"
                    : "Selectionnez une heure pour emporter"}
                </p>
              ) : (
                <p>
                  {cart.data.orderType === 0
                    ? "Estimation du délai de livraison :"
                    : "Estimation du délai pour emporter :"}
                </p>
              )
            }
          </p>
          <p className="font-bold">
            {
              //if no timeString selected or is not in the expected format (for example with the "As soon as possible" value)
              currentService?.start
                ? /^\d{2}:\d{2}$/.test(timeString)
                  ? formatTimeStringAfterMidnightForDisplay(timeString)
                  : cart.data.orderType === 0 &&
                    timeString !== defaultOptionArrivalTimeSelect
                  ? ` Entre ${restaurant.data.publicSettings.deliveryEstimate.min} et ${restaurant.data.publicSettings.deliveryEstimate.max} minutes`
                  : cart.data.orderType === 1 &&
                    timeString !== defaultOptionArrivalTimeSelect
                  ? `${restaurant.data.publicSettings.takeAwayEstimate} minutes`
                  : null
                : !timeString || timeString === defaultOptionArrivalTimeSelect
                ? null
                : formatTimeStringAfterMidnightForDisplay(timeString)
            }
          </p>
        </div>
      </SelectBtn>
    </>
  );
}
