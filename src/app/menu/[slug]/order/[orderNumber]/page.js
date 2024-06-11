"use client"
import { useRestaurantData } from "@/hooks/useRestaurantData"
import { RestaurantLogo } from "@/components/ui/RestaurantLogo"
import SuccessIcon from "@/components/ui/icons/SuccessIcon"
import FoodSwipIcon from "@/components/ui/icons/FoodSwipIcon"
import Preloader from "@/components/ui/Preloader"
import useFetch from "@/hooks/useFetch"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Order({ params }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectStatus = searchParams.get("redirect_status")

  const [formattedEstimatedArrivalDate, setFormattedEstimatedArrivalDate] =
    useState(null)

  const fetchOptions = { method: "GET" }
  const order = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderNumber}`,
    fetchOptions
  )

  useEffect(() => {
    if (order.data?.estimatedArrivalDate) {
      const estimatedArrivalDate = new Date(order.data.estimatedArrivalDate)
      setFormattedEstimatedArrivalDate(
        `${estimatedArrivalDate.getHours()}:${String(
          estimatedArrivalDate.getMinutes()
        ).padStart(2, "0")}`
      )
    }
  }, [order.data])

  //error redirection
  useEffect(() => {
    if (redirectStatus === "failed") {
      setTimeout(() => {
        router.push(`/menu/${params.slug}/checkout`)
      }, 8000)
    }
  }, [redirectStatus])

  if (order.isLoading) {
    return <Preloader />
  } else if (redirectStatus === "failed") {
    return (
      <div className="w-full h-dvh flex flex-col justify-center items-center">
        <p className="text-lg text-center text-error-danger">
          Le paiement a échoué, vous pourrez réessayer dans quelques secondes
          après redirection...
        </p>
      </div>
    )
  } else {
    return (
      <div className="w-full h-dvh flex flex-col justify-between items-center">
        <div className="me-4 mt-2 mb-4 sm:me-6 sm:my-6">
          <RestaurantLogo className="h-24 w-72" from="restaurantPublic" />
        </div>

        {order.data && (
          <div className="flex flex-col justify-center items-center">
            <SuccessIcon className="h-24 w-24 mb-6" />

            <p className="font-bold text-2xl text-center">
              Merci pour votre commande #{order.data.orderNumber}
            </p>
            <p className="text-lg text-center">
              Votre commande a bien été validée.
            </p>
            {order.data.orderType === 0 && (
              <p className="text-center text-lg">
                Elle vous sera livrée aux alentours de<br></br>
                <span className="font-bold text-3xl">
                  {formattedEstimatedArrivalDate}
                </span>
              </p>
            )}
            {order.data.orderType === 1 && (
              <p className="text-center text-lg">
                Vous pouvez venir la chercher au restaurant aux alentours de
                <br></br>
                <span className="font-bold text-3xl text-center">
                  {formattedEstimatedArrivalDate}
                </span>
              </p>
            )}
            <p className="text-center">
              <br></br>
              Un mail de confirmation de votre commande vous sera envoyé,{" "}
              <br></br>
              <span className="font-bold text-error-danger">
                pensez à vérifier vos spams
              </span>
            </p>
          </div>
        )}
        {order.error?.status === 403 && (
          <p className="text-error-danger text-center text-xl">
            Vous n'êtes pas autorisé à consulter cette commande
          </p>
        )}
        <FoodSwipIcon className="h-12 sm:h-10 w-auto" />
      </div>
    )
  }
}
