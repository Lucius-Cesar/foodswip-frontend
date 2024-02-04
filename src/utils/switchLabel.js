function switchDayLabel(dayNumber) {
  let dayLabel;

  switch (dayNumber) {
    case 0:
      dayLabel = "Lundi";
      break;
    case 1:
      dayLabel = "Mardi";
      break;
    case 2:
      dayLabel = "Mercredi";
      break;
    case 3:
      dayLabel = "Jeudi";
      break;
    case 4:
      dayLabel = "Vendredi";
      break;
    case 5:
      dayLabel = "Samedi";
      break;
    case 6:
      dayLabel = "Dimanche";
      break;
  }

  return dayLabel;
}

function switchPaymentMethodLabel(paymentMethodValue) {
  let paymentMethodlabel;
  switch (paymentMethodValue) {
    case "cash":
      paymentMethodlabel = "Espèces";
      break;
    case "bancontact":
      paymentMethodlabel = "Bancontact";
      break;
    default:
      console.log("Inconnue (présente dans la db mais pas de switch value)");
      break;
  }

  return paymentMethodlabel;
}

export { switchDayLabel, switchPaymentMethodLabel };
