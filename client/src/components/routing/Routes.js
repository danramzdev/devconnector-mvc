import React from "react";
import { Switch, Route } from "react-router-dom";

import Alert from "../layout/Alert";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Profiles from "../profile/profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../post/Posts";
import Post from "../post/Post";
import CreateProfile from "../profile/forms/CreateProfile";
import EditProfile from "../profile/forms/EditProfile";
import AddExperience from "../profile/forms/AddExperience";
import AddEducation from "../profile/forms/AddEducation";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound}></Route>
      </Switch>
    </section>
  );
};

export default Routes;
