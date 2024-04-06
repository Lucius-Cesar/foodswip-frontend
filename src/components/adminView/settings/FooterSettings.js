import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
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
  const restaurant = useSelector((state) => state.restaurantAdmin);
  const onClickSaveBtn = () => {
    if (Object.values(validationErrors).every((value) => value === "")) {
      setSaveError(false);
      const payload = {
        ...restaurant.data,
        name: formRestaurantInfo.name,
        mail: formRestaurantInfo.mail,
        website: formRestaurantInfo.website,
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
      dispatch(updateRestaurantSettings(payload));
    } else {
      setSaveError(true);
    }
  };
  return (
    <div className="mt-auto h-auto z-10 w-full pt-6 flex flex-col justify-end items-center sm:items-end sm:p-4 sm:pe-24">
      <div className="h-20 w-10 flex flex-col justify-center items-center sm:items-end w-full">
        <SaveBtn onClick={onClickSaveBtn} isLoading={restaurant.isLoading} />
        {saveError && (
          <div>
            {Object.values(validationErrors).map((error, index) => (
              <p className="pt-1 text-error-danger" key={index}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
