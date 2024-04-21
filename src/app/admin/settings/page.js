"use client";
import { useState, useEffect } from "react";
import FormInput from "@/components/ui/FormInput.js";
import DefaultBtn from "@/components/ui/DefaultBtn";
import Header from "@/components/adminView/Header";
import SideNavigation from "@/components/adminView/settings/SideNavigation";
import RestaurantLogo from "@/components/ui/RestaurantLogo";
import PeriodItem from "@/components/adminView/settings/PeriodItem";
import ModalPeriod from "@/components/adminView/settings/ModalPeriod";
import AddBtn from "@/components/ui/AddBtn";
import InputNumber from "@/components/ui/InputNumber";
import RestaurantStatusOverrideBtn from "@/components/adminView/RestaurantStatusOverrideBtn";
import moment from "moment";

import TabBtn from "@/components/ui/TabBtn";

import { switchDayLabel } from "@/utils/switchLabel";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  mailValidation,
  phoneNumberValidation,
  missingInformationValidation,
} from "@/utils/validations";
import deepCopy from "@/utils/deepCopy";
import { switchPaymentMethodLabel } from "@/utils/switchLabel";
import FooterSettings from "@/components/adminView/settings/FooterSettings";
import Preloader from "@/components/ui/Preloader";
import useRefreshAuth from "@/hooks/useRefreshAuth";
import useCheckAuth from "@/hooks/useCheckAuth";
import useRestaurantData from "@/hooks/useRestaurantData";

import { logOut } from "@/redux/auth/authSlice";
import { XMarkIcon } from "@heroicons/react/20/solid";
import PasswordUpdate from "@/components/adminView/settings/PasswordUpdate";

