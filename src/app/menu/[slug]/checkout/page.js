"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cart/cartSlice";
import { useState, useEffect, useRef } from "react";
import useFetch from "@/hooks/useFetch";
import useRedirectIfCartEmpty from "../../../../hooks/useRedirectIfCartEmpty";
import Cart from "../../../../components/menu/Cart";
import { RestaurantLogo } from "@/components/ui/RestaurantLogo";
import OrderTabBtn from "@/components/menu/OrderTabBtn";
import FormInput from "../../../../components/ui/FormInput";
import DefaultBtn from "@/components/ui/DefaultBtn";
import SelectArrivalTimeBtn from "@/components/menu/checkout/SelectArrivalTimeBtn";
import StripeModal from "@/components/menu/checkout/StripeModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { switchPaymentMethodLabel } from "@/utils/switchLabel";
import { loadStripe } from "@stripe/stripe-js";

import {
  missingInformationValidation,
  phoneNumberValidation,
  postCodeValidation,
  mailValidation,
  arrivalTimeValidation,
} from "@/utils/validations";

import {
  isValidTimeString,
  compteNewDateBasedOnTimeString,
} from "@/utils/dateAndTime";
import InputNumber from "@/components/ui/InputNumber";
import useRestaurantData from "@/hooks/useRestaurantData";
import useCheckRestaurantStatus from "@/hooks/useCheckRestaurantStatus";

