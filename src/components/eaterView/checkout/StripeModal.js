import DefaultModal from "@/components/ui/DefaultModal"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Router } from "express"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const restaurantPhoneNumber = useSelector(
    (state) => state.restaurantPublic.data.phoneNumber
  )

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // If the payment has been processed successfully, call your API
      fetch(
        `${$process.env.NEXT_PUBLIC_API_URL}/orders/processOrderAfterPayment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Router.push(`/order/${data.order.orderNumber}`)
          } else {
            setMessage(
              `Le paiement a été effectué avec succès mais une erreur est survenue lors de la validation de la commande. Veuillez contacter le restaurant au ${restaurantPhoneNumber}.`
            )
          }
        })
        .catch((error) => {
          setMessage(
            `Le paiement a été effectué avec succès mais une erreur est survenue lors de la validation de la commande. Veuillez contacter le restaurant au ${restaurantPhoneNumber}.`
          )
        })
    } else {
      setMessage("An unexpected error occured.")
    }
    setIsProcessing(false)
  }

  const PaymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement options={PaymentElementOptions} id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-error-danger">
            {message}
          </div>
        )}
      </form>
    </>
  )
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function StripeModal({ open, setOpen, clientSecret }) {
  const [stripePromise, setStripePromise] = useState(null)
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
  useEffect(() => {
    setStripePromise(loadStripe(stripeKey))
  }, [])

  return (
    <>
      <DefaultModal open={open} setOpen={setOpen}>
        {clientSecret && stripePromise && (
          <div>
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: clientSecret }}
            >
              <CheckoutForm />
            </Elements>
          </div>
        )}
      </DefaultModal>
    </>
  )
}
