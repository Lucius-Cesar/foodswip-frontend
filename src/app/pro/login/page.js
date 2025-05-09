"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import FormInputLogin from "@/components/pro/login/FormInputLogin.js";
import DefaultBtn from "@/components/ui/DefaultBtn";
import {
  mailValidation,
  missingInformationValidation,
} from "@/utils/validations";
import { logIn } from "@/redux/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useCheckAuth from "@/hooks/useCheckAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useRestaurantData from "@/hooks/useRestaurantData";

import Cookies from "js-cookie";
import useRefreshAuth from "@/hooks/useRefreshAuth";
import FoodswipProLogo from "@/components/pro/login/FoodswipProLogo";
import Preloader from "@/components/ui/Preloader";

export default function Login() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const { loading: refreshAuthLoading } = useRefreshAuth();
  useRestaurantData(auth.data?.user?.slug, "restaurantAdmin");
  const dispatch = useDispatch();
  const formInitialState = {
    mail: "",
    password: "",
    login: "",
  };
  const [form, setForm] = useState(formInitialState);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(formInitialState);
  const restaurant = useSelector((state) => state.restaurantAdmin);
  useEffect(() => {
    if (auth.data?.token) {
      setValidationErrors(formInitialState);
      router.push(`/pro/order-manager`);
    }
    if (auth.error) {
      setLoading(false);
      if (auth.error.name === "ErrorInvalidCredentials") {
        setValidationErrors({
          ...validationErrors,
          login: "Adresse email ou mot de passe incorrect",
        });
      }
    }
  }, [auth, restaurant]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access form fields directly
    const mail = e.target.elements.mail.value;
    const password = e.target.elements.password.value;
    // Assume validation functions return boolean for simplicity
    mailValidation(mail, setValidationErrors); // Adjust mailValidation to return boolean
    if (
      validationErrors.password === "" &&
      mailValidation &&
      mail !== "" &&
      password !== ""
    ) {
      setLoading(true);
      setValidationErrors({ ...validationErrors, login: "" });
      dispatch(logIn({ mail, password }));
    }
  };
  if (refreshAuthLoading || auth?.data?.token) {
    return (
      <>
        <Preloader />
      </>
    );
  } else
    return (
      <div className="bg-primary h-screen">
        <div className="flex flex-col justify-start items-center bg-primary">
          <div className="mb-6 mt-12">
            <FoodswipProLogo />
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col justify-center items-center space-y-8 w-10/12 max-w-96 h-full"
          >
            <FormInputLogin
              label="Email"
              labelSize="2xl"
              textSize="lg"
              placeholder="you@example.com"
              id="mail"
              type="email"
              onChange={(input) =>
                setForm({
                  ...form,
                  mail: input,
                })
              }
              validationFunction={(e) =>
                mailValidation(e, setValidationErrors, "mail")
              }
              validationError={validationErrors.mail}
            />
            <FormInputLogin
              label="Mot de passe"
              labelSize="2xl"
              textSize="lg"
              id="password"
              type="password"
              onChange={(input) =>
                setForm({
                  ...form,
                  password: input,
                })
              }
              validationFunction={(e) =>
                missingInformationValidation(
                  e,
                  setValidationErrors,
                  "password",
                  "Le mot de passe est obligatoire"
                )
              }
              validationError={validationErrors.password}
            />
            <DefaultBtn
              value="Connexion"
              className="!text-primary  w-36 h-10 text-xl hover:opacity-90 self-center bg-white rounded-xl mb-8"
              isLoading={loading}
              color="white"
              type="submit"
            />
          </form>
          {validationErrors.login && (
            <p className="text-gray-900 font-bold">{validationErrors.login}</p>
          )}
          <div className="text-white flex flex-col items-center">
            <p className="font-semi-bold">
              Vous souhaitez devenir partenaire ?
            </p>
            <Link href="https://erp.webwalkers.io/forms/wtl/d5666534a70376742b81a46cfa37bcd0?styled=1">
              <p className="font-extrabold underline text-white hover:text-white-800 visited:text-purple-600 text-center">
                Contactez-nous
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
}
