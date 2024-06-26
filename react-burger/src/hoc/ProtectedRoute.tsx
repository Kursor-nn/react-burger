import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_PATH, MAIN_PATH } from "../components/utils/constants";
import { useSelector } from "react-redux";
import { getAccessToken } from "../components/utils/cookies";

export const ProtectedRoute = ({ onlyUnAuth = false, children }: any) => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user.user);
  const accessToken = getAccessToken()

  if (onlyUnAuth && (user || accessToken)) {
    const { from } = location.state || { from: { pathname: MAIN_PATH } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user && !accessToken) {
    return <Navigate to={{ pathname: LOGIN_PATH }} state={{ from: location }} />;
  }

  return children;
};
