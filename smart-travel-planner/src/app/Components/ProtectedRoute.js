import React from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import { selectUser, selectUserLoadedState } from "../redux/features/Auth";

const LoadingPage = () => {
  return (
    <div className="loading">
      <Loader type="ThreeDots" />
      <span>Loading Page</span>
    </div>
  );
};

const ProtectedRoute = (props) => {
  const user = useSelector(selectUser);
  const loaded = useSelector(selectUserLoadedState);

  if (!loaded) return <LoadingPage />;
  if (user) return <Route {...props} />;

  return <Redirect to="/login"></Redirect>;
};

export default ProtectedRoute;
