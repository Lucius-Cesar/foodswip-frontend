import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalInfoRestaurant({ open, setOpen }) {
  const restaurant = useSelector((state) => state.restaurant);
  const handleClose = () => {
    setOpen(false);
  };

  function formatExeptionalClosings(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", options);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-hidden">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex flex-col relative w-screen h-dvh  sm:w-7/12 sm:h-auto sm:max-h-full transform overflow-hidden rounded-lg bg-magnolia text-left shadow-xl transition-all  px-4 pb-4 pt-5">
                <div className="flex fex-row w-full justify-between pb-4">
                  <h2>Informations du restaurant</h2>
                  <button
                    type="button"
                    className={`rounded-md text-gray-400 hover:text-gray-500`}
                    onClick={() => setOpen(false)}
                  >
                    {" "}
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-col space-y-4 overflow-y-auto px-4">
                  <div className="flex flex-col">
                    <h3>Adresse</h3>
                    <div className="flex flex-row space-x-1">
                      <p>{restaurant.value.adress.street}</p>
                      <p>{restaurant.value.adress.streetNumber}</p>
                    </div>
                    <div className="flex flex-row space-x-1">
                      <p>{restaurant.value.adress.postCode}</p>
                      <p>{restaurant.value.adress.city} </p>
                    </div>
                  </div>
                  <div>
                    <h3>Horraires</h3>
                    <div className="flex flex-col space-y-2">
                      {restaurant.value.restaurantSettings.schedule.map(
                        (dayschedule, i) => (
                          <div
                            key={i}
                            className="flex flex-row justify-between"
                          >
                            <p>{dayschedule.label}</p>
                            <div className="flex flex-row">
                              {dayschedule.services.length === 0 ? (
                                <p>Fermé</p>
                              ) : (
                                <div className="space-x-4 flex flex-row">
                                  {dayschedule.services.map((service, j) => (
                                    <p key={j}>
                                      {service.start} - {service.end}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {restaurant.value.restaurantSettings.exceptionnalClosings
                    .length === 0 ? null : (
                    <div className="flex flex-col">
                      <h3>Fermetures exceptionnelles</h3>
                      {restaurant.value.restaurantSettings.exceptionnalClosings.map(
                        (exceptionnalClosing, i) => (
                          <p key={i}>
                            {formatExeptionalClosings(
                              exceptionnalClosing.start
                            )}
                            {" - "}
                            {formatExeptionalClosings(exceptionnalClosing.end)}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
