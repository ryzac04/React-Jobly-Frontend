import { useContext } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../auth/UserContext";

/** PrivateRoutes Component
 * 
 * "Higher-Order Component" for private routes. 
 * 
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the 
 * route if so. If no user is present, redirects to login form. 
 */

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext);

    console.debug(
        "PrivateRoute",
        "children=", children
    );

    return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;