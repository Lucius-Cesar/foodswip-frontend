import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ToggleBtn from "../ui/ToggleBtn";
import DefaultBtn from "@/components/ui/DefaultBtn";
import DefaultModal from "../ui/DefaultModal";
import { WarningAlert } from "@/components/ui/Alerts";
import {
  getDayIndex,
  compteNewDateBasedOnTimeString,
} from "@/utils/dateAndTime";
import { updateRestaurantSettings } from "@/redux/restaurantAdmin/restaurantAdminSlice";
import useCheckRestaurantStatus from "@/hooks/useCheckRestaurantStatus";

function getEndOfOverrideStatusPeriode(currentDate, restaurantState) {
  //this function loop over all the services of the week, current date is within a service => put the end of the overrideStatusPeriode to the end of the current service
  //if we are not in a service: put the end of the overrideStatusPeriode to the start of the next periode
  let dateToCompare = new Date(currentDate);
  let endOfOverrideStatusPeriode;

  //loop one week
  for (let i = 0; i < 7; i++) {
    const dayIndexOfDateToCompare = getDayIndex(dateToCompare);
    for (const service of restaurantState.data.publicSettings.schedule[
      dayIndexOfDateToCompare
    ].services) {
      //service.start
      const serviceStartDate = compteNewDateBasedOnTimeString(
        dateToCompare,
        service.start
      );
      //service.end
      const serviceEndDate = compteNewDateBasedOnTimeString(
        dateToCompare,
        service.end
      );

      //if current date is within service hour
      if (currentDate >= serviceStartDate && currentDate < serviceEndDate) {
        endOfOverrideStatusPeriode = serviceEndDate;
        return endOfOverrideStatusPeriode;
      }

      if (currentDate < serviceStartDate) {
        endOfOverrideStatusPeriode = serviceStartDate;
        return endOfOverrideStatusPeriode;
      }
    }
    //iterate date to compare to the next day
    dateToCompare.setDate(dateToCompare.getDate() + 1);
  }
  if (endOfOverrideStatusPeriode) {
    return endOfOverrideStatusPeriode;
  }

  return endOfOverrideStatusPeriode;
}

const ModalStatusOverride = ({
  open,
  setOpen,
  restaurantOpen,
  setRestaurantOpen,
}) => {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurantAdmin);
  const onClickConfirmBtn = () => {
    const updatedRestaurantOpen = !restaurantOpen;
    const currentDate = new Date();
    const endOfOverrideStatusPeriode = getEndOfOverrideStatusPeriode(
      currentDate,
      restaurant
    );
    const updatedStatusOverride = {
      open: updatedRestaurantOpen,
      start: currentDate,
      //if no next service , end of the overrideStatus is arbitrary one day after the currentDate
      end: endOfOverrideStatusPeriode
        ? endOfOverrideStatusPeriode
        : new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
    };

    const restaurantSettingsPayload = {
      ...restaurant.data,
      publicSettings: {
        ...restaurant.data.publicSettings,
        statusOverride: updatedStatusOverride,
      },
    };
    dispatch(updateRestaurantSettings(restaurantSettingsPayload)).then(() => {
      setOpen(false);
      setRestaurantOpen(updatedRestaurantOpen);
    });
  };

  const [initialRestaurantOpen, setInitialRestaurantOpen] =
    useState(restaurantOpen);
  //workaround to avoid modal data changes during the closing animation, change later if possible
  useEffect(() => {
    if (open) {
      setInitialRestaurantOpen(restaurantOpen);
    }
  }, [open]);
  return (
    <DefaultModal open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center space-y-6">
        {!initialRestaurantOpen && (
          <WarningAlert>
            <p className="text-lg">
              Êtes-vous sûr de vouloir ouvrir ?<br></br> <br></br>{" "}
              <span className="text-sm">
                L'établissement apparaîtra comme ouvert à partir de maintenant
                jusqu'au prochain service planifié.
              </span>
            </p>
          </WarningAlert>
        )}
        {initialRestaurantOpen && (
          <WarningAlert>
            <p className="text-lg">
              Êtes-vous sûr de vouloir fermer ?<br></br> <br></br>{" "}
              <span className="text-sm">
                L'établissement apparaîtra comme fermé et réouvrira
                automatiquement au prochain service planifié. <br></br>{" "}
                <br></br>Si vous désirez fermer sur une plus longue période,
                veuillez ajouter une fermeture exceptionnelle.
              </span>
            </p>
          </WarningAlert>
        )}
      </div>
      <div className="flex flex-row justify-between w-full">
        <DefaultBtn
          className="text-lg hover:brightness-95"
          value="Annuler"
          color="error-danger"
          onClick={() => setOpen(false)}
        ></DefaultBtn>
        <DefaultBtn
          className="text-lg"
          value="Confirmer"
          color="success"
          onClick={onClickConfirmBtn}
          isLoading={restaurant.isLoading}
        ></DefaultBtn>
      </div>
    </DefaultModal>
  );
};

export default function RestaurantStatusOverrideBtn({ className }) {
  const restaurant = useSelector((state) => state.restaurantAdmin);
  //const [toggle, setToggle] = useState(checkRestaurantStatus(restaurant));
  const { restaurantOpen, setRestaurantOpen } =
    useCheckRestaurantStatus(restaurant);
  const [modalOpen, setModalOpen] = useState(false);

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
            onChange={() => setModalOpen(true)}
            className="w-20"
          />
        </div>
        <p
          className={`${
            restaurantOpen ? "text-success" : "text-error-danger"
          } font-bold text-xl`}
        >
          {restaurantOpen ? "Ouvert" : "Fermé"}
        </p>
      </div>
      <ModalStatusOverride
        open={modalOpen}
        setOpen={setModalOpen}
        restaurantOpen={restaurantOpen}
        setRestaurantOpen={setRestaurantOpen}
      />
    </>
  );
}
