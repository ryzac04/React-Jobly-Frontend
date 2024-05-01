import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../auth/UserContext";

/** Home Component
 * 
 * Shows generic greeting message with Login and Signup buttons.
 * 
 * After login or signup, shows greeting with username. 
 * 
 */

const Home = () => {
    const { currentUser } = useContext(UserContext);
    console.debug("Home", "currentUser=", currentUser);

    return (
        <div class="Home">
            <div className="container text-center">
                <h1 className="mb-4 fw-bold">Jobly</h1>
                <p class="lead">All the jobs in one, convenient place.</p>
                {currentUser
                    ? <h2>Welcome Back, {currentUser.username || currentUser.first_name}!</h2>
                    : (
                        <p>
                            <Link className="btn btn-primary fw-bold me-3"
                                to={"/login"}>
                                Log in
                            </Link>
                            <Link className="btn btn-primary fw-bold"
                                to={"/signup"}>
                                Sign up
                            </Link>
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Home;