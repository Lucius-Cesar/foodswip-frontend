import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearRestaurantAdminData } from "@/redux/restaurantAdmin/restaurantAdminSlice";
import Cookies from "js-cookie";
function useCheckAuth(loginPage = false) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // if there is an error inside the auth state => redirect user to login page
  useEffect(() => {
    //check if there is an auth Error or if there is a cookie named token
    const tokenCookie = Cookies.get("token");
    if (auth.error || !tokenCookie) {
      if (!loginPage) {
        router.push("/admin/login");
        //clear restaurant admin data in localstorage if not auth and if we are located in loginPage
      } else if (loginPage) {
        dispatch(clearRestaurantAdminData());
      }
      //if already authenticated redirect to /admin/settings
    } else if (loginPage) {
      router.push("/admin/settings");
    }
  }, [auth]);
}

export default useCheckAuth;
