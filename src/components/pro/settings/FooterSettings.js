import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { SuccesAlert, ErrorAlert } from "@/components/ui/Alerts";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { updateRestaurantSettings } from "@/redux/restaurantAdmin/restaurantAdminSlice";
import SaveBtn from "@/components/ui/SaveBtn";
export default function FooterSettings({
  validationErrors,
  formRestaurantInfo,
  publicSettings,
  privateSettings,
}) {
  const dispatch = useDispatch();
  const [saveError, setSaveError] = useState(false);
  //alert is only displayed after save btn is pressed
  const [alertOpen, setAlertOpen] = useState(false);
  const restaurant = useSelector((state) => state.restaurantAdmin);

  const onClickSaveBtn = () => {
    setAlertOpen(false);
    if (Object.values(validationErrors).every((value) => value === "")) {
      setSaveError(false);
      const payload = {
        slug: restaurant.data.slug,
        name: formRestaurantInfo.name,
        mail: formRestaurantInfo.mail,
        website: formRestaurantInfo.website,
        phoneNumber: formRestaurantInfo.phoneNumber.replace(/\s/g, ""),
        address: {
          street: formRestaurantInfo.street,
          streetNumber: formRestaurantInfo.streetNumber,
          postCode: formRestaurantInfo.postCode,
          city: formRestaurantInfo.city,
          country: formRestaurantInfo.country,
        },
        publicSettings: publicSettings,
        privateSettings: privateSettings,
      };
      dispatch(updateRestaurantSettings(payload)).then(() =>
        setAlertOpen(true)
      );
    } else {
      setSaveError(true);
      setAlertOpen(true);
    }
  };
  return (
    <div className="mt-auto h-14 z-10 w-full flex flex-col justify-center sm:justify-end items-center sm:items-end py-2 sm:pe-4">
      <div className="relative flex flex-col justify-center items-center sm:items-end sm:flex-row gap-2 sm:gap-4">
        <div className="absolute -top-14 sm:top-0 sm:relative w-96">
          {!saveError && !restaurant.error && (
            <SuccesAlert
              message="Les paramètres ont été sauvegardés avec succès"
              open={alertOpen}
              setOpen={setAlertOpen}
              openTime={10000}
            />
          )}
          {restaurant.error && (
            <ErrorAlert
              message="La sauvegarde des paramètres a échoué, veuillez réessayer ultérieurement"
              open={alertOpen}
              setOpen={setAlertOpen}
            />
          )}

          {saveError && (
            <ErrorAlert
              message="Un ou plusieurs champs sont invalides"
              open={alertOpen}
              setOpen={setAlertOpen}
            />
          )}
        </div>

        <SaveBtn onClick={onClickSaveBtn} isLoading={restaurant.isLoading} />
      </div>
    </div>
  );
}
