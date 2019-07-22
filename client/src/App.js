import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Routes from "./components/routing/Routes";

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes}></Route>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
