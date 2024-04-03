import {
  currentPasswordValidation,
  newPasswordValidation,
  confirmNewPasswordValidation,
} from "@/utils/validations";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import DefaultBtn from "@/components/ui/DefaultBtn";
import useAuthFetch from "@/hooks/useAuthFetch";

export default function PasswordUpdate() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const passwordUpdate = useAuthFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/updatePassword/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordForm),
    },
    fetchTrigger,
    setFetchTrigger
  );
  console.log(passwordUpdate);
  const [validationErrors, setValidationErrors] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onClickPasswordUpdate = () => {
    if (Object.values(validationErrors).every((value) => value === "")) {
      setFetchTrigger(true);
    }
  };

  return (
    <div classname="space-y-4">
      <h2 className="mb-4">Modifier le mot de passe</h2>
      <div className="w-full sm:w-5/12 space-y-4 flex flex-col">
        <FormInput
          label="Mot de passe actuel"
          labelSize="xl"
          textSize="lg"
          type="password"
          onChange={(input) =>
            setPasswordForm({ ...passwordForm, currentPassword: input })
          }
          validationFunction={(e) =>
            currentPasswordValidation(e, setValidationErrors)
          }
          validationError={validationErrors.password}
        ></FormInput>
        <FormInput
          label="Nouveau mot de passe"
          labelSize="xl"
          textSize="lg"
          type="password"
          onChange={(input) =>
            setPasswordForm({ ...passwordForm, newPassword: input })
          }
          validationFunction={(e) =>
            newPasswordValidation(e, setValidationErrors)
          }
          validationError={validationErrors.newPassword}
        ></FormInput>
        <FormInput
          label="Confirmer le nouveau mot de passe"
          labelSize="xl"
          textSize="lg"
          type="password"
          onChange={(input) =>
            setPasswordForm({ ...passwordForm, confirmNewPassword: input })
          }
          validationFunction={() =>
            confirmNewPasswordValidation(passwordForm, setValidationErrors)
          }
          validationError={validationErrors.confirmNewPassword}
        ></FormInput>
        <DefaultBtn
          value="Modifier le mot de passe"
          className="text-xl  self-center font-bold bg-primary hover:opacity-90  focus:text-white text-white"
          onClick={() => onClickPasswordUpdate()}
        />
        {passwordUpdate?.data?.success ? (
          <p className="text-success text-center font-bold">
            Le mot de passe a été modifié avec succès
          </p>
        ) : (
          passwordUpdate?.error && (
            <p className="text-error-danger text-center font-bold">
              {" "}
              {passwordUpdate.error.status === 401
                ? "Le mot de passe actuel est invalide"
                : "Une erreur est survenue lors de la modification du mot de passe"}
            </p>
          )
        )}
      </div>
    </div>
  );
}
