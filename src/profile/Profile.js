import { useContext, useState } from "react";

import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";

/** Profile Component
 * 
 * Form to edit profile details: first name, last name, email. 
 * 
 * Displays profile form and handleschanges to local form state. 
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site. 
 * 
 * route: /profile
 * 
 * Other components used: Alert
 */

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    console.debug("Profile",
        "currentUser=", currentUser,
        "formData=", formData,
        "formErrors=", formErrors,
        "saveConfirmed=", saveConfirmed
    );

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
        setFormErrors([]);
    };

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.updateUserInfo(username, profileData);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }

        setFormData(formData => ({ ...formData }));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(currentUser => ({
            ...currentUser,
            data: updatedUser
        }));
    }

    return (
        <div className=" ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3 className="heading-text">Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label" for="username">Username</label>
                            <input
                                disabled
                                className="form-control"
                                id="username"
                                type="text"
                                name="username"
                                placeholder={formData.username}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" for="firstName">First Name</label>
                            <input
                                className="form-control"
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label" for="lastName">Last Name</label>
                            <input
                                className="form-control"
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" for="email">Email</label>
                            <input
                                className="form-control"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-4">
                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}
                        
                            {saveConfirmed
                                ? <Alert type="success" messages={["Updated successfully."]} />
                                : null}
                        </div>
                        
                        <div className="d-grid">
                            <button className="btn btn-primary btn-block mt-4">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;