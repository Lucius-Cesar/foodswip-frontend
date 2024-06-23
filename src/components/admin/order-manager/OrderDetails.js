import {
  switchPaymentMethodLabel,
  switchOrderTypeLabel,
} from "@/utils/switchLabel";
import { useRef, useState } from "react";
import {
  switchPaymentMethodIcon,
  switchOrderTypeIcon,
} from "@/components/ui/icons/SwitchIcon";
import {
  ClockIcon,
  ChevronLeftIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { dateToTimeString } from "@/utils/dateAndTime";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FullWidthBtn from "@/components/ui/FullWidthBtn";
import OrderPrintTicket from "./OrderPrintTicket";
import html2canvas from "html2canvas";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
const OrderDetails = ({ order }) => {
  const pathname = usePathname(); // Destructure pathname from router
  const ticketRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadTicket = async () => {
    setIsDownloading(true); // Commence le chargement
    const currentDate = Date.now();

    if (!ticketRef.current) {
      setIsDownloading(false); // Termine le chargement si ticketRef n'est pas défini
      return;
    }

    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `order_${order.orderNumber}_${currentDate}.jpg`;

    // Écouteur pour détecter quand le téléchargement est terminé

    link.click();
    document.body.removeChild(link);

    // No way to know when the downloading is finished, so we put an arbitrary value of 3s to stop the loading
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-full w-full bg-white overflow-auto">
        <div className="fixed bg-white top-0 w-full h-14 border-b border-gravel drop-shadow flex flex-row justify-between items-center pl-1 pr-3">
          <Link href={pathname}>
            <ChevronLeftIcon className="h-10 w-10 text-primary" />
          </Link>
          <div className="inline-flex items-stretch text-xl font-bold gap-2">
            {switchOrderTypeIcon(order.orderType, "h-5")}{" "}
            {switchOrderTypeLabel(order.orderType)}
          </div>
          {isDownloading ? (
            <LoadingSpinner className="text-primary" />
          ) : (
            <button
              onClick={() => {
                handleDownloadTicket();
              }}
            >
              <PrinterIcon className="h-8 w-8 text-primary" />
            </button>
          )}
        </div>
        <div className="mt-14">
          <div className="flex flex-row text-sm w-full py-3 ">
            <div className="w-9/12 border-e border-gravel px-3">
              <div className="flex flex-col gap-1 justify-between items-start h-full">
                <p className="font-bold">
                  {order.customer.firstname} {order.customer.lastname}
                </p>
                <div className="flex flex-row gap-4">
                  <div className=" inline-flex items-stretch gap-1">
                    <div className="inline-flex items-baseline">
                      {switchOrderTypeIcon(order.orderType, "h-4")}
                    </div>
                    <p className="font-bold">
                      {switchOrderTypeLabel(order.orderType)}
                    </p>
                  </div>
                  <div className="inline-flex items-stretch gap-1">
                    {switchPaymentMethodIcon(order.paymentMethod, "h-4")}
                    <p className="font-bold">
                      {switchPaymentMethodLabel(order.paymentMethod)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <p className="font-bold"> {order.totalSum} €</p>
                  <p className="font-semibold">Commande #{order.orderNumber}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-3/12  p-1">
              <ClockIcon className="h-6 text-primary" />
              <p className="font-bold text-center">
                {dateToTimeString(order.estimatedArrivalDate)}
              </p>
              <p className="text-xs text-center">
                Passée à {dateToTimeString(order.creationDate)}
              </p>
            </div>
          </div>
          <div className="border-t border-b border-gravel px-3 py-2 text-xl font-semibold">
            Liste des articles
          </div>

          <div className="flex flex-col justify-start items-start w-full border-gravel p-3">
            {order.formattedArticlesList.map((element, i) => {
              return (
                <div className=" w-full" key={i}>
                  <p className="text-xl font-extrabold">
                    {element.categoryTitle}
                  </p>
                  <div className="ps-6 w-full py-1">
                    {element.articles.map((article, j) => {
                      return (
                        <div className="py-1" key={j}>
                          <div className="flex flex-row justify-between text-lg font-semibold w-full">
                            {" "}
                            <div className="flex flex-row gap-2">
                              <p className="font-extrabold">
                                {article.quantity}
                              </p>{" "}
                              <p>X</p>
                              <div className="flex flex-col max-w-44">
                                <p>{article.food.value}</p>{" "}
                                {article.options.map((option, k) => {
                                  let formattedOption = option.value;
                                  if (!option.isNeededInOrder) {
                                    formattedOption = "";
                                  } else if (option.isSupplement) {
                                    formattedOption = `+${option.value}`;
                                  }
                                  return (
                                    <p className="text-sm font-normal">
                                      {formattedOption}
                                    </p>
                                  );
                                })}
                              </div>{" "}
                            </div>{" "}
                            <p clasName="text-lg">{article.sum} €</p>
                          </div>{" "}
                        </div>
                      );
                    })}
                  </div>{" "}
                  <div className="self-start font-semibold text-lg w-full"></div>
                </div>
              );
            })}
          </div>
          {order.orderType === 0 ? (
            <div className="flex flex-row justify-between font-semibold text-lg  border-t  border-gravel w-full px-3 py-2">
              <p>Frais de livraison</p> <p>{order.deliveryFees} €</p>
            </div>
          ) : null}

          <div className="flex flex-row justify-between font-semibold text-lg border-b border-t border-gravel w-full px-3 py-2">
            <p>Montant Total</p> <p>{order.totalSum} €</p>
          </div>
          <div className="flex flex-col gap-2 p-3 text-lg font-medium">
            <p>
              Note de commande :{" "}
              <span className="text-error-danger">{order.note}</span>
            </p>
            <p>
              Type de commande :{" "}
              <span className="text-error-danger">
                {switchOrderTypeLabel(order.orderType)}
              </span>
            </p>
            <p>
              Moyen de paiement :{" "}
              <span className="text-error-danger">
                {switchPaymentMethodLabel(order.paymentMethod)}
              </span>
            </p>
            <p>
              Heure confirmée :{" "}
              <span className="text-error-danger">
                {dateToTimeString(order.estimatedArrivalDate)}
              </span>
            </p>
          </div>
          <p className="text-xl font-extrabold px-3 pb-3">
            Coordonnées du client
          </p>
          <table class="min-w-full bg-white border border-gray-200">
            <thead></thead>
            <tbody class="text-normal font-semibold">
              <tr>
                <td class="border bg-gray-100 border-gravel font-normal p-2 text-center">
                  Nom
                </td>
                <td class="border  border-gravel  p-2 text-center">
                  {order.customer.firstname} {order.customer.lastname}
                </td>
              </tr>
              {order.orderType === 0 ? (
                <>
                  <tr>
                    <td class=" border bg-gray-100 border-gravel font-normal  p-2 text-center">
                      Adresse
                    </td>
                    <td class=" border border-gravel p-2 text-center">
                      {order.customer.address.street},{" "}
                      {order.customer.address.streetNumber}
                    </td>
                  </tr>
                  <tr>
                    <td class=" border bg-gray-100 border-gravel font-normal p-2 text-center">
                      Ville
                    </td>
                    <td class="border border-gravel  p-2 text-center">
                      {order.customer.address.postCode}{" "}
                      {order.customer.address.city}
                    </td>
                  </tr>
                </>
              ) : null}
              <tr>
                <td class="border bg-gray-100 border-gravel font-normal p-2 text-center">
                  Téléphone
                </td>
                <td class="border border-gravel text-center">
                  {order.customer.phoneNumber}
                </td>
              </tr>
            </tbody>
          </table>
          <FullWidthBtn
            onClick={() => handleDownloadTicket()}
            className="text-white bg-success"
            isLoading={isDownloading}
          >
            Accepter la commande
          </FullWidthBtn>
        </div>
      </div>
      <OrderPrintTicket order={order} ref={ticketRef} />
    </>
  );
};
export default OrderDetails;
