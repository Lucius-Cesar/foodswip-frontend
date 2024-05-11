import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import ToggleBtn from "../ui/ToggleBtn"
import DefaultBtn from "@/components/ui/DefaultBtn"
import DefaultModal from "../ui/DefaultModal"
import { WarningAlert } from "@/components/ui/Alerts"
import { compteNewDateBasedOnTimeString } from "@/utils/dateAndTime"
import { updateRestaurantSettings } from "@/redux/restaurantAdmin/restaurantAdminSlice"
import useCheckRestaurantStatus from "@/hooks/useCheckRestaurantStatus"

function getEndOfOverrideStatusPeriod(
  currentService,
  remainingServicesForToday,
  untilNextDay
) {
  //this function loop over all the services of the week, current date is within a service => put the end of the overrideStatusPeriode to the end of the current service
  //if we are not in a service: put the end of the overrideStatusPeriode to the start of the next periode

  let currentDate = new Date()
  let endOfService
  if (untilNextDay) {
    const nextDayTimestamp = new Date(
      currentDate.setDate(currentDate.getDate() + 1)
    )
    nextDayTimestamp.setHours(0, 0, 0, 0)
    return nextDayTimestamp
  }

  //if currently in service
  else if (currentService?.start) {
    //demander si toute la journées ou jusqu'au prochain service

    const currentServiceEndDate = compteNewDateBasedOnTimeString(
      currentDate,
      currentService.end
    )

    endOfService = currentServiceEndDate
  } else if (remainingServicesForToday.length) {
    const nextServiceEndDate = compteNewDateBasedOnTimeString(
      currentDate,
      remainingServicesForToday[0].end
    )
    endOfService = nextServiceEndDate
  } else {
    // else end of overrideStatusPeriode the next day
    const nextDayTimestamp = new Date(
      currentDate.setDate(currentDate.getDate() + 1)
    )
    nextDayTimestamp.setHours(0, 0, 0, 0)
    return nextDayTimestamp
  }
  return endOfService
}

const ModalStatusOverride = ({
  open,
  setOpen,
  restaurantOpen,
  currentService,
  initialRestaurantStatus,
  remainingServicesForToday,
}) => {
  const dispatch = useDispatch()
  const restaurant = useSelector((state) => state.restaurantAdmin)
  const onClickBtn = (untilNextDay) => {
    const updatedRestaurantOpen = !restaurantOpen
    const currentDate = new Date()
    const endOfOverrideStatusPeriod = getEndOfOverrideStatusPeriod(
      currentService,
      remainingServicesForToday,
      untilNextDay
    )
    const updatedStatusOverride = {
      open: updatedRestaurantOpen,
      start: currentDate,
      //if no next service , end of the overrideStatus is arbitrary next day midnight
      end: endOfOverrideStatusPeriod,
    }

    const restaurantSettingsPayload = {
      ...restaurant.data,
      publicSettings: {
        ...restaurant.data.publicSettings,
        statusOverride: updatedStatusOverride,
      },
    }
    dispatch(updateRestaurantSettings(restaurantSettingsPayload)).then(() => {
      setOpen(false)
    })
  }

  //workaround to avoid modal data changes during the closing animation, change later if possible

  return (
    <DefaultModal open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center space-y-6">
        {initialRestaurantStatus === "open" &&
        remainingServicesForToday.length >= 1 ? (
          <>
            <h2 className="text-center">Choisissez la durée de fermeture</h2>

            <div className="flex flex-row gap-8">
              <DefaultBtn
                className="text-xl font-bold h-16 rounded-s-lg rounded-e-lg"
                color="primary"
                value={`Jusque ${remainingServicesForToday[0].start}`}
                onClick={() => onClickBtn(false)}
              />
              <DefaultBtn
                className="text-xl font-bold h-16 rounded-s-lg rounded-e-lg"
                color="primary"
                value={"Toute la journée"}
                onClick={() => onClickBtn(true)}
              />
            </div>
            <p className="text-sm text-center">
              Si vous désirez fermer sur une plus longue période, veuillez
              ajouter une fermeture exceptionnelle.
            </p>
          </>
        ) : (initialRestaurantStatus === "pre order" ||
            initialRestaurantStatus === "forced open") &&
          remainingServicesForToday.length >= 2 ? (
          <>
            <h2 className="text-center">Choisissez la durée de fermeture</h2>

            <div className="flex flex-row gap-8">
              <DefaultBtn
                className="text-xl font-bold h-16 rounded-s-lg rounded-e-lg"
                color="primary"
                value={`Jusque ${remainingServicesForToday[1]?.start}`}
                onClick={() => onClickBtn(false)}
              />
              <DefaultBtn
                className="text-xl font-bold h-16 rounded-s-lg rounded-e-lg"
                color="primary"
                value={"Toute la journée"}
                onClick={() => onClickBtn(true)}
              />
            </div>
            <p className="text-sm text-center">
              Si vous désirez fermer sur une plus longue période, veuillez
              ajouter une fermeture exceptionnelle.
            </p>
          </>
        ) : initialRestaurantStatus === "open" ||
          initialRestaurantStatus === "forced open" ||
          initialRestaurantStatus === "pre order" ? (
          <div className="flex flex-col gap-4">
            <WarningAlert>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg">Êtes-vous sûr de vouloir fermer ?</h2>{" "}
                <p className="text-sm">
                  L'établissement apparaîtra comme fermé pour le reste de la
                  journée<br></br> <br></br>
                  Si vous désirez fermer sur une plus longue période, veuillez
                  ajouter une fermeture exceptionnelle.
                </p>
              </div>
            </WarningAlert>
            <div className="flex flex-row justify-between w-full">
              <DefaultBtn
                className="text-xl hover:brightness-95"
                value="Annuler"
                color="error-danger"
                onClick={() => setOpen(false)}
              ></DefaultBtn>
              <DefaultBtn
                className="text-xl"
                value="Confirmer"
                color="success"
                onClick={() => onClickBtn(false)}
                isLoading={restaurant.isLoading}
              ></DefaultBtn>
            </div>
          </div>
        ) : initialRestaurantStatus === "closed" ? (
          <div className="flex flex-col gap-4">
            <WarningAlert>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg">Êtes-vous sûr de vouloir ouvrir ? </h2>

                <p className="text-sm">
                  L'établissement apparaîtra comme ouvert jusqu'à la fin du
                  prochain service
                </p>
              </div>
            </WarningAlert>
            <div className="flex flex-row justify-between w-full">
              <DefaultBtn
                className="text-xl hover:brightness-95"
                value="Annuler"
                color="error-danger"
                onClick={() => setOpen(false)}
              ></DefaultBtn>
              <DefaultBtn
                className="text-xl"
                value="Confirmer"
                color="success"
                onClick={() => onClickBtn(false)}
                isLoading={restaurant.isLoading}
              ></DefaultBtn>
            </div>
          </div>
        ) : null}
      </div>
    </DefaultModal>
  )
}

