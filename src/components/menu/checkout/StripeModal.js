import DefaultModal from "@/components/ui/DefaultModal"
import FullWidthBtn from "@/components/ui/FullWidthBtn"
import { RestaurantLogoCircle, XmarkIcon } from "@/components/ui/RestaurantLogo"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "@/redux/cart/cartSlice"
import { LockClosedIcon } from "@heroicons/react/20/solid"

export function CheckoutForm({ params, orderId, orderNumber, totalSum }) {
  const stripe = useStripe()
  const elements = useElements()
  const Router = useRouter()
  const dispatch = useDispatch()

  const slug = useSelector((state) => state.restaurantPublic.data.slug)

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(null)
  const [isStripeModalReady, setIsStripeModalReady] = useState(false)
  const [order, setOrder] = useState(null)
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
      redirect: "if_required",
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/menu/${slug}/order/${orderNumber}`,
      },
    })

    if (error?.type === "card_error") {
      setMessage(error.message)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true)
      setTimeout(() => {
        dispatch(clearCart())
      }, "3000")
    } else {
      setMessage("Une erreur inattendue s'est produite.")
    }
    setIsProcessing(false)
  }

  const PaymentElementOptions = {
    layout: {
      type: "tabs",
      defaultCollapsed: false,
    },
    paymentMethodOrder: ["bancontact", "card"],
  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          options={PaymentElementOptions}
          id="payment-element"
          onReady={() => setIsStripeModalReady(true)}
        />

        {/* Show any error or success messages */}
        {message && (
          <p
            id="payment-message"
            className="text-error-danger  text-center pt-2"
          >
            {message}
          </p>
        )}
        {isStripeModalReady && (
          <FullWidthBtn
            isLoading={isProcessing}
            success={paymentSuccess}
            className="rounded-b-xl right-0
          
          

"
          >
            <div className="flex flex-row gap-2">
              <LockClosedIcon className={"text-white h-5 w-5"} />
              <p className="self-end">Valider et payer {totalSum}€</p>
            </div>
          </FullWidthBtn>
        )}
      </form>
    </>
  )
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function StripeModal({
  open,
  setOpen,
  clientSecret,
  orderId,
  orderNumber,
  stripePromise,
  totalSum,
}) {
  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        xButton={true}
        closeOnOverlayClick={false}
      >
        <RestaurantLogoCircle className="z-50 absolute -top-8 p-2 bg-rose-50" />

        <div className="pt-4">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
            }}
          >
            <CheckoutForm
              orderId={orderId}
              orderNumber={orderNumber}
              totalSum={totalSum}
            />
          </Elements>
        </div>
      </DefaultModal>
    </>
  )
}
