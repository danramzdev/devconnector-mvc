import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Home from "./components/pages/Home";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Profiles from "./components/profile/profiles/Profiles";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/forms/CreateProfile";
import EditProfile from "./components/profile/forms/EditProfile";
import AddExperience from "./components/profile/forms/AddExperience";
import AddEducation from "./components/profile/forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";

// Actions
import { loadUser } from "./actions/auth";

// Utils
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
