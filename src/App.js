import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import JoblyApi from "./api/api";

import NavBar from "./routes/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./common/Loading";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
  
import "./App.css";

export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly Application
 * 
 * Other components used: NavBar, AppRoutes, Loading
 */

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token
  )

  /** useEffect hook that loads user info from API.
   * 
   * Dependency: token 
   * 
   * Will run once a user is logged in and has a token.
   * 
   * Re-runs when a user logs out. 
   */
  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = await JoblyApi.decodeToken(token);

          // put the token on the Api class so it can use it to call the API
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setInfoLoaded(true);
        } catch (errors) {
          console.error("App loadUserInfo: problem loading", errors);
          setCurrentUser(null);
          setInfoLoaded(true);
        }
      } else {
        setInfoLoaded(true);
      }
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or if an error happens), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide signup.
   * 
   * Automatically logs in user upon signup (set token).
  */ 
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login. */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide logout. */
  function logout() {
    setApplicationIds(new Set([]));
    setCurrentUser(null);
    setToken(null);
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
          <NavBar logout={logout} />
          <main className="Container pt-5">
            <AppRoutes signup={signup} login={login} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
