import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PATH, MAIN_PATH } from "../components/utils/constants";
import { useSelector } from "react-redux";
import { getAccessToken } from "../components/utils/cookies";
//import { useTypedSelector } from "../hooks/useTypedSelector";

export const ProtectedRoute = ({ onlyUnAuth = false, children }: any) => {
  const user = useSelector((state: any) => state.user.user);
  const accessToken = getAccessToken()

  const location = useLocation();

  if (onlyUnAuth && (user || accessToken)) {
    const { from } = location.state || { from: { pathname: MAIN_PATH } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user && !accessToken) {
    return <Navigate to={{ pathname: LOGIN_PATH }} state={{ from: location }} />;
  }

  return children;
};
