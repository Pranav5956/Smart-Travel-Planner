import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { selectUser, selectUserLoadedState } from "../redux/features/Auth";

const LoadingPage = () => {
  return <div className="loading">Loading</div>;
};

const ProtectedRoute = (props) => {
  const user = useSelector(selectUser);
  const loaded = useSelector(selectUserLoadedState);

  if (!loaded) return <LoadingPage />;
  if (user) return <Route {...props} />;

  return <Redirect to="/home"></Redirect>;
};

export default ProtectedRoute;
