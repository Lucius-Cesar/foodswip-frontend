"use client";
import { useState, useEffect } from "react";
import FormInput from "@/components/ui/FormInput.js";
import DefaultBtn from "@/components/ui/DefaultBtn";
import SideNavigation from "@/components/pro/settings/SideNavigation";
import { RestaurantLogo } from "@/components/ui/RestaurantLogo";
import PeriodItem from "@/components/pro/settings/PeriodItem";
import ModalPeriod from "@/components/pro/settings/ModalPeriod";
import AddBtn from "@/components/ui/AddBtn";
import InputNumber from "@/components/ui/InputNumber";
import RestaurantStatusOverrideBtn from "@/components/pro/RestaurantStatusOverrideBtn";
import moment from "moment";
import { formatEndTimeStringIfAfterMidnightForDatabase } from "@/utils/dateAndTime";
import TabBtn from "@/components/ui/TabBtn";

import { switchDayLabel } from "@/utils/switchLabel";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  mailValidation,
  phoneNumberValidation,
  missingInformationValidation,
} from "@/utils/validations";
import deepCopy from "@/utils/deepCopy";
import { switchPaymentMethodLabel } from "@/utils/switchLabel";
import FooterSettings from "@/components/pro/settings/FooterSettings";
import Preloader from "@/components/ui/Preloader";
import useRefreshAuth from "@/hooks/useRefreshAuth";
import useCheckAuth from "@/hooks/useCheckAuth";
import useRestaurantData from "@/hooks/useRestaurantData";

import { logOut } from "@/redux/auth/authSlice";
import { XMarkIcon } from "@heroicons/react/20/solid";
import PasswordUpdate from "@/components/pro/settings/PasswordUpdate";
import {
  MainNavigationMenu,
  MainNavigationButton,
} from "@/components/pro/MainNavigation";
import Link from "next/link";

