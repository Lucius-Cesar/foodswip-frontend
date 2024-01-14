import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

// Custom Hook : useRedirectIfCartEmpty redirect the user to the restaurant menu page if the cart is empty
function useRedirectIfCartEmpty() {
  const router = useRouter();

  const cart = useSelector((state) => state.cart);
  const restaurant = useSelector((state) => state.restaurant);
  useEffect(() => {
    cart.value.numberOfArticles === 0 &&
      router.push(`/restaurant/${restaurant.uniqueValue}`);
    //Au moi du futur : replace "/" by the url of the restaurant menu
  }, [cart.value.numberOfArticles]);
}

export default useRedirectIfCartEmpty;
