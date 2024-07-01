import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, logOut } from "@/redux/auth/authSlice";

function useRefreshAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //check if user have an access token , if not => try to refresh the access token
    if (!auth.data?.token) {
      dispatch(getAuth());
    }
    setLoading(false);
  }, []);

  //states are handled by redux so just return loading
  return { loading };
}
export default useRefreshAuth;
