import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

// Custom Hook : useRedirectIfCartEmpty redirect the user to the restaurant menu page if the cart is empty
function useRedirectIfCartEmpty() {
  const router = useRouter();
  const currentPath = usePathname();

  const cart = useSelector((state) => state.cart);
  const parentPath = currentPath.split("/").slice(0, -1).join("/");

  useEffect(() => {
    cart.data.numberOfArticles === 0 && router.push(parentPath);
    //Au moi du futur : replace "/" by the url of the restaurant menu
  }, [cart.data.numberOfArticles]);
}

export default useRedirectIfCartEmpty;
