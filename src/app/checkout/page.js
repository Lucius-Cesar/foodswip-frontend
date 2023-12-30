"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Cart from "../../components/eaterView/Cart";
import RestaurantLogo from "../../components/RestaurantLogo";
import OrderTabBtn from "@/components/eaterView/OrderTabBtn";
import FormInput from "../../components/ui/FormInput";
import DefaultBtn from "@/components/ui/DefaultBtn";

export default function Checkout() {
  const router = useRouter();

  const restaurant = useSelector((state) => state.restaurant);
  const cart = useSelector((state) => state.cart);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    if (cart.orderType === 0) {
      const paymentMethodsForDelivery =
        restaurant.orderSettings.paymentMethods.filter(
          (paymentMethod) => paymentMethod.delivery === true
        );
      setPaymentMethods(paymentMethodsForDelivery);
    } else if (cart.orderType === 1) {
      const paymentMethodsForTakeAway =
        restaurant.orderSettings.paymentMethods.filter(
          (paymentMethod) => paymentMethod.takeAway === true
        );
      setPaymentMethods(paymentMethodsForTakeAway);
    }
  }, [cart.orderType]);

  const [form, setForm] = useState({
    adress: "",
    postCode: "",
    city: "",
    firstname: "",
    lastname: "",
    mail: "",
    phoneNumber: "",
  });

  //validations forms
  const [validationErrors, setValidationErrors] = useState({
    adress: "",
    postCode: "",
    city: "",
    firstname: "",
    lastname: "",
    mail: "",
    phoneNumber: "",
    paymentMethod: "",
  });

  const [orderError, setOrderError] = useState(false);

  const checkIfInputContainsOnlyNumber = (input) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(input);
  };

  const adressValidation = (adress) => {
    !adress
      ? setValidationErrors((previous) => ({
          ...previous,
          adress: "L'adresse est obligatoire",
        }))
      : setValidationErrors((previous) => ({ ...previous, adress: "" }));
  };

  const postCodeValidation = (postCode) => {
    if (!postCode) {
      setValidationErrors((previous) => ({
        ...previous,
        postCode: "Le code postal est obligatoire",
      }));
    } else if (!checkIfInputContainsOnlyNumber(postCode)) {
      setValidationErrors((previous) => ({
        ...previous,
        postCode: "Le code postal doit être uniquement constitué de chiffres",
      }));
    } else {
      setValidationErrors((previous) => ({
        ...previous,
        postCode: "",
      }));
    }
  };

  const cityValidation = (city) => {
    !city
      ? setValidationErrors((previous) => ({
          ...previous,
          city: "La ville est obligatoire",
        }))
      : setValidationErrors((previous) => ({ ...previous, city: "" }));
  };

  const firstnameValidation = (firstname) => {
    !firstname
      ? setValidationErrors((previous) => ({
          ...previous,
          firstname: "Le prénom est obligatoire",
        }))
      : setValidationErrors((previous) => ({ ...previous, firstname: "" }));
  };

  const lastnameValidation = (lastname) => {
    !lastname
      ? setValidationErrors((previous) => ({
          ...previous,
          lastname: "Le nom est obligatoire",
        }))
      : setValidationErrors((previous) => ({ ...previous, lastname: "" }));
  };

  const mailValidation = (mail) => {
    if (!mail) {
      setValidationErrors((previous) => ({
        ...previous,
        mail: "L'adresse mail est obligatoire",
      }));
    } else {
      const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (mailRegex.test(mail) || !mail) {
        setValidationErrors((previous) => ({
          ...previous,
          mail: "",
        }));
      } else {
        setValidationErrors((previous) => ({
          ...previous,
          mail: "L'adresse mail entrée n'est pas valide",
        }));
      }
    }
  };

  const phoneNumberValidation = (phoneNumber) => {
    if (!phoneNumber) {
      setValidationErrors((previous) => ({
        ...previous,
        phoneNumber: "Le numéro de téléphone est obligatoire",
      }));
    } else if (!checkIfInputContainsOnlyNumber(phoneNumber)) {
      setValidationErrors((previous) => ({
        ...previous,
        phoneNumber:
          "Le numéro de téléphone doit être uniquement constitué de chiffres",
      }));
    } else {
      setValidationErrors((previous) => ({
        ...previous,
        phoneNumber: "",
      }));
    }
  };

  const handleConfirmOrder = () => {
    //display errors on submit and not only onBlur
    adressValidation(form.adress);
    postCodeValidation(form.postCode);
    cityValidation(form.city);
    firstnameValidation(form.firstname);
    lastnameValidation(form.lastname);
    mailValidation(form.mail);
    phoneNumberValidation(form.phoneNumber);

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

    //use set + previous to avoid async problems
    setValidationErrors((previous) => {
      if (Object.values(previous).every((value) => value === "")) {
        setOrderError(false);
        router.push("/checkout/success", { scroll: false });
      } else {
        setOrderError(true);
      }
      return previous;
    });
  };

  return (
    <div className="relative flex flex-row">
      <div className="flex flex-col grow items-start justify-start px-2 sm:px-12 lg:pe-40">
        <RestaurantLogo />
        <div className="flex flex-col w-full space-y-10 mb-10">
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">Informations de commande</h2>
            <OrderTabBtn />

            <FormInput
              label="Adresse"
              id="adress"
              onChange={(input) =>
                setForm({
                  ...form,
                  adress: input,
                })
              }
              value={form.adress}
              validationFunction={adressValidation}
              validationError={validationErrors.adress}
            />
            <div className="flex flex-row space-x-4">
              <FormInput
                label="Code postal"
                id="postcode"
                onChange={(input) =>
                  setForm({
                    ...form,
                    postCode: input,
                  })
                }
                value={form.postCode}
                validationFunction={postCodeValidation}
                validationError={validationErrors.postCode}
              />
              <FormInput
                label="Ville"
                id="city"
                onChange={(input) =>
                  setForm({
                    ...form,
                    city: input,
                  })
                }
                value={form.city}
                validationFunction={cityValidation}
                validationError={validationErrors.city}
              />
            </div>
            {cart.orderType === 0 ? (
              <h3 className="font-bold text-lg">
                Estimation des délais de livraison: entre{" "}
                {restaurant.orderSettings.deliveryEstimate.min} et{" "}
                {restaurant.orderSettings.deliveryEstimate.max} min *
              </h3>
            ) : cart.orderType === 1 ? (
              <h3 className="font-bold text-lg">
                Estimation du délai pour emporter:{" "}
                {restaurant.orderSettings.takeAwayEstimate} min *
              </h3>
            ) : null}
            <p>
              * La durée mentionnée est une estimation moyenne à titre
              indicatif.{" "}
            </p>
          </div>
          <div>
            <h2 className="font-bold text-2xl">Moyen de paiement</h2>
            <fieldset className="mt-4">
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {paymentMethods.map((paymentMethod, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      id={i}
                      name="payment-method"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      onChange={() => {
                        setSelectedPaymentMethod(paymentMethods[i]);
                        setValidationErrors((previous) => ({
                          ...previous,
                          paymentMethod: "",
                        }));
                      }}
                      value={paymentMethod}
                    />
                    <label
                      htmlFor={paymentMethod.value}
                      className="ml-3 block text-md font-medium leading-6 text-gray-900"
                    >
                      {paymentMethod.value}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          {validationErrors.paymentMethod && (
            <p className="text-error-danger">
              {validationErrors.paymentMethod}
            </p>
          )}

          <div>
            <h2 className="font-bold text-2xl mb-4">
              Informations personnelles
            </h2>
            <div className="space-y-4">
              <div className="flex flex-row space-x-4">
                <FormInput
                  label="Prénom"
                  id="firstname"
                  onChange={(input) =>
                    setForm({
                      ...form,
                      firstname: input,
                    })
                  }
                  value={form.firstname}
                  validationFunction={firstnameValidation}
                  validationError={validationErrors.firstname}
                />
                <FormInput
                  label="Nom"
                  id="lastname"
                  onChange={(input) =>
                    setForm({
                      ...form,
                      lastname: input,
                    })
                  }
                  value={form.lastname}
                  validationFunction={lastnameValidation}
                  validationError={validationErrors.lastname}
                />
              </div>

              <div className="flex flex-row space-x-4">
                <FormInput
                  label="Adresse mail"
                  id="mail"
                  placeholder="you@example.com"
                  onChange={(input) =>
                    setForm({
                      ...form,
                      mail: input,
                    })
                  }
                  value={form.mail}
                  validationFunction={mailValidation}
                  validationError={validationErrors.mail}
                />
                <FormInput
                  label="N° de téléphone"
                  id="phonenumber"
                  onChange={(input) =>
                    setForm({
                      ...form,
                      phoneNumber: input,
                    })
                  }
                  value={form.phoneNumber}
                  validationFunction={phoneNumberValidation}
                  validationError={validationErrors.phoneNumber}
                />
              </div>
            </div>
          </div>
          {orderError && (
            <p className="text-error-danger self-center">
              Un ou plusieurs des champs ci-dessus sont invalides
            </p>
          )}
          <DefaultBtn
            value={"Confirmer la commande"}
            className="w-72 h-12 text-xl font-bold bg-success hover:opacity-90 self-center"
            onClick={handleConfirmOrder}
          />
        </div>
      </div>
      <Cart variant="checkout" />
    </div>
  );
}
