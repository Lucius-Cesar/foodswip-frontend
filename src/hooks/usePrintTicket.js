import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

// the usePrintTicket hook generate a ticketSrc from the ticketRef (linked to OrderTicket Component)
// the aim is to inject jpg base 64 in an href beginning with rawbt:
// <a href={`rawbt:base64,${ticketSrc}`} is inside OrderDetails component to allow interactity with button
const usePrintTicket = () => {
  //
  const isAndroidDevice = true;
  const [loading, setLoading] = useState(isAndroidDevice ? true : false);

  const ticketRef = useRef(null);
  const [ticketSrc, setTicketSrc] = useState(null);

  const generateTicketImg = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const urlBase64 = canvas.toDataURL("image/jpeg", 0);
    return urlBase64;
  };

  useEffect(() => {
    if (!ticketRef.current) return;
    const getTicketSrc = async () => {
      const newTicketSrc = await generateTicketImg();
      setTicketSrc(newTicketSrc);
    };

    // only generate ticketSrc on android device, rawbt does not work with IOS
    if (isAndroidDevice) {
      setLoading(true);
      getTicketSrc();
      setLoading(false);
    }
  }, [ticketRef.current]);

  return { ticketRef, ticketSrc, isAndroidDevice, loading, setLoading };
};

export default usePrintTicket;
