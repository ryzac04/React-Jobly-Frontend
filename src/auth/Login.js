import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../common/Alert";

/** Login Form Component
 * 
 * Login form for existing users to login to their account. 
 * 
 * On successful submission:
 *  - calls login function prop
 *  - redirects to Home page ("/")
 * 
 * route: /signup
 * 
 * Other components used: Alert
 */

const Login = ({ login }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug("Login",
        "login=", typeof login,
        "formData=", formData,
        "formErrors=", formErrors
    );

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    };

    return (
        <div className=" LoginForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3 className="heading-text">Log In</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label" for="username">Username</label>
                            <input
                                className="form-control"
                                id="username"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="password">Password</label>
                            <input
                                className="form-control"
                                id="password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mt-4">
                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null
                            }
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-primary btn-block mt-4">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;