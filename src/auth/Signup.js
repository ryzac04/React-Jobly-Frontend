import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../common/Alert";

/** Signup Form Component
 * 
 * Signup form for new users to register with Jobly. 
 * 
 * On successful submission: 
 *  - calls signup function prop
 *  - redirects to Home page ("/")
 * 
 * route: /signup
 *  
 * Other components used: Alert
 */

const Signup = ({ signup }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    console.debug("Signup",
        "signup=", typeof signup,
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
        let result = await signup(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    };

    return (
        <div className=" ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3 className="heading-text">Sign Up</h3>
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
                        <div className="form-group mb-3">
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
                        <div className="form-group mb-3">
                            <label className="form-label" for="firstName">First Name</label>
                            <input
                                className="form-control"
                                id="firstName"
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" for="lastName">Last Name</label>
                            <input
                                className="form-control"
                                id="lastName"
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="email">Email</label>
                            <input
                                className="form-control"
                                id="email"
                                type="email"
                                name="email"
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

export default Signup;