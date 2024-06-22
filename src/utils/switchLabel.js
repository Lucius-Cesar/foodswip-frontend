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
    case "online":
      paymentMethodlabel = "Paiement en ligne";
      break;
    case "bancontact":
      paymentMethodlabel = "Bancontact";
    default:
      break;
  }

  return paymentMethodlabel;
}

const switchPaymentMethodLabelForTicket = (paymentMethod) => {
  switch (paymentMethod) {
    case "cash":
      return "Commande à payer en cash";
      break;
    case "bancontact":
      return "Commande à payer via bancontact";
      break;
    case "online":
      return "Commande payée en ligne";
    default:
    // code to be executed if paymentMethod is different from 'method1' and 'method2'
  }
};

function switchOrderTypeLabel(orderType) {
  let orderTypeLabel;
  switch (orderType) {
    case 0:
      orderTypeLabel = "Livraison";
      break;
    case 1:
      orderTypeLabel = "À emporter";
      break;
    default:
      break;
  }

  return orderTypeLabel;
}

export {
  switchDayLabel,
  switchPaymentMethodLabel,
  switchOrderTypeLabel,
  switchPaymentMethodLabelForTicket,
};
