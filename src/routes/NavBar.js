import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import UserContext from "../auth/UserContext";

import "./NavBar.css";

/** NavBar Component
 * 
 *  Navigation bar for site - shows up on every page. 
 * 
 *  User logged in:
 *  - shows links to Companies, Jobs, Profile and shows Log Out button
 *  User logged out:
 *  - shows links to Login and Signup forms
 */

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);
    console.debug("Navigation", "currentUser=", currentUser);

    const loggedInNav = () => {
        return (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link logout-link" to="/" onClick={logout}>
                        Log out {currentUser.username || currentUser.first_name}
                    </NavLink>
                </li>
            </ul>
        );
    };

    const loggedOutNav = () => {
        return (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/login">
                        Login
                    </NavLink>
                </li>
                <li className="nav-item me-4">
                    <NavLink className="nav-link" to="/signup">
                        Signup
                    </NavLink>
                </li>
            </ul>
        );
    };

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Jobly</Link>
                {currentUser ? loggedInNav() : loggedOutNav()}
            </div>
        </nav>
    );
};

export default NavBar;