"use client";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import { authFetch } from "@/redux/auth/authActions";
import { useSelector } from "react-redux";

const base64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function useNotifSubscription() {
  const auth = useSelector((state) => state.auth);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!auth?.data?.token) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serwist !== undefined
    ) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            authFetch(
              `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/updateLastActivity`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ endpoint: sub.endpoint }),
              },
              store.getState,
              store.dispatch
            )
              .then((res) => {
                if (res.success) {
                  setSubscription(sub);
                }
              })
              .catch((e) => {
                // Corrected placement of catch
                console.error(e); // It's better to log the actual error
                sub
                  .unsubscribe()
                  .then(function (successful) {
                    if (successful) {
                      subscribe(reg);
                    }
                  })
                  .catch(function (e) {
                    console.error("Unsubscription failed", e); // Provide more context in error logging
                  });
              });
          } else {
            subscribe(reg);
          }
        });
      });
    }
  }, [auth?.data?.token]);

  const subscribe = async (reg) => {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      throw new Error("Environment variables supplied not sufficient.");
    }
    if (!reg) {
      console.error("No SW registration available.");
      return;
    }
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    });

    try {
      await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sub),
        },
        store.getState,
        store.dispatch
      );
      setSubscription(sub);
      alert("Vous êtes maintenant abonnés aux notifications FoodSwip pro");
    } catch (error) {
      console.error(error);
    }
  };

  return subscription; // Since we're not using a button, we don't need to return any JSX.
}