export default function Checkout({ params }) {
  //redirect to menu page if cart modification during checkout leads to empty cart
  const router = useRouter();
  const dispatch = useDispatch();
  useRedirectIfCartEmpty();
  useRestaurantData(params.slug, "restaurantPublic");

  //mobileScrollRef is used to scroll directly behind the card on checkout
  const mobileScrollRef = useRef(null);
  const restaurant = useSelector((state) => state.restaurantPublic);

  const cart = useSelector((state) => state.cart);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [form, setForm] = useState({
    street: "",
    streetNumber: "",
    postCode: "",
    city: "",
    firstname: "",
    lastname: "",
    mail: "",
    phoneNumber: "",
  });
  //validations forms
  const [validationErrors, setValidationErrors] = useState({
    street: "",
    streetNumber: "",
    postCode: "",
    city: "",
    firstname: "",
    lastname: "",
    mail: "",
    phoneNumber: "",
    paymentMethod: "",
    restaurantOpen: "",
    arrivalTime: "",
  });
  const [orderError, setOrderError] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  //fetchTrigger triggers the useFetch hook on confirmOrder
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [fetchOptions, setFetchOptions] = useState(null);
  const [timeString, setTimeString] = useState(null);

  //this part of the code are designed for the SelectedArrivalTimeBtn
  const timeInterval = 15;
  //this variable is the defaultValue of the formSelect to choose arrivalTime
  const defaultOptionArrivalTimeSelect = "Choisissez une heure";
  const [
    isCurrentServiceActiveForSelectedOrderType,
    setIsCurrentServiceActiveForSelectedOrderType,
  ] = useState(null);
  const {
    restaurantOpen,
    currentService,
    remainingServicesForToday,
    restaurantStatus,
  } = useCheckRestaurantStatus(restaurant);

  //stripeModalOpen for onlinePayment
  const [stripeModalOpen, setStripeModalOpen] = useState(false);

  const newOrder = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/createOrder`,
    fetchOptions,
    fetchTrigger,
    setFetchTrigger
  );

  //this useEffect is used to leave the checkout page if needed to avoid problems
  useEffect(() => {
    const intervalId = setInterval(() => {
      //every timeInterval => leave checkout
      router.push(`/menu/${restaurant.data.slug}`);
    }, timeInterval * 60 * 1000);
    if (restaurantOpen === false) {
      router.push(`/menu/${restaurant.data.slug}`);
    }
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    //change payment method choices based on orderType
    let filteredPaymentMethods;
    if (cart.data.orderType === 0) {
      filteredPaymentMethods = restaurant.data.publicSettings.paymentMethods
        .filter((paymentMethod) => paymentMethod.delivery === true)
        .map((paymentMethod) => paymentMethod.value);

      setPaymentMethods(filteredPaymentMethods);
    } else if (cart.data.orderType === 1) {
      filteredPaymentMethods = restaurant.data.publicSettings.paymentMethods
        .filter((paymentMethod) => paymentMethod.takeAway === true)
        .map((paymentMethod) => paymentMethod.value);

      setPaymentMethods(filteredPaymentMethods);
    }

    if (filteredPaymentMethods?.includes("online") && !selectedPaymentMethod) {
      setSelectedPaymentMethod("online");
    }

    //postCode Validation based on orderType
    if (form.postCode !== "") {
      postCodeValidation(
        form.postCode,
        setValidationErrors,
        "postCode",
        restaurant.data.publicSettings.deliveryPostCodes,
        cart.data.orderType,
        restaurant.data.phoneNumber
      );
    }
  }, [cart.data.orderType]);

  // this useEffect is used to redirect to open the stripe modal if online payment or redirect to the order page if cash payment
  useEffect(() => {
    if (!newOrder.data) return;
    if (newOrder.data.clientSecret && selectedPaymentMethod === "online") {
      setStripeModalOpen(true);
    } else if (newOrder?.data?.status === "new") {
      router.push(`/menu/${params.slug}/order/${newOrder.data.orderNumber}`);

      //workaround to dispatch after router.push is completed (not the best solution)
      setTimeout(() => {
        dispatch(clearCart());
      }, "3000");
    }
  }, [newOrder]);

  const computeEstimatedArrivalDate = (orderType) => {
    const currentDate = new Date();
    let estimatedArrival;
    //if no timeString haveBeen selected or is not in the expected format (for example with the "As soon as possible" value)
    if (!timeString || !isValidTimeString(timeString)) {
      estimatedArrival = currentDate;
      //delivery
      if (orderType === 0) {
        estimatedArrival.setMinutes(
          currentDate.getMinutes() +
            restaurant.data.publicSettings.deliveryEstimate.max
        );
      }

      //takeAway
      else if (orderType === 1) {
        estimatedArrival.setMinutes(
          currentDate.getMinutes() +
            restaurant.data.publicSettings.takeAwayEstimate
        );
      }
    } else {
      estimatedArrival = compteNewDateBasedOnTimeString(
        currentDate,
        timeString
      );
    }

    return estimatedArrival;
  };

  useEffect(() => {
    if (window.innerWidth <= 640 && mobileScrollRef.current) {
      mobileScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  //prefetch stripe promise
  const [stripePromise, setStripePromise] = useState(
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  );

  const handleConfirmOrder = () => {
    arrivalTimeValidation(
      timeString,
      defaultOptionArrivalTimeSelect,
      setValidationErrors,
      isCurrentServiceActiveForSelectedOrderType,
      "arrivalTime"
    );
    //display errors on submit and not only onBlur
    missingInformationValidation(
      form.street,
      setValidationErrors,
      "street",
      "La rue est obligatoire"
    );
    missingInformationValidation(
      form.streetNumber,
      setValidationErrors,
      "streetNumber",
      "Le numéro de maison est obligatoire"
    );
    postCodeValidation(
      form.postCode,
      setValidationErrors,
      "postCode",
      restaurant.data.publicSettings.deliveryPostCodes,
      cart.data.orderType,
      restaurant.data.phoneNumber
    );
    missingInformationValidation(
      form.city,
      setValidationErrors,
      "city",
      "La ville est obligatoire"
    );
    missingInformationValidation(
      form.firstname,
      setValidationErrors,
      "firstname",
      "Le prénom est obligatoire"
    );
    missingInformationValidation(
      form.lastname,
      setValidationErrors,
      "lastname",
      "Le nom est obligatoire"
    );
    mailValidation(form.mail, setValidationErrors, "mail");
    phoneNumberValidation(form.phoneNumber, setValidationErrors, "phoneNumber");

    if (!selectedPaymentMethod) {
      setValidationErrors((previous) => ({
        ...previous,
        paymentMethod: "Aucun moyen de paiement sélectionné",
      }));
    } else {
      setValidationErrors((previous) => ({
        ...previous,
        paymentMethod: "",
      }));
    }
    if (!restaurantOpen) {
      setValidationErrors((previous) => ({
        ...previous,
        restaurantOpen: "L'établissement est actuellement fermé",
      }));
    }

    //use set + previous to avoid async problems
    setValidationErrors((previous) => {
      if (Object.values(previous).every((value) => value === "")) {
        setOrderError(false);
        //compute estimated arrival Date
        const estimatedArrivalDate = computeEstimatedArrivalDate(
          cart.data.orderType
        );

        //fetchOptions triggers the fetch
        setFetchOptions({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail: form.mail,
            firstname: form.firstname,
            lastname: form.lastname,
            phoneNumber: form.phoneNumber,
            street: form.street,
            streetNumber: form.streetNumber,
            city: form.city,
            postCode: form.postCode,
            articles: cart.data.articles.map((article) => ({
              food: article.food,
              quantity: article.quantity,
              options: article.selectedOptions.map(
                (selectedOption) => selectedOption._id
              ),
            })),
            note: cart.data.note,
            orderType: cart.data.orderType,
            paymentMethod: selectedPaymentMethod,
            estimatedArrivalDate: estimatedArrivalDate,
            slug: restaurant.data.slug,
          }),
        });
        setFetchTrigger(true);
      } else {
        setOrderError(true);
      }
      return previous;
    });
  };

  return (
    <>
      <div className="relative flex flex-col sm:flex-row">
        <div className="flex flex-col grow items-start justify-start px-6 sm:px-12 lg:pe-40">
          <div className="hidden sm:block me-4 mt-2 mb-4  sm:me-6 sm:my-6">
            <RestaurantLogo from="restaurantPublic" />
          </div>
          <div
            ref={mobileScrollRef}
            className="flex flex-col w-full space-y-10 mb-10"
          >
            <div className="space-y-4">
              <h2 className="font-title text-left">Informations de commande</h2>
              <div className="w-fit">
                <OrderTabBtn
                  currentService={currentService}
                  remainingServicesForToday={remainingServicesForToday}
                  restaurantStatus={restaurantStatus}
                  onChange={() => {
                    const updatedTimeString = defaultOptionArrivalTimeSelect;
                    setTimeString(defaultOptionArrivalTimeSelect);
                    arrivalTimeValidation(
                      updatedTimeString,
                      defaultOptionArrivalTimeSelect,
                      setValidationErrors,
                      isCurrentServiceActiveForSelectedOrderType,
                      "arrivalTime"
                    );
                  }}
                />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <FormInput
                      label="Rue"
                      id="streetName"
                      autoComplete="on"
                      name="streetName"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          street: input,
                        })
                      }
                      value={form.street}
                      validationFunction={(e) =>
                        missingInformationValidation(
                          form.street,
                          setValidationErrors,
                          "street",
                          "La rue est obligatoire"
                        )
                      }
                      validationError={validationErrors.street}
                    />
                  </div>
                  <div className="w-full">
                    <FormInput
                      label="Numéro de maison"
                      id="streetNumber"
                      autoComplete="on"
                      name="streetNumber"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          streetNumber: input,
                        })
                      }
                      value={form.streetNumber}
                      validationFunction={(e) =>
                        missingInformationValidation(
                          e,
                          setValidationErrors,
                          "streetNumber",
                          "Le numéro de maison est obligatoire"
                        )
                      }
                      validationError={validationErrors.streetNumber}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label className="font-medium block mb-2">
                      Code Postal
                    </label>
                    <InputNumber
                      id="postalCode"
                      autoComplete="on"
                      name="postalCode"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          postCode: input,
                        })
                      }
                      value={form.postCode}
                      validationFunction={(e) =>
                        postCodeValidation(
                          e,
                          setValidationErrors,
                          "postCode",
                          restaurant.data.publicSettings.deliveryPostCodes,
                          cart.data.orderType,
                          restaurant.data.phoneNumber
                        )
                      }
                      validationError={validationErrors.postCode}
                    />
                  </div>
                  <div className="w-full">
                    <FormInput
                      label="Ville"
                      id="city"
                      autoComplete="on"
                      name="city"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          city: input,
                        })
                      }
                      value={form.city}
                      validationFunction={(e) =>
                        missingInformationValidation(
                          e,
                          setValidationErrors,
                          "city",
                          "La ville est obligatoire"
                        )
                      }
                      validationError={validationErrors.city}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="font-title text-left">Délai de commande</h2>

              <SelectArrivalTimeBtn
                currentService={currentService}
                remainingServicesForToday={remainingServicesForToday}
                timeString={timeString}
                setTimeString={setTimeString}
                validationError={validationErrors.arrivalTime}
                setValidationErrors={setValidationErrors}
                timeInterval={timeInterval}
                defaultOptionArrivalTimeSelect={defaultOptionArrivalTimeSelect}
                isCurrentServiceActiveForSelectedOrderType={
                  isCurrentServiceActiveForSelectedOrderType
                }
                setIsCurrentServiceActiveForSelectedOrderType={
                  setIsCurrentServiceActiveForSelectedOrderType
                }
              />
            </div>
            <div>
              <h2 className="font-title text-left">Moyen de paiement</h2>
              <fieldset className="mt-4">
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, i) => {
                    const paymentMethodLabel =
                      switchPaymentMethodLabel(paymentMethod);

                    return (
                      <div key={i} className="flex items-center">
                        <input
                          id={i}
                          name="payment-method"
                          type="radio"
                          className="h-5 w-5 sm:h-4 sm:w-4 border-gray-300 text-primary focus:ring-primary"
                          onChange={() => {
                            setSelectedPaymentMethod(paymentMethod);
                            setValidationErrors((previous) => ({
                              ...previous,
                              paymentMethod: "",
                            }));
                          }}
                          defaultChecked={
                            selectedPaymentMethod === paymentMethod
                          }
                          value={selectedPaymentMethod}
                        />
                        <label
                          htmlFor={paymentMethod}
                          className="ml-3 block text-lg sm:text-base font-medium leading-6 text-gray-900"
                        >
                          {paymentMethodLabel}
                        </label>
                      </div>
                    );
                  })}
                  <StripeModal
                    open={stripeModalOpen}
                    setOpen={setStripeModalOpen}
                    clientSecret={newOrder.data?.clientSecret}
                    orderId={newOrder.data?.orderId}
                    orderNumber={newOrder?.data?.orderNumber}
                    stripePromise={stripePromise}
                    totalSum={newOrder.data?.totalSum}
                  />
                </div>
              </fieldset>
            </div>
            {validationErrors.paymentMethod && (
              <p className="text-error-danger">
                {validationErrors.paymentMethod}
              </p>
            )}

            <div className="w-full">
              <h2 className="font-title mb-4 text-left">
                Informations personnelles
              </h2>
              <div className="flex flex-col w-full">
                <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="w-full">
                    <FormInput
                      label="Prénom"
                      id="given-name"
                      autoComplete="on"
                      name="given-name"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          firstname: input,
                        })
                      }
                      value={form.firstname}
                      validationFunction={(e) =>
                        missingInformationValidation(
                          e,
                          setValidationErrors,
                          "firstname",
                          "Le prénom est obligatoire"
                        )
                      }
                      validationError={validationErrors.firstname}
                    />
                  </div>
                  <div className="w-full">
                    <FormInput
                      label="Nom"
                      id="family-name"
                      autoComplete="on"
                      name="family-name"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          lastname: input,
                        })
                      }
                      value={form.lastname}
                      validationFunction={(e) =>
                        missingInformationValidation(
                          e,
                          setValidationErrors,
                          "lastname",
                          "Le nom est obligatoire"
                        )
                      }
                      validationError={validationErrors.lastname}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 py-4">
                  <div className="w-full">
                    <FormInput
                      label="Adresse mail"
                      id="email"
                      autoComplete="on"
                      name="email"
                      placeholder="you@example.com"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          mail: input,
                        })
                      }
                      value={form.mail}
                      validationFunction={(e) =>
                        mailValidation(e, setValidationErrors, "mail")
                      }
                      validationError={validationErrors.mail}
                    />
                  </div>
                  <div className="w-full">
                    <FormInput
                      label="N° de téléphone"
                      id="tel"
                      autoComplete="on"
                      name="tel"
                      onChange={(input) =>
                        setForm({
                          ...form,
                          phoneNumber: input.trim(),
                        })
                      }
                      value={form.phoneNumber}
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
                </div>
              </div>
            </div>
            {validationErrors.restaurantOpen && (
              <p className="text-error-danger text-center">
                L'établissement est actuellement fermé
              </p>
            )}
            {orderError && (
              <p className="text-error-danger text-center">
                Un ou plusieurs des champs ci-dessus sont invalides
              </p>
            )}
            {newOrder.error?.status === 429 ? (
              <p className="text-error-danger text-center">
                Votre commande a déjà été effectuée. Pour modifier celle-ci,
                veuillez contacter l'établissement au{" "}
                {restaurant.data.phoneNumber}
              </p>
            ) : (
              newOrder.error && (
                <p className="text-error-danger text-center">
                  Nous avons rencontré une difficulté lors du traitement de
                  votre commande. Veuillez réessayer ultérieurement. Si vous le
                  souhaitez, vous pouvez nous aider à améliorer l'expérience en
                  signalant ce problème
                  <a href="https://erp.webwalkers.io/forms/ticket?styled=1">
                    {" "}
                    ici
                  </a>
                  .
                </p>
              )
            )}
            <div className="self-center w-fit">
              {!stripeModalOpen && (
                <DefaultBtn
                  value={"Confirmer la commande"}
                  className="sm:w-72 h-12 text-xl font-bold"
                  onClick={handleConfirmOrder}
                  color="success"
                  isLoading={
                    newOrder?.isLoading ||
                    newOrder?.data
                      ?.creationDate /*if creationDate is present, the order is created, let the loading until redirection */
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="order-first mb-4 sm:mb-0 sm:order-last">
          <Cart variant="checkout" />
        </div>
      </div>
    </>
  );
}