export default function settings() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useRefreshAuth();
  useCheckAuth();
  useRestaurantData(auth.data?.user?.slug, "restaurantAdmin");
  //change this later
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurantAdmin);
  const [formRestaurantInfo, setFormRestaurantInfo] = useState(null);
  const [publicSettings, setPublicSettings] = useState(null);
  const [privateSettings, setPrivateSettings] = useState(null);
  const [accountSettings, setAccountSettings] = useState(null);
  const searchParams = useSearchParams();
  const activeSettings = searchParams.get("q");

  const [isMainNavigationOpen, setMainNavigationOpen] = useState(false);
  useEffect(() => {
    if (!activeSettings) {
      router.push("/pro/settings?q=restaurant");
    }
  }, [activeSettings]);
  useEffect(() => {
    if (restaurant.data) {
      setFormRestaurantInfo({
        name: restaurant.data.name,
        website: restaurant.data.website,
        street: restaurant.data.address?.street,
        streetNumber: restaurant.data.address?.streetNumber,
        postCode: restaurant.data.address?.postCode,
        city: restaurant.data.address?.city,
        country: restaurant.data.address?.country,
        phoneNumber: restaurant.data.phoneNumber,
        mail: restaurant.data.mail,
      });
      setPublicSettings(restaurant.data.publicSettings);
      setPrivateSettings(restaurant.data.privateSettings);
      setAccountSettings({
        password: {
          current: "",
          new: "",
          confirmNew: "",
        },
      });
    }
  }, [restaurant.data]);
  const [validationErrors, setValidationErrors] = useState({
    mail: "",
    phoneNumber: "",
    orderMailReception: "",
  });

  const optionsDateFormatting = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false, // Utiliser le format 24 heures
  };

  //ModalPeriod states an functions

  const [isModalScheduleOpen, setModalScheduleOpen] = useState(false);
  const [isModalExceptionalClosingsOpen, setModalExceptionalClosingOpen] =
    useState(false);

  const [valueModalPeriod, setValueModalPeriod] = useState({
    dayIndex: null,
    itemIndex: null,
    start: null,
    end: null,
    delivery: null,
    takeaway: null,
  });
  // crud string "create", "update", "delete" are used to trigger the adequate functions
  const sortServices = (services) =>
    services.sort((a, b) => {
      function convertStartTimeToComparable(time) {
        // Convertit "hh:mm" en minutes depuis minuit
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      }

      return (
        convertStartTimeToComparable(a.start) -
        convertStartTimeToComparable(b.start)
      );
    });
  const [modalPeriodOperation, setModalPeriodOperation] = useState(null);
  // for Schedule
  const createService = (dayIndex, itemIndex = null, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    newValue.end = formatEndTimeStringIfAfterMidnightForDatabase(
      newValue.start,
      newValue.end
    );
    updatedPublicSettings.schedule[dayIndex].services.push(newValue);
    sortServices(updatedPublicSettings.schedule[dayIndex].services);
    setPublicSettings(updatedPublicSettings);
  };

  const updateService = (dayIndex, itemIndex, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    newValue.end = formatEndTimeStringIfAfterMidnightForDatabase(
      newValue.start,
      newValue.end
    );
    updatedPublicSettings.schedule[dayIndex].services[itemIndex] = newValue;
    sortServices(updatedPublicSettings.schedule[dayIndex].services);
    setPublicSettings(updatedPublicSettings);
  };

  const deleteService = (dayIndex, itemIndex, newValue = null) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.schedule[dayIndex].services.splice(itemIndex, 1);
    setPublicSettings(updatedPublicSettings);
  };

  // for exceptionalClosings
  const createExceptionalClosing = (itemIndex = null, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    //set start date of exceptionnal closings to 00h00 (start of the concerned day)
    newValue.start = new Date(new Date(newValue.start).setHours(0, 0, 0, 0));
    //set end date of exceptionnal closings to 23h59 (end of the concerned day)
    newValue.end = new Date(new Date(newValue.end).setHours(23, 59, 0, 0));
    updatedPublicSettings.exceptionalClosings.push(newValue);
    setPublicSettings(updatedPublicSettings);
  };

  const updateExceptionalClosing = (itemIndex, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    //set start date of exceptionnal closings to 00h00 (start of the concerned day)
    newValue.start = new Date(new Date(newValue.start).setHours(0, 0, 0, 0));
    //set end date of exceptionnal closings to 23h59 (end of the concerned day)
    newValue.end = new Date(new Date(newValue.end).setHours(23, 59, 0, 0));
    updatedPublicSettings.exceptionalClosings[itemIndex] = newValue;
    setPublicSettings(updatedPublicSettings);
  };

  const deleteExceptionalClosing = (itemIndex, newValue = null) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.exceptionalClosings.splice(itemIndex, 1);
    setPublicSettings(updatedPublicSettings);
  };

  const onClickLogOut = () => {
    dispatch(logOut()).then(() => router.push("/pro/login"));
  };

  if (!(formRestaurantInfo && publicSettings && privateSettings)) {
    return (
      <>
        <Preloader />
      </>
    );
  } else {
    return (
      <>
        <main className="h-screen overflow-y-hidden flex flex-col w-full">
          <div className="absolute top-0 y-0 z-50">
            <MainNavigationButton
              open={isMainNavigationOpen}
              setOpen={setMainNavigationOpen}
            />
          </div>

          <MainNavigationMenu
            open={isMainNavigationOpen}
            setOpen={setMainNavigationOpen}
          />
          <div className="absolute top-0 w-full flex fex-col border-bottom  z-10 bg-white border-gravel sm:py-2 rounded-lg drop-shadow-md">
            <div className="w-full py-1 px-12 sm:justify-around flex flex-row justify-between items-center text-center font-semibold">
              <Link
                className={`text-sm max-w-20 sm:max-w-none sm:text-base font-bold ${
                  activeSettings === "restaurant" ? "text-primary" : ""
                }`}
                href="/pro/settings?q=restaurant"
              >
                Paramètres restaurant
              </Link>
              <Link
                className={`text-sm max-w-20 sm:max-w-none sm:text-base font-bold ${
                  activeSettings === "order" ? "text-primary" : ""
                }`}
                href="/pro/settings?q=order"
              >
                Paramètres commandes
              </Link>
              <Link
                className={`text-sm max-w-20 sm:max-w-none sm:text-base font-bold ${
                  activeSettings === "account" ? "text-primary" : ""
                }`}
                href="/pro/settings?q=account"
              >
                Paramètres compte
              </Link>
            </div>
          </div>
          <div className="flex flex-col px-3 pt-3 w-full h-full overflow-y-auto mt-16">
            {activeSettings === "restaurant" && (
              <div className="relative flex flex-col w-full h-full pb-4 space-y-4">
                <RestaurantStatusOverrideBtn className="self-start" />
                <div className="flex flex-row gap-8 sm:gap-56 ">
                  <div className="flex flex-col">
                    <h2 className="mb-4 font-bold">Horraires d'ouverture</h2>
                    <ModalPeriod
                      type={"time"}
                      value={valueModalPeriod}
                      setValue={setValueModalPeriod}
                      open={isModalScheduleOpen}
                      setOpen={setModalScheduleOpen}
                      startLabel={"Début du service"}
                      endLabel={"Fin du service"}
                      variant="service"
                      validateBtnFunction={() => {
                        let functionToUse;
                        switch (modalPeriodOperation) {
                          case "create":
                            functionToUse = createService;
                            break;
                          case "update":
                            functionToUse = updateService;
                            break;
                          default:
                            break;
                        }
                        functionToUse(
                          valueModalPeriod.dayIndex,
                          valueModalPeriod.itemIndex,
                          valueModalPeriod
                        );
                      }}
                    />
                    <div className="flex flex-col items-start space-y-2">
                      {publicSettings?.schedule?.map((scheduleItem, i) => {
                        const dayLabel = switchDayLabel(i);
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center space-y-2"
                          >
                            <p className="self-start text-lg font-medium">
                              {dayLabel} :
                            </p>
                            {scheduleItem.services.length === 0 ? (
                              <PeriodItem
                                className="w-40"
                                key={i}
                                start={null}
                                end={null}
                                otherValue={
                                  /* if no servce -> closed */ "Fermé"
                                }
                                closeBtn={false}
                                onClickMainBtn={() => {
                                  setModalScheduleOpen(true);
                                  setValueModalPeriod({
                                    dayIndex: i,
                                    itemIndex: null,
                                    start: null,
                                    end: null,
                                    delivery: true,
                                    takeaway: true,
                                  });
                                  setModalPeriodOperation("create");
                                }}
                                type="time"
                              />
                            ) : (
                              scheduleItem.services.map((service, j) => (
                                <div>
                                  <PeriodItem
                                    key={j}
                                    start={service.start}
                                    end={service.end}
                                    otherValue={null}
                                    closeBtn={true}
                                    onClickMainBtn={() => {
                                      setModalPeriodOperation("update");
                                      setValueModalPeriod({
                                        dayIndex: i,
                                        itemIndex: j,
                                        start: service.start,
                                        end: service.end,
                                        delivery: service.delivery,
                                        takeaway: service.takeaway,
                                      });
                                      setModalScheduleOpen(true);
                                    }}
                                    onClickCloseBtn={() => deleteService(i, j)}
                                    type="time"
                                  />
                                </div>
                              ))
                            )}
                            <AddBtn
                              onClick={() => {
                                setModalPeriodOperation("create");
                                setValueModalPeriod({
                                  dayIndex: i,
                                  itemIndex: null,
                                  start: null,
                                  end: null,
                                  delivery: true,
                                  takeaway: true,
                                });
                                setModalScheduleOpen(true);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <h2 className="font-bold">Fermetures exceptionnelles</h2>
                    <ModalPeriod
                      type={"date"}
                      value={valueModalPeriod}
                      setValue={setValueModalPeriod}
                      open={isModalExceptionalClosingsOpen}
                      setOpen={setModalExceptionalClosingOpen}
                      startLabel={"Début de la période de fermeture"}
                      endLabel={"Fin de la période de fermeture"}
                      variant={null}
                      validateBtnFunction={() => {
                        let functionToUse;
                        switch (modalPeriodOperation) {
                          case "create":
                            functionToUse = createExceptionalClosing;
                            break;
                          case "update":
                            functionToUse = updateExceptionalClosing;
                            break;
                          default:
                            break;
                        }
                        functionToUse(valueModalPeriod.itemIndex, {
                          start: valueModalPeriod.start,
                          end: valueModalPeriod.end,
                        });
                      }}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {publicSettings?.exceptionalClosings.map(
                        (exceptionalClosing, i) => {
                          const exceptionalClosingDate = {
                            start: new Date(exceptionalClosing.start),
                            end: new Date(exceptionalClosing.end),
                          };
                          const exceptionalClosingLocalString = {
                            start: exceptionalClosingDate.start.toLocaleString(
                              "fr-FR",
                              optionsDateFormatting
                            ),
                            end: exceptionalClosingDate.end.toLocaleString(
                              "fr-FR",
                              optionsDateFormatting
                            ),
                          };

                          return (
                            <div>
                              <PeriodItem
                                key={i}
                                start={exceptionalClosingLocalString.start}
                                end={exceptionalClosingLocalString.end}
                                otherValue={false}
                                closeBtn={true}
                                onClickMainBtn={() => {
                                  setModalPeriodOperation("update");
                                  setValueModalPeriod({
                                    dayIndex: null,
                                    itemIndex: i,
                                    start: moment(
                                      exceptionalClosingDate.start
                                    ).format("YYYY-MM-DD"),
                                    end: moment(
                                      exceptionalClosingDate.end
                                    ).format("YYYY-MM-DD"),
                                  });
                                  setModalExceptionalClosingOpen(true);
                                }}
                                onClickCloseBtn={() =>
                                  deleteExceptionalClosing(i)
                                }
                              />
                            </div>
                          );
                        }
                      )}
                      <AddBtn
                        className="h-4 w-4"
                        onClick={() => {
                          setModalExceptionalClosingOpen(true);
                          setModalPeriodOperation("create");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-4 font-bold">Informations générales</h2>
                  <div class="flex flex-col gap-4 sm:grid sm:grid-cols-2">
                    <div className="w-2/3">
                      <FormInput
                        label="Nom de l'établissement"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.name}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            name: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Site web"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.website}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            website: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Rue"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.street}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            street: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Numéro"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.streetNumber}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            streetNumber: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Ville"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.city}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            city: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Code Postal"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.postCode}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            postCode: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Pays"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.country}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            country: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Numéro de téléphone"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.phoneNumber}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            phoneNumber: input,
                          })
                        }
                        validationFunction={(e) =>
                          phoneNumberValidation(
                            e,
                            setValidationErrors,
                            "phoneNumber"
                          )
                        }
                        validationError={validationErrors.phoneNumber}
                      />
                    </div>
                    <div className="w-2/3">
                      <FormInput
                        label="Email"
                        labelSize="lg"
                        textSize="normal"
                        value={formRestaurantInfo.mail}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            mail: input,
                          })
                        }
                        validationFunction={(e) =>
                          mailValidation(e, setValidationErrors, "mail")
                        }
                        validationError={validationErrors.mail}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSettings === "order" && (
              <div className="flex flex-col w-full h-full space-y-4 pb-2">
                <div className="space-y-4">
                  <h2 className="mb-4 font-bold">Commandes à livrer</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-lg font-medium block mb-2">
                        Minimum d'achat pour la livraison (€)
                      </label>
                      <div className="text-center w-48">
                        <InputNumber
                          labelSize="lg"
                          textSize="normal"
                          id="alertInterval"
                          value={publicSettings.deliveryMin}
                          onChange={(value) => {
                            setPublicSettings({
                              ...publicSettings,
                              deliveryMin: value,
                            });
                          }}
                          onIncrement={() => {
                            let updatedDeliveryMin =
                              Number(publicSettings.deliveryMin) + 1;

                            setPublicSettings({
                              ...publicSettings,
                              deliveryMin: updatedDeliveryMin,
                            });
                          }}
                          onDecrement={() => {
                            let updatedDeliveryMin =
                              Number(publicSettings.deliveryMin) - 1;

                            if (updatedDeliveryMin < 0) {
                              updatedDeliveryMin = 0;
                            }
                            setPublicSettings({
                              ...publicSettings,
                              deliveryMin: updatedDeliveryMin,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-lg font-medium">
                        Frais de livraison (€)
                      </label>
                      <div className="text-center  w-48">
                        <InputNumber
                          labelSize="lg"
                          textSize="normal"
                          id="alertInterval"
                          value={publicSettings.deliveryFees}
                          onChange={(value) => {
                            if (value >= 0) {
                              setPublicSettings({
                                ...publicSettings,
                                deliveryFees: value,
                              });
                            }
                          }}
                          onIncrement={() => {
                            let updatedDeliveryFees =
                              Number(publicSettings.deliveryFees) + 1;

                            setPublicSettings({
                              ...publicSettings,
                              deliveryFees: updatedDeliveryFees,
                            });
                          }}
                          onDecrement={() => {
                            let updatedDeliveryFees =
                              Number(publicSettings.deliveryFees) - 1;

                            if (updatedDeliveryFees < 0) {
                              updatedDeliveryFees = 0;
                            }
                            setPublicSettings({
                              ...publicSettings,
                              deliveryFees: updatedDeliveryFees,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-lg font-medium block mb-2">
                        Délai de livraison, moyenne basse (minutes)
                      </label>
                      <div className="text-center  w-48">
                        <InputNumber
                          labelSize="lg"
                          textSize="normal"
                          id="alertInterval"
                          value={publicSettings.deliveryEstimate.min}
                          onChange={(value) => {
                            if (value >= 0) {
                              setPublicSettings({
                                ...publicSettings,
                                deliveryEstimate: {
                                  ...publicSettings.deliveryEstimate,
                                  min: value,
                                },
                              });
                            }
                          }}
                          onIncrement={() => {
                            let updatedDeliveryEstimate = {
                              ...publicSettings.deliveryEstimate,
                            };
                            updatedDeliveryEstimate.min =
                              Number(updatedDeliveryEstimate.min) + 15;

                            setPublicSettings({
                              ...publicSettings,
                              deliveryEstimate: updatedDeliveryEstimate,
                            });
                          }}
                          onDecrement={() => {
                            let updatedDeliveryEstimate = {
                              ...publicSettings.deliveryEstimate,
                            };
                            updatedDeliveryEstimate.min =
                              Number(updatedDeliveryEstimate.min) - 15;

                            if (updatedDeliveryEstimate.min < 0) {
                              updatedDeliveryEstimate.min = 0;
                            }
                            setPublicSettings({
                              ...publicSettings,
                              deliveryEstimate: updatedDeliveryEstimate,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-lg font-medium block mb-2">
                      Délai de livraison, moyenne haute (minutes)
                    </label>
                    <div className="text-center  w-48">
                      <InputNumber
                        labelSize="lg"
                        textSize="normal"
                        id="alertInterval"
                        value={publicSettings.deliveryEstimate.max}
                        onChange={(value) => {
                          if (value >= 0) {
                            setPublicSettings({
                              ...publicSettings,
                              deliveryEstimate: {
                                ...publicSettings.deliveryEstimate,
                                max: value,
                              },
                            });
                          }
                        }}
                        onIncrement={() => {
                          let updatedDeliveryEstimate = {
                            ...publicSettings.deliveryEstimate,
                          };
                          updatedDeliveryEstimate.max =
                            Number(updatedDeliveryEstimate.max) + 15;

                          setPublicSettings({
                            ...publicSettings,
                            deliveryEstimate: updatedDeliveryEstimate,
                          });
                        }}
                        onDecrement={() => {
                          let updatedDeliveryEstimate = {
                            ...publicSettings.deliveryEstimate,
                          };
                          updatedDeliveryEstimate.max =
                            Number(updatedDeliveryEstimate.max) - 15;

                          if (updatedDeliveryEstimate.max < 0) {
                            updatedDeliveryEstimate.max = 0;
                          }
                          setPublicSettings({
                            ...publicSettings,
                            deliveryEstimate: updatedDeliveryEstimate,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-lg  font-medium block mb-2">
                      Codes postaux éligibles pour la livraison{" "}
                    </label>
                    <div className="grid grid-cols1 sm:grid-cols-3 w-fit gap-x-10 gap-y-4">
                      {publicSettings.deliveryPostCodes.map((postCode, i) => (
                        <div>
                          <div className="relative w-fit">
                            <div className="w-32">
                              <InputNumber
                                labelSize="lg"
                                textSize="normal"
                                value={postCode}
                                onChange={(input) => {
                                  let updatedDeliveryPostCodes = [
                                    ...publicSettings.deliveryPostCodes,
                                  ];
                                  updatedDeliveryPostCodes[i] = input;
                                  setPublicSettings({
                                    ...publicSettings,
                                    deliveryPostCodes: updatedDeliveryPostCodes,
                                  });
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                let updatedDeliveryPostCodes = [
                                  ...publicSettings.deliveryPostCodes,
                                ];
                                updatedDeliveryPostCodes.splice(i, 1);
                                setPublicSettings({
                                  ...publicSettings,
                                  deliveryPostCodes: updatedDeliveryPostCodes,
                                });
                              }}
                              className="absolute -right-8 top-0 bottom-0"
                            >
                              <XMarkIcon className="h-8 w-8 text-gray-400 hover:text-dark-grey" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <AddBtn
                        className="self-center m-auto sm:m-0"
                        onClick={() => {
                          let updatedDeliveryPostCodes = [
                            ...publicSettings.deliveryPostCodes,
                          ];
                          updatedDeliveryPostCodes.push("");
                          setPublicSettings({
                            ...publicSettings,
                            deliveryPostCodes: updatedDeliveryPostCodes,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4 font-bold">Commandes à emporter</h2>
                  <div>
                    <label className="text-lg font-medium block mb-2">
                      Délai de préparation moyen (minutes)
                    </label>
                    <div className="text-center w-48">
                      <InputNumber
                        labelSize="lg"
                        textSize="normal"
                        id="alertInterval"
                        value={publicSettings.takeAwayEstimate}
                        onChange={(value) => {
                          if (value >= 0) {
                            setPublicSettings({
                              ...publicSettings,
                              takeAwayEstimate: value,
                            });
                          }
                        }}
                        onIncrement={() => {
                          let updatedTakawayEstimate =
                            Number(publicSettings.takeAwayEstimate) + 5;

                          setPublicSettings({
                            ...publicSettings,
                            takeAwayEstimate: updatedTakawayEstimate,
                          });
                        }}
                        onDecrement={() => {
                          let updatedTakawayEstimate =
                            Number(publicSettings.takeAwayEstimate) - 5;

                          if (updatedTakawayEstimate < 0) {
                            updatedTakawayEstimate = 0;
                          }
                          setPublicSettings({
                            ...publicSettings,
                            takeAwayEstimate: updatedTakawayEstimate,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4 font-bold">Moyens de paiement</h2>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <p className="text-lg font-semibold w-28">Livraison</p>
                    {publicSettings.paymentMethods.map((paymentMethod, i) => {
                      const paymentMethodLabel = switchPaymentMethodLabel(
                        paymentMethod.value
                      );

                      return (
                        <div key={i} className="flex items-center">
                          <input
                            id={i}
                            name="payment-method"
                            type="checkbox"
                            className="h-5 w-5 sm:h-4 sm:w-4 border-gray-300 text-primary focus:ring-primary"
                            checked={paymentMethod.delivery}
                            onChange={() => {
                              let updatedPaymentMethods = [
                                ...publicSettings.paymentMethods,
                              ]; // Make a copy of paymentMethods array
                              let updatedPaymentMethod = {
                                ...updatedPaymentMethods[i],
                              }; // Make a copy of the specific payment method object
                              updatedPaymentMethod.delivery =
                                !updatedPaymentMethod.delivery; // Update the delivery status
                              updatedPaymentMethods[i] = updatedPaymentMethod; // Update the payment method in the array
                              setPublicSettings({
                                ...publicSettings,
                                paymentMethods: updatedPaymentMethods,
                              });
                            }}
                          />
                          <label
                            htmlFor={paymentMethod.value}
                            className="ml-3 block font-medium leading-6"
                          >
                            {paymentMethodLabel}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <p className="text-lg font-semibold w-28">À emporter</p>
                    {publicSettings.paymentMethods.map((paymentMethod, i) => {
                      const paymentMethodLabel = switchPaymentMethodLabel(
                        paymentMethod.value
                      );

                      return (
                        <div key={i} className="flex items-center">
                          <input
                            id={i}
                            name="payment-method"
                            type="checkbox"
                            className="h-5 w-5 sm:h-4 sm:w-4 border-gray-300 text-primary focus:ring-primary"
                            checked={paymentMethod.takeAway}
                            onChange={() => {
                              let updatedPaymentMethods = [
                                ...publicSettings.paymentMethods,
                              ]; // Faites une copie du tableau paymentMethods
                              updatedPaymentMethods[i] = {
                                ...updatedPaymentMethods[i],
                                takeAway: !updatedPaymentMethods[i].takeAway,
                              };
                              setPublicSettings({
                                ...publicSettings,
                                paymentMethods: updatedPaymentMethods,
                              });
                            }}
                          />
                          <label
                            htmlFor={paymentMethod.value}
                            className="ml-3 block font-medium leading-6"
                          >
                            {paymentMethodLabel}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4 font-bold">
                    {"Réceptions des commandes par mail"}
                  </h2>
                  <div className="space-y-2 flex flex-col w-fit">
                    <TabBtn
                      values={["Activer", "Désactiver"]}
                      currentTab={
                        privateSettings.orderMailReception.enabled ? 0 : 1
                      }
                      onClickTab={(i) => {
                        let updatedOrderMailreception = {
                          ...privateSettings.orderMailReception,
                        };

                        if (i === 0) {
                          //enable
                          updatedOrderMailreception.enabled = true;
                        } else if (i === 1) {
                          //disable
                          updatedOrderMailreception.enabled = false;
                        }
                        setPrivateSettings({
                          ...privateSettings,
                          orderMailReception: updatedOrderMailreception,
                        });
                      }}
                    />
                    <div>
                      <label
                        className={`ml-px block text-lg font-medium leading-6 mb-2`}
                      >
                        Adresse mail
                      </label>
                      <div className="relative">
                        <FormInput
                          textSize="lg"
                          value={privateSettings.orderMailReception.mail}
                          onChange={(input) => {
                            let updatedOrderMailReception = {
                              ...privateSettings.orderMailReception,
                            };
                            updatedOrderMailReception.mail = input;
                            setPrivateSettings({
                              ...privateSettings,
                              orderMailReception: {
                                ...updatedOrderMailReception,
                              },
                            });
                          }}
                          validationFunction={(e) =>
                            mailValidation(
                              e,
                              setValidationErrors,
                              "orderMailReception"
                            )
                          }
                          validationError={validationErrors.orderMailReception}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4 font-bold">Alertes sonores</h2>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      Alerte pour les commande en attente
                    </p>
                    <TabBtn
                      values={["Activer", "Désactiver"]}
                      currentTab={
                        privateSettings.pendingOrderAlert.enabled ? 0 : 1
                      }
                      onClickTab={(i) => {
                        let updatedPendingOrderAlert = {
                          ...privateSettings.pendingOrderAlert,
                        };
                        if (i === 0) {
                          //enable
                          updatedPendingOrderAlert.enabled = true;
                        } else if (i === 1) {
                          //disable
                          updatedPendingOrderAlert.enabled = false;
                        }
                        setPrivateSettings({
                          ...privateSettings,
                          pendingOrderAlert: updatedPendingOrderAlert,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium">
                      Rappel sonores (minutes)
                    </label>
                    <div className="text-center  w-48">
                      <InputNumber
                        labelSize="lg"
                        textSize="normal"
                        id="alertInterval"
                        value={privateSettings.pendingOrderAlert.interval}
                        onChange={(value) => {
                          let updatedPendingOrderAlert = {
                            ...privateSettings.pendingOrderAlert,
                          };
                          if (value >= 0) {
                            updatedPendingOrderAlert.interval = value;
                            setPrivateSettings({
                              ...privateSettings,
                              pendingOrderAlert: updatedPendingOrderAlert,
                            });
                          }
                        }}
                        onIncrement={() => {
                          let updatedPendingOrderAlert = {
                            ...privateSettings.pendingOrderAlert,
                          };
                          updatedPendingOrderAlert.interval =
                            Number(updatedPendingOrderAlert.interval) + 5;
                          setPrivateSettings({
                            ...privateSettings,
                            pendingOrderAlert: updatedPendingOrderAlert,
                          });
                        }}
                        onDecrement={() => {
                          let updatedPendingOrderAlert = {
                            ...privateSettings.pendingOrderAlert,
                          };
                          updatedPendingOrderAlert.interval =
                            Number(updatedPendingOrderAlert.interval) - 5;
                          if (updatedPendingOrderAlert.interval < 0) {
                            updatedPendingOrderAlert.interval = 0;
                          }
                          setPrivateSettings({
                            ...privateSettings,
                            pendingOrderAlert: updatedPendingOrderAlert,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSettings === "account" && (
              <div className="flex flex-col px-4 sm:px-10  w-full h-full space-y-8 pb-2">
                <div className="space-y-4">
                  <PasswordUpdate />
                </div>
                <div className="w-full sm:w-5/12 space-y-4 text-center">
                  <DefaultBtn
                    value="Se déconnecter"
                    className="bg-error-danger hover:brightness-95 rounded-s-lg rounded-e-lg text-lg font-bold  focus:text-white text-white self-center"
                    onClick={() => onClickLogOut()}
                    color="error-danger"
                  />
                </div>
              </div>
            )}
          </div>
          {activeSettings !== "account" && (
            <FooterSettings
              validationErrors={validationErrors}
              formRestaurantInfo={formRestaurantInfo}
              publicSettings={publicSettings}
              privateSettings={privateSettings}
            />
          )}
        </main>
      </>
    );
  }
}
