const checkIfInputContainsOnlyNumber = (input) => {
  const numericRegex = /^[0-9]+$/;
  return numericRegex.test(input);
};

export const adressValidation = (adress, setValidationErrors) => {
  !adress
    ? setValidationErrors((previous) => ({
        ...previous,
        adress: "L'adresse est obligatoire",
      }))
    : setValidationErrors((previous) => ({ ...previous, adress: "" }));
};

export const postCodeValidation = (postCode, setValidationErrors) => {
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

export const cityValidation = (city, setValidationErrors) => {
  !city
    ? setValidationErrors((previous) => ({
        ...previous,
        city: "La ville est obligatoire",
      }))
    : setValidationErrors((previous) => ({ ...previous, city: "" }));
};

export const firstnameValidation = (firstname, setValidationErrors) => {
  !firstname
    ? setValidationErrors((previous) => ({
        ...previous,
        firstname: "Le prénom est obligatoire",
      }))
    : setValidationErrors((previous) => ({ ...previous, firstname: "" }));
};

export const lastnameValidation = (lastname, setValidationErrors) => {
  !lastname
    ? setValidationErrors((previous) => ({
        ...previous,
        lastname: "Le nom est obligatoire",
      }))
    : setValidationErrors((previous) => ({ ...previous, lastname: "" }));
};

export const mailValidation = (mail, setValidationErrors) => {
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

export const phoneNumberValidation = (phoneNumber, setValidationErrors) => {
  const phoneNumberRegex = /^\+?[0-9]{10,}$/;

  if (!phoneNumber) {
    setValidationErrors((previous) => ({
      ...previous,
      phoneNumber: "Le numéro de téléphone est obligatoire",
    }));
  } else if (!phoneNumberRegex.test(phoneNumber)) {
    setValidationErrors((previous) => ({
      ...previous,
      phoneNumber: "Le numéro de téléphone est invalide",
    }));
  } else {
    setValidationErrors((previous) => ({
      ...previous,
      phoneNumber: "",
    }));
  }
};

export const passwordValidation = (password, setValidationErrors) => {
  if (!password) {
    setValidationErrors((previous) => ({
      ...previous,
      password: "Le mot de passe est obligatoire",
    }));
  }
};

export const modalPeriodValidation = (
  valueModalPeriod,
  setValidationErrors,
  type
) => {
  if (!valueModalPeriod.start || !valueModalPeriod.end) {
    setValidationErrors((previous) => ({
      ...previous,
      period:
        "Veuillez entrer à la fois une valeur de début et une valeur de fin.",
    }));
  } else if (
    (type === "time" &&
      parseInt(valueModalPeriod.start.replace(":", "")) >=
        parseInt(valueModalPeriod.end.replace(":", ""))) ||
    (type === "datetime-local" &&
      new Date(valueModalPeriod.start) > new Date(valueModalPeriod.end))
  ) {
    setValidationErrors((previous) => ({
      ...previous,
      period: "La valeur de début doit être inférieure à la valeur de fin.",
    }));
  } else {
    // Réinitialiser les erreurs si tout est valide
    setValidationErrors((previous) => ({
      ...previous,
      period: "",
    }));
  }
};
