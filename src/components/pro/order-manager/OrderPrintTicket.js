"use client";
import { useRef, useEffect, useState, forwardRef } from "react";
import {
  switchOrderTypeLabel,
  switchPaymentMethodLabelForTicket,
} from "@/utils/switchLabel";
import {
  dateToCompleteDateString,
  dateToTimeString,
} from "@/utils/dateAndTime";
import { switchOrderTypeIcon } from "@/components/ui/icons/SwitchIcon";

//this component is used to print the ticket of an order
//component is converted to a jpg image and then downloaded
// if the image is downloaded in the folder configured for autoprint (rawbt) -> printed
const OrderPrintTicket = ({ order }, ref) => {
  const restaurant = {
    name: "Dodopizza",
    address: {
      street: "Avenue des dodos 7130 Binche",
      postCode: 7134,
      city: "Binche",
    },
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-start bg-white space-y-8 text-black w-full absolute left-[-9999px]"
    >
      {/*absolute -9999px to hide the component*/}

      <div className="flex flex-col  items-start w-full">
        <img className="self-center" src="/images/foodswip-logo-print.png" />
        <p className="text-lg text-black self-center">
          {restaurant.name} - {restaurant.address.street}{" "}
          {restaurant.address.postCode} {restaurant.address.city}
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
                            <p className="font-extrabold">{article.quantity}</p>{" "}
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
                                  <p className="font-normal">
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
      <table class="min-w-full bg-white border border-gray-200">
        <thead></thead>
        <tbody class="text-2xl font-semibold">
          <tr>
            <td class="py-2  border border-black font-normal pb-8 text-center ">
              Nom
            </td>
            <td class="py-2 border border-black  pb-8 text-center ">
              {order.customer.firstname} {order.customer.lastname}
            </td>
          </tr>
          {order.orderType === 0 ? (
            <>
              <tr>
                <td class="py-2 border border-black font-normal  pb-8 text-center ">
                  Adresse
                </td>
                <td class="py-2 border border-black pb-8 text-center ">
                  {order.customer.address.street},{" "}
                  {order.customer.address.streetNumber}
                </td>
              </tr>
              <tr>
                <td class="py-2 border border-black font-normal pb-8 text-center ">
                  Ville
                </td>
                <td class="py-2 border border-black pb-8 text-center ">
                  {order.customer.address.postCode}{" "}
                  {order.customer.address.city}
                </td>
              </tr>
            </>
          ) : null}

          <tr>
            <td class="py-2 border border-black font-normal text-center pb-8">
              Téléphone
            </td>
            <td class="py-2 border border-black text-center ">
              {order.customer.phoneNumber}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default forwardRef(OrderPrintTicket);
