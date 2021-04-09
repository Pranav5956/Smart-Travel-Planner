import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { selectUser } from "../redux/features/Auth";

const ProtectedRoute = (props) => {
  const user = useSelector(selectUser);

  return user ? <Route {...props} /> : <Redirect to="/home"></Redirect>;
};

export default ProtectedRoute;
