import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../home/Home";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../profile/Profile";
import PrivateRoute from "./PrivateRoutes";

/** AppRoutes Component
 * 
 * Some parts of the site are only visible when user is logged in. Those routes are 
 * wrapped by <PrivateRoute>, which is an authorization component. 
 * 
 * Visiting a non-existent route redirects to the homepage. 
 */

const AppRoutes = ({ signup, login }) => {

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login login={login} />} />
            <Route exact path="/signup" element={<Signup signup={signup} />} />
            <Route exact path="/companies" element={
                <PrivateRoute>
                    <CompanyList />
                </PrivateRoute>
            }/>
            <Route exact path="/companies/:handle" element={
                <PrivateRoute>
                    <CompanyDetail />
                </PrivateRoute>
            } />
            <Route exact path="/jobs" element={
                <PrivateRoute>
                    <JobList />
                </PrivateRoute>
            } />
            <Route exact path="/profile" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;