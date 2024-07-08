"use client";
import { useRef, useEffect, useState } from "react";
import {
  switchOrderTypeLabel,
  switchPaymentMethodLabelForTicket,
} from "@/utils/switchLabel";
import { useSelector } from "react-redux";
import {
  dateToCompleteDateString,
  dateToTimeString,
} from "@/utils/dateAndTime";
import { switchOrderTypeIcon } from "@/components/ui/icons/SwitchIcon";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import FoodswipLogo from "@/components/ui/icons/FoodswipLogo";
//this component is used to print the ticket of an order
//component is converted to a jpg image and then downloaded
// if the image is downloaded in the folder configured for autoprint (rawbt) -> printed
const OrderPrintTicket = ({
  order,
  loading,
  setLoading,
  printTrigger,
  setPrintTrigger,
}) => {
  const ticketRef = useRef(null);
  const printLinkRef = useRef(null);
  const restaurant = useSelector((state) => state.restaurantAdmin);
  const [printUrl, setPrintUrl] = useState(null);
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[:\-]|\.\d{3}/g, "")
    .slice(0, 15); // Format: "YYYYMMDDTHHMMSS"
  const filename = `order_${order.orderNumber}_${formattedDate}.jpg`;
  const generateTicketJpgBase64 = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const ticketJpgBase64 = canvas.toDataURL("image/jpeg");
    const base64Response = await fetch(ticketJpgBase64);
    const blob = await base64Response.blob();
    // Create Blob URL
    const blobUrl = URL.createObjectURL(blob);
    setPrintUrl(blobUrl);
    setLoading(false);
    return ticketJpgBase64;
  };

  useEffect(() => {
    if (!printUrl) generateTicketJpgBase64();
    if (printTrigger) {
      setLoading(true);
      if (printUrl) {
        printLinkRef.current.click();
        setPrintTrigger(false);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
  }, [printTrigger, printUrl]);

  return (
    <>
      <a
        ref={printLinkRef}
        href={printUrl}
        download={filename}
        className="absolute left-[-9999px]"
      ></a>
      <div
        ref={ticketRef}
        className="flex flex-col items-center justify-start bg-white space-y-8 text-black w-full max-w-96 absolute left-[-9999px] pb-14"
      >
        {/*absolute -9999px to hide the component*/}

        <div className="flex flex-col  items-center justify-center w-full">
          <FoodswipLogo color="#000000" className="w-64" />
          <p className="text-lg text-center text-black self-center">
            {restaurant?.data?.name} - {restaurant?.data?.address?.street}{" "}
            {restaurant?.data?.address?.postCode}{" "}
            {restaurant?.data?.address?.city}
          </p>
          <p className="text-lg font-bold self-center">
            {" "}
            Commande #{order.orderNumber}
          </p>
          <p className="text-lg self-center">
            {dateToCompleteDateString(order.creationDate)}
          </p>
          <div className="flex flex-col justify-center items-center w-full ">
            <div className="flex flex-row  justify-center items-center self-center gap-2">
              <div className="mt-8">
                {switchOrderTypeIcon(order.orderType, "h-10")}
              </div>
              <p className="text-4xl font-bold self-center">
                {switchOrderTypeLabel(order.orderType)}
              </p>
            </div>
          </div>
          <p className="text-4xl font-bold self-center pb-1">
            {dateToTimeString(order.estimatedArrivalDate)}
          </p>
        </div>
        <div className="w-full">
          <div className="font-semibold text-2xl border-t border-b border-black w-full pb-6">
            Liste des articles
          </div>
          <div className="flex flex-col justify-start items-start w-full border-black">
            {order.formattedArticlesList.map((element, i) => {
              return (
                <div className=" w-full" key={i}>
                  <p className="text-2xl font-extrabold">
                    {element.categoryTitle}
                  </p>
                  <div className="ps-6 py-2 w-full">
                    {element.articles.map((article, j) => {
                      return (
                        <div className="py-2" key={j}>
                          <div className="flex flex-row justify-between text-2xl font-semibold w-full">
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
                                    <p key={k} className="font-medium">
                                      {formattedOption}
                                    </p>
                                  );
                                })}
                              </div>{" "}
                            </div>{" "}
                            <p>{article.sum} €</p>
                          </div>{" "}
                        </div>
                      );
                    })}
                  </div>
                  <div className="self-start font-semibold text-2xl pb-2 w-full"></div>
                </div>
              );
            })}
          </div>
          <div className="w-full">
            {order.orderType === 0 ? (
              <div className="flex flex-row justify-between font-semibold text-2xl  border-t  border-black pb-6 w-full">
                <p>Frais de livraison</p> <p>{order.deliveryFees} €</p>
              </div>
            ) : null}

            <div className="flex flex-row justify-between font-semibold text-2xl border-b border-t border-black w-full pb-6">
              <p>Montant Total</p> <p>{order.totalSum} €</p>
            </div>
          </div>
        </div>
        {order.note && (
          <p className="text-2xl self-start">
            Note: <span className="font-extrabold">{order.note}</span>{" "}
          </p>
        )}
        <div className="text-4xl font-extrabold text-center">
          {switchPaymentMethodLabelForTicket(order.paymentMethod)}
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead></thead>
          <tbody className="text-2xl font-semibold">
            <tr>
              <td className="py-2  border border-black font-normal pb-8 text-center ">
                Nom
              </td>
              <td className="py-2 border border-black  pb-8 text-center ">
                {order.customer.firstname} {order.customer.lastname}
              </td>
            </tr>
            {order.orderType === 0 ? (
              <>
                <tr>
                  <td className="py-2 border border-black font-normal  pb-8 text-center ">
                    Adresse
                  </td>
                  <td className="py-2 border border-black pb-8 text-center ">
                    {order.customer.address.street},{" "}
                    {order.customer.address.streetNumber}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 border border-black font-normal pb-8 text-center ">
                    Ville
                  </td>
                  <td className="py-2 border border-black pb-8 text-center ">
                    {order.customer.address.postCode}{" "}
                    {order.customer.address.city}
                  </td>
                </tr>
              </>
            ) : null}

            <tr>
              <td className="py-2 border border-black font-normal text-center pb-8">
                Téléphone
              </td>
              <td className="py-2 border border-black text-center ">
                {order.customer.phoneNumber}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderPrintTicket;
