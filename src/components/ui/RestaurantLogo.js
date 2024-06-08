import { useSelector } from "react-redux"

export function RestaurantLogo({ className, from }) {
  const slug = useSelector((state) => {
    if (from === "restaurantPublic") {
      return state.restaurantPublic.data.slug
    } else if (from === "restaurantAdmin") {
      return state.restaurantAdmin.data.slug
    } else {
      return null // Handle other cases if necessary
    }
  })
  return (
    <img
      className="max-h-24 max-w-48 sm:max-w-96 sm:max-h-40"
      src={`/images/${slug}/logo.png`}
      alt="Restaurant Logo"
    />
  )
}

export function RestaurantLogoCircle({ className }) {
  const slug = useSelector((state) => {
    return state.restaurantPublic.data.slug
  })
  return (
    <div className={`${className} rounded-full h-20 w-20 overflow-hidden`}>
      <img
        className="object-contain w-full h-full"
        src={`/images/${slug}/icon.png`}
        alt="Restaurant Logo"
      />
    </div>
  )
}
