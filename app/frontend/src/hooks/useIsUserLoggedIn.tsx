import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";

function useIsUserLoggedIn() {
  const navigate = useNavigate();

  const token = useMemo(() => getLocalStorage("token") || null, []);  
  
  useEffect(() => {
    const verifyUser = async () => {
      console.log(token)
      if (token !== null) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
    verifyUser();
  }, [token, navigate]);
}

export default useIsUserLoggedIn;