export default function settings() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useRefreshAuth();
  useCheckAuth();
  useRestaurantData(auth.data?.user?.restaurantUniqueValue, "restaurantAdmin");
  //change this later
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurantAdmin);
  const [formRestaurantInfo, setFormRestaurantInfo] = useState(null);
  const [publicSettings, setPublicSettings] = useState(null);
  const [privateSettings, setPrivateSettings] = useState(null);
  const [accountSettings, setAccountSettings] = useState(null);
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

  const categoriesData = [
    "Paramètres restaurant",
    "Paramètres commandes",
    "Paramètres du compte",
  ];
  const [activeCategory, setActiveCategory] = useState(categoriesData[0]);

  const optionsDateFormatting = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
  });
  // crud string "create", "update", "delete" are used to trigger the adequate functions
  const [modalPeriodOperation, setModalPeriodOperation] = useState(null);
  // for Schedule
  const createService = (dayIndex, itemIndex = null, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.schedule[dayIndex].services.push(newValue);
    setPublicSettings(updatedPublicSettings);
  };

  const updateService = (dayIndex, itemIndex, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.schedule[dayIndex].services[itemIndex] = newValue;
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
    updatedPublicSettings.exceptionalClosings.push(newValue);
    setPublicSettings(updatedPublicSettings);
  };

  const updateExceptionalClosing = (itemIndex, newValue) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.exceptionalClosings[itemIndex] = newValue;
    setPublicSettings(updatedPublicSettings);
  };

  const deleteExceptionalClosing = (itemIndex, newValue = null) => {
    let updatedPublicSettings = deepCopy(publicSettings);
    updatedPublicSettings.exceptionalClosings.splice(itemIndex, 1);
    setPublicSettings(updatedPublicSettings);
  };

  const onClickLogOut = () => {
    dispatch(logOut()).then(() => router.push("/admin/login"));
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
        <div className="h-dvh flex flex-col overflow-hidden">
          <Header isSettingsActive={true} />
          <div className="flex flex-col sm:flex-row sm:h-full sm:ps-10  overflow-hidden">
            <SideNavigation
              categoriesData={categoriesData}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            {activeCategory === categoriesData[0] && (
              <div className="relative flex flex-col w-full px-4 sm:px-10 h-full space-y-8 overflow-y-auto pb-2">
                <RestaurantStatusOverrideBtn className="self-start md:absolute top-0 bottom-0 right-10" />

                <div>
                  <h2 className="mb-4">Informations générales</h2>
                  <p className="font-medium text-xl">Logo</p>
                  <div className="me-4 mt-2 mb-4  sm:me-6 sm:my-6">
                    <RestaurantLogo from={"restaurantAdmin"} />
                  </div>
                  <div class="grid grid-cols1 sm:grid-cols-2 gap-6">
                    <div className="w-full">
                      <FormInput
                        label="Nom de l'établissement"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.name}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            name: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Site web"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.website}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            website: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Rue"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.street}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            street: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Numéro"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.streetNumber}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            streetNumber: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Ville"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.city}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            city: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Code Postal"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.postCode}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            postCode: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Pays"
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.country}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            country: input,
                          })
                        }
                      />
                    </div>
                    <div className="w-full">
                      <FormInput
                        label="Numéro de téléphone"
                        labelSize="xl"
                        textSize="lg"
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
                    <div className="w-full">
                      <FormInput
                        label="Email"
                        labelSize="xl"
                        textSize="lg"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <h2 className="mb-4">Horraires d'ouverture</h2>
                    <ModalPeriod
                      type={"time"}
                      value={valueModalPeriod}
                      setValue={setValueModalPeriod}
                      open={isModalScheduleOpen}
                      setOpen={setModalScheduleOpen}
                      startLabel={"Début du service"}
                      endLabel={"Fin du service"}
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
                          {
                            start: valueModalPeriod.start,
                            end: valueModalPeriod.end,
                          }
                        );
                      }}
                    />
                    <div className="flex flex-col items-start space-y-6">
                      {publicSettings?.schedule.map((scheduleItem, i) => {
                        const dayLabel = switchDayLabel(i);
                        return (
                          <div
                            key={i}
                            className="flex flex-col items-center space-y-4"
                          >
                            <p className="self-start text-xl">{dayLabel} :</p>
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
                                  });
                                  setModalPeriodOperation("create");
                                }}
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
                                      });
                                      setModalScheduleOpen(true);
                                    }}
                                    onClickCloseBtn={() => deleteService(i, j)}
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
                                });
                                setModalScheduleOpen(true);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-6">
                    <h2 className="">Fermetures exceptionnelles</h2>
                    <ModalPeriod
                      type={"datetime-local"}
                      value={valueModalPeriod}
                      setValue={setValueModalPeriod}
                      open={isModalExceptionalClosingsOpen}
                      setOpen={setModalExceptionalClosingOpen}
                      startLabel={"Début de la période de fermeture"}
                      endLabel={"Fin de la période de fermeture"}
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
                    <div className="flex flex-col items-center space-y-4">
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
                                    ).format("YYYY-MM-DDTHH:mm"),
                                    end: moment(
                                      exceptionalClosingDate.end
                                    ).format("YYYY-MM-DDTHH:mm"),
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
                        onClick={() => {
                          setModalExceptionalClosingOpen(true);
                          setModalPeriodOperation("create");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeCategory === categoriesData[1] && (
              <div className="flex flex-col px-4 sm:px-10 w-full h-full space-y-8 overflow-y-auto pb-2">
                <div className="space-y-4">
                  <h2 className="mb-4">{"Types de commande"}</h2>
                  <div className="space-y-2">
                    <p className="font-medium text-xl">Fonction "À emporter"</p>
                    <TabBtn
                      values={["Activer", "Désactiver"]}
                      currentTab={publicSettings.orderTypes[1].enabled ? 0 : 1}
                      onClickTab={(i) => {
                        let updatedOrderType = {
                          ...publicSettings.orderTypes[1],
                        };
                        if (i === 0) {
                          //enable
                          updatedOrderType.enabled = true;
                        } else if (i === 1) {
                          //disable
                          updatedOrderType.enabled = false;
                        }
                        setPublicSettings({
                          ...publicSettings,
                          orderTypes: [
                            publicSettings.orderTypes[0],
                            updatedOrderType,
                          ],
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-xl">Fonction "Livraison"</p>
                    <TabBtn
                      values={["Activer", "Désactiver"]}
                      currentTab={publicSettings.orderTypes[0].enabled ? 0 : 1}
                      onClickTab={(i) => {
                        let updatedOrderType = {
                          ...publicSettings.orderTypes[0],
                        };
                        if (i === 0) {
                          //enable
                          updatedOrderType.enabled = true;
                        } else if (i === 1) {
                          //disable
                          updatedOrderType.enabled = false;
                        }
                        setPublicSettings({
                          ...publicSettings,
                          orderTypes: [
                            updatedOrderType,
                            publicSettings.orderTypes[1],
                          ],
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4">Commandes à livrer</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xl font-medium block mb-2">
                        Minimum d'achat pour la livraison (€)
                      </label>
                      <div className="text-center w-48">
                        <InputNumber
                          labelSize="xl"
                          textSize="lg"
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
                      <label className="text-xl font-medium">
                        Frais de livraison (€)
                      </label>
                      <div className="text-center  w-48">
                        <InputNumber
                          labelSize="xl"
                          textSize="lg"
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
                      <label className="text-xl font-medium block mb-2">
                        Délai de livraison, moyenne basse (minutes)
                      </label>
                      <div className="text-center  w-48">
                        <InputNumber
                          labelSize="xl"
                          textSize="lg"
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
                    <label className="text-xl font-medium block mb-2">
                      Délai de livraison, moyenne haute (minutes)
                    </label>
                    <div className="text-center  w-48">
                      <InputNumber
                        labelSize="xl"
                        textSize="lg"
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
                    <label className="text-xl font-medium block mb-2">
                      Codes postaux éligibles pour la livraison{" "}
                    </label>
                    <div className="grid grid-cols1 sm:grid-cols-3 w-fit gap-x-10 gap-y-4">
                      {publicSettings.deliveryPostCodes.map((postCode, i) => (
                        <div>
                          <div className="relative w-fit">
                            <div className="w-32">
                              <InputNumber
                                textSize="lg"
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
                  <h2 className="mb-4">Commandes à emporter</h2>
                  <div>
                    <label className="text-xl font-medium block mb-2">
                      Délai de préparation moyen (minutes)
                    </label>
                    <div className="text-center w-48">
                      <InputNumber
                        labelSize="xl"
                        textSize="lg"
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
                  <h2 className="mb-4">Moyens de paiement</h2>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <p className="text-xl font-medium w-28">Livraison</p>
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
                            className="ml-3 block text-medium font-medium text-lg  leading-6"
                          >
                            {paymentMethodLabel}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <p className="text-xl font-medium w-28">À emporter</p>
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
                            className="ml-3 block text-medium font-medium text-lg  leading-6"
                          >
                            {paymentMethodLabel}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="mb-4">
                    {"Réceptions des commandes par mail:"}
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
                  <h2 className="mb-4">Alertes sonores</h2>
                  <div className="space-y-2">
                    <p className="font-medium text-xl">
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
                    <label className="text-xl font-medium">
                      Rappel sonores (minutes)
                    </label>
                    <div className="text-center  w-48">
                      <InputNumber
                        labelSize="xl"
                        textSize="lg"
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
            {activeCategory === categoriesData[2] && (
              <div className="flex flex-col px-4 sm:px-10  w-full h-full space-y-8 overflow-y-auto pb-2">
                <div className="space-y-4">
                  {/*
                     <h2 className="mb-4">Informations du compte</h2>
                  <div className="space-y-2">
                    <p className="font-medium text-xl"></p>
                    <div className="w-full sm:w-5/12">
                      <FormInput
                        label="Adresse mail de connection :
                        "
                        labelSize="xl"
                        textSize="lg"
                        value={formRestaurantInfo.mail}
                        onChange={(input) =>
                          setFormRestaurantInfo({
                            ...formRestaurantInfo,
                            mail: input,
                          })
                        }
                        validationFunction={(e) =>
                          mailValidation(e, setValidationErrors)
                        }
                        validationError={validationErrors.mail}
                      />
                    </div>
                  </div>
                
            */}
                  <PasswordUpdate />
                </div>
                <div className="w-full sm:w-5/12 space-y-4 text-center">
                  <DefaultBtn
                    value="Se déconnecter"
                    className="bg-error-danger hover:brightness-95 rounded-s-lg rounded-e-lg text-xl font-bold  focus:text-white text-white self-center"
                    onClick={() => onClickLogOut()}
                    color="error-danger"
                  />
                </div>
              </div>
            )}
          </div>
          {activeCategory !== categoriesData[2] && (
            <FooterSettings
              validationErrors={validationErrors}
              formRestaurantInfo={formRestaurantInfo}
              publicSettings={publicSettings}
              privateSettings={privateSettings}
            />
          )}
        </div>
      </>
    );
  }
}
