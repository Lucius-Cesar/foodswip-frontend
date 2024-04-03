import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { updateRestaurantSettings } from "@/redux/restaurantAdmin/restaurantAdminSlice";

export default function FooterSettings({
  validationErrors,
  formRestaurantInfo,
  publicSettings,
  privateSettings,
}) {
  const dispatch = useDispatch();
  const [saveError, setSaveError] = useState(false);
  const restaurant = useSelector((state) => state.restaurantAdmin);
  return (
    <div className="mt-auto h-auto z-10 w-full pt-6 flex flex-col justify-end items-center sm:items-end sm:p-4 sm:pe-24">
      <div className="h-20 w-10 flex flex-col justify-center items-center w-full">
        {restaurant.isLoading ? (
          <LoadingSpinner className="text-success" />
        ) : (
          <button
            type="button"
            className="inline-flex gap-x-2 rounded-lg bg-success px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:opacity-90"
            onClick={() => {
              if (
                Object.values(validationErrors).every((value) => value === "")
              ) {
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
            }}
          >
            Sauvegarder
            <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        )}
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
