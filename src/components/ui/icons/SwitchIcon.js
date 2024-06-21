import {
  BanknotesIcon,
  CreditCardIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import DeliveryIcon from "./DeliveryIcon";

function switchPaymentMethodIcon(paymentMethodValue, className = "") {
  let paymentMethodIcon;
  switch (paymentMethodValue) {
    case "cash":
      paymentMethodIcon = <BanknotesIcon className={className} />;
      break;
    case "online":
      paymentMethodIcon = <CreditCardIcon className={className} />;
      break;
    case "bancontact":
      paymentMethodIcon = <CreditCardIcon className={className} />;
    default:
      break;
  }

  return paymentMethodIcon;
}

function switchOrderTypeIcon(orderType, className = "") {
  let orderTypeIcon;
  switch (orderType) {
    case 0:
      orderTypeIcon = <DeliveryIcon className={className} />;
      break;
    case 1:
      orderTypeIcon = <ShoppingBagIcon className={className} />;
      break;
    default:
      break;
  }

  return orderTypeIcon;
}

export { switchPaymentMethodIcon, switchOrderTypeIcon };
