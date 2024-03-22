"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon.js";
import FormInput from "@/components/ui/FormInput.js";
import DefaultBtn from "@/components/ui/DefaultBtn";
import { mailValidation, passwordValidation } from "@/utils/validations";
import { logIn } from "@/redux/auth/authSlice";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useRefreshAuth from "@/hooks/useRefreshAuth";

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Login() {
  useRefreshAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const formInitialState = {
    mail: "",
    password: "",
    login: "",
  };
  const [form, setForm] = useState(formInitialState);

  const [validationErrors, setValidationErrors] = useState(formInitialState);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.data?.token) {
      setValidationErrors(formInitialState);
      router.push(`/admin/settings`);
    }
    if (auth.error) {
      auth.error.name === "ErrorInvalidCredentials";
      setValidationErrors({
        ...validationErrors,
        login: "Adresse email ou mot de passe incorrecte",
      });
    }
  }, [auth]);

  const onClickConnexionBtn = (form) => {
    setValidationErrors({ ...validationErrors, login: "" });
    dispatch(logIn(form));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-dvh space-y-6 xl:scale-100">
        <div className="mb-12">
          <FoodSwipIcon />
        </div>

        <div className="flex flex-col space-y-8 w-11/12 lg:w-1/2">
          <FormInput
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
            validationFunction={(e) => mailValidation(e, setValidationErrors)}
            validationError={validationErrors.mail}
          />

          <FormInput
            label="Mot de passe"
            labelSize="2xl"
            textSize="lg"
            type="password"
            onChange={(input) =>
              setForm({
                ...form,
                password: input,
              })
            }
            validationFunction={(e) =>
              passwordValidation(e, setValidationErrors)
            }
            validationError={validationErrors.password}
          ></FormInput>
        </div>
        {auth.isLoading ? (
          <LoadingSpinner />
        ) : (
          <DefaultBtn
            value="Connexion"
            className="w-36 h-10 text-2xl bg-primary hover:opacity-90  focus:text-white text-white self-center"
            onClick={() => onClickConnexionBtn(form)}
          />
        )}
        {validationErrors.login && (
          <p className="text-error-danger font-bold">
            {validationErrors.login}
          </p>
        )}
        <div classname="flex flex-col items-center">
          <p> Vous souhaitez devenir client ?</p>
          <Link href="https://erp.foodswip.com/forms/wtl/d5666534a70376742b81a46cfa37bcd0?styled=1">
            <p className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-center">
              Contactez-nous
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