export default function RestaurantStatusOverrideBtn({ className }) {
  const restaurant = useSelector((state) => state.restaurantAdmin)
  //const [toggle, setToggle] = useState(checkRestaurantStatus(restaurant));
  const {
    restaurantOpen,
    setRestaurantOpen,
    currentService,
    remainingServicesForToday,
    restaurantStatus,
  } = useCheckRestaurantStatus(restaurant)
  const [modalOpen, setModalOpen] = useState(false)
  const [initialRestaurantStatus, setInitialRestaurantStatus] =
    useState(restaurantStatus)
  return (
    <>
      <div
        className={`${className} flex flex-col justify-beween items-between w-56 h-fit rounded-lg border border-gravel p-3 gap-2`}
      >
        <div className="flex flex-row justify-between ">
          <h2>Votre statut</h2>
          <ToggleBtn
            enabled={restaurantOpen}
            setEnabled={setRestaurantOpen}
            onChange={() => {
              setModalOpen(true)
              setInitialRestaurantStatus(restaurantStatus)
            }}
            className="w-20"
          />
        </div>
        <p
          className={`${
            restaurantStatus === "pre order"
              ? "text-primary"
              : restaurantStatus === "open" ||
                restaurantStatus === "forced open"
              ? "text-success"
              : restaurantStatus === "closed"
              ? "text-error-danger"
              : null
          } font-bold text-xl`}
        >
          {restaurantStatus === "pre order"
            ? "Commandes à l'avance"
            : restaurantStatus === "open" || restaurantStatus === "forced open"
            ? "Ouvert"
            : restaurantStatus === "closed"
            ? "Fermé"
            : null}
        </p>
      </div>
      <ModalStatusOverride
        open={modalOpen}
        setOpen={setModalOpen}
        restaurantOpen={restaurantOpen}
        setRestaurantOpen={setRestaurantOpen}
        initialRestaurantStatus={initialRestaurantStatus}
        currentService={currentService}
        remainingServicesForToday={remainingServicesForToday}
      />
    </>
  )
}
