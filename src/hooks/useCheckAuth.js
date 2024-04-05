import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
function useCheckAuth(loginPage = false) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // if there is an error inside the auth state => redirect user to login page
  useEffect(() => {
    const tokenCookie = Cookies.get("token");

    //check if there is an authError
    if (auth.error) {
      if (!loginPage) {
        router.push("/admin/login");
        //clear restaurant admin data in localstorage if not auth and if we are located in loginPage
      }
      //if already authenticated redirect to /admin/settings
    } else if (loginPage && tokenCookie) {
      router.push("/admin/settings");
    }
  }, [auth]);
}

export default useCheckAuth;
