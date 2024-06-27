import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
function useCheckAuth(loginPage = false) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  // if there is an error inside the auth state => redirect user to login page
  useEffect(() => {
    //check if there is an authError
    if (auth.error) {
      if (!loginPage) {
        router.push("/pro/login");
        //clear restaurant admin data in localstorage if not auth and if we are located in loginPage
      }
      //if already authenticated redirect to /admin/settings
    }
  }, [auth]);
}

export default useCheckAuth;
