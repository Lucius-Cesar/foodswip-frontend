import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/auth/authSlice";
function useCheckAuth(loginPage = false) {
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // if there is an error inside the auth state => redirect user to login page
  useEffect(() => {
    if (auth.error) {
      if ([401, 403].includes(auth.error.status)) {
        if (!loginPage) {
          dispatch(logOut());

          router.push("/admin/login");
        }
      }
      if (!loginPage) {
        router.push("/admin/login");
      }
    }
  }, [auth.error]);
}
export default useCheckAuth;
