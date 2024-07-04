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

  const generateTicketBase64 = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const dataUrl = canvas.toDataURL();
    const regexp = /base64,[A-Za-z0-9+/=]+/;
    const ticketBase64 = dataUrl.match(regexp);
    return ticketBase64;
  };

  useEffect(() => {
    if (!ticketRef.current) return;
    const getTicketSrc = async () => {
      const newTicketSrc = await generateTicketBase64();
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
