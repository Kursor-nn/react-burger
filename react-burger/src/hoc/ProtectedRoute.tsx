import {Navigate, useLocation} from "react-router-dom";
import {LOGIN_PATH, MAIN_PATH} from "../components/utils/constants";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../services/init";

export const ProtectedRoute = ({commonAccess = false, onlyUnAuth = false, children}: any) => {
    const location = useLocation();
    const user = useTypedSelector((state: RootState) => state.user.user);

    if (onlyUnAuth && user) {
        const {from} = location.state || {from: {pathname: MAIN_PATH}};
        return <Navigate to={from}/>;
    }

    if ((!onlyUnAuth && !user && !commonAccess)) {
        return <Navigate to={{pathname: LOGIN_PATH}} state={{from: location}}/>;
    }

    return children;
};
