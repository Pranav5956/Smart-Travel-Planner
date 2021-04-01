import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import PlanTrip from "./pages/PlanTrip/PlanTrip";

import NavBar from "./Components/Navbar";

import clsx from "clsx";
import { selectTheme } from "./redux/features/Theme";
import { useSelector } from "react-redux";

import "./App.scss";

function App() {
  const theme = useSelector(selectTheme).theme;

  return (
    <div className={clsx({ app: true, "dark-theme": theme === "dark" })}>
      <NavBar theme={theme} />
      <Router>
        <Switch>
          <Route path="/plantrip" component={PlanTrip} />
          <Route path={["/", "/home"]} component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
