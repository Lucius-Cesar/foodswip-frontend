const checkIfInputContainsOnlyNumber = (input) => {
  const numericRegex = /^[0-9]+$/
  return numericRegex.test(input)
}

export const missingInformationValidation = (
  information,
  setValidationErrors,
  field,
  message
) => {
  !information
    ? setValidationErrors((previous) => ({
        ...previous,
        [field]: message,
      }))
    : setValidationErrors((previous) => ({ ...previous, [field]: "" }))
}

export const postCodeValidation = (
  postCode,
  setValidationErrors,
  field,
  deliveryPostCodes,
  orderType,
  restaurantPhoneNumber
) => {
  if (!postCode) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le code postal est obligatoire",
    }))
  } else if (!deliveryPostCodes.includes(postCode) && orderType === 0) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: `La livraison ne couvre pas votre zone actuellement. Vous pouvez opter pour la commande à emporter ou contacter directement l'établissement pour obtenir plus d'informations au ${restaurantPhoneNumber}`,
    }))
  } else {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }))
  }
}

export const mailValidation = (mail, setValidationErrors, field) => {
  if (!mail) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "L'addresse mail est obligatoire",
    }))
  } else {
    const mailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (mailRegex.test(mail) || !mail) {
      setValidationErrors((previous) => ({
        ...previous,
        [field]: "",
      }))
    } else {
      setValidationErrors((previous) => ({
        ...previous,
        [field]: "L'addresse mail entrée n'est pas valide",
      }))
    }
  }
}

export const phoneNumberValidation = (
  phoneNumber,
  setValidationErrors,
  field
) => {
  const phoneNumberRegex = /^(\+?[0-9]{9,14})$/

  phoneNumber = phoneNumber.replace(/\s/g, "")
  if (!phoneNumber) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le numéro de téléphone est obligatoire",
    }))
  } else if (!phoneNumberRegex.test(phoneNumber)) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le numéro de téléphone est invalide",
    }))
  } else {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }))
  }
}

export const modalPeriodValidation = (
  valueModalPeriod,
  setValidationErrors,
  type,
  field,
  variant
) => {
  if (!valueModalPeriod.start || !valueModalPeriod.end) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]:
        "Veuillez entrer à la fois une valeur de début et une valeur de fin",
    }))
  } else if (
    type === "date" &&
    new Date(valueModalPeriod.start) > new Date(valueModalPeriod.end)
  ) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "La valeur de début doit être inférieure à la valeur de fin",
    }))
  } else if (
    variant === "service" &&
    !valueModalPeriod.delivery &&
    !valueModalPeriod.takeaway
  ) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Vous devez au moins cocher une des possibilités de service",
    }))
  } else {
    // Réinitialiser les erreurs si tout est valide
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }))
  }
}

export const currentPasswordValidation = (
  password,
  setValidationErrors,
  field
) => {
  if (!password) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le mot de passe est obligatoire",
    }))
  } else {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }))
  }
}

export const newPasswordValidation = (password, setValidationErrors, field) => {
  if (!password) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le nouveau mot de passe est obligatoire",
    }))
  } else if (password.length < 8) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Le nouveau mot de passe doit contenir au moins 8 caractères",
    }))
  } else {
    // Utilisation de caractères variés
    const regex =
      /^(?=.*[0-9])(?=.*[A-Z!@#$%^&*()_+{}|:"<>?])[0-9A-Za-z!@#$%^&*()_+{}|:;'"<>?]{8,}$/

    if (!regex.test(password)) {
      setValidationErrors((previous) => ({
        ...previous,
        [field]:
          "Le nouveau mot de passe doit contenir au moins un chiffre et une majuscule/caractère spécial",
      }))
    } else {
      // Réinitialiser les erreurs si tout est valide
      setValidationErrors((previous) => ({
        ...previous,
        [field]: "",
      }))
    }
  }
}

export const confirmNewPasswordValidation = (
  passwordForm,
  setValidationErrors,
  field
) => {
  if (!passwordForm.confirmNewPassword) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "La confirmation du nouveau mot de passe est obligatoire",
    }))
  } else if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]:
        "Le nouveau mot de passe et sa confirmation doivent correspondre",
    }))
  } else {
    // Réinitialiser les erreurs si tout est valide
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "",
    }))
  }
}

export const arrivalTimeValidation = (
  timeString,
  defaultOptionArrivalTimeSelect,
  setValidationErrors,
  isCurrentServiceActiveForSelectedOrderType,
  field
) => {
  console.log(timeString)
  //if no arrivalTime selected and we are not in a current service (order in advance)
  if (
    timeString === defaultOptionArrivalTimeSelect ||
    (!timeString && !isCurrentServiceActiveForSelectedOrderType)
  ) {
    setValidationErrors((previous) => ({
      ...previous,
      [field]: "Veuillez choisir une heure",
    }))
  } else {
    setValidationErrors((previous) => ({ ...previous, [field]: "" }))
  }
}
