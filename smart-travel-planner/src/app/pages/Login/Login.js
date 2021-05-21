import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Alert,
  Button,
  Card,
  CardTitle,
  FormGroup,
  InputGroup,
  Spinner,
} from "reactstrap";
import {
  clearAuthMessage,
  loginUser,
  selectAuthMessage,
} from "../../redux/features/Auth";
import * as Yup from "yup";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import CustomInput from "../../components/CustomInput";

import "./Login.css";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(20, "Username is too long!")
    .required("Username is required!"),
  password: Yup.string()
    .min(6, "Password should have a minimum of 6 characters!")
    .max(14, "Password is too long!")
    .required("Password is required!"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector(selectAuthMessage);

  const [loginStatus, setLoginStatus] = useState({
    type: message.messageType,
    message: message.message,
    isOpen: !!message.message.length,
    loading: false,
  });

  useEffect(() => {
    setLoginStatus({
      type: message.messageType,
      message: message.message,
      isOpen: !!message.message.length,
      loading: false,
    });

    if (message.messageType === "success") {
      setTimeout(() => {
        dispatch(clearAuthMessage());
        history.push("/home", { from: "Login" });
      }, 1000);
    }
  }, [message, dispatch, history]);

  const onSubmit = async ({ username, password }, { resetForm }) => {
    setLoginStatus((loginStatus) => ({ ...loginStatus, loading: true }));
    dispatch(loginUser({ username, password }));
    resetForm();
  };

  return (
    <div className="login">
      <div className="login__card-container">
        <Card className="login__card">
          <CardTitle
            tag="h2"
            className="text-center"
            style={{
              fontSize: "2.3rem",
              fontWeight: 700,
              letterSpacing: "0.1ch",
            }}>
            LOGIN
          </CardTitle>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}>
            <Form className="login__form">
              <FormGroup>
                <Field
                  placeholder="Enter username"
                  id="username"
                  name="username"
                  component={CustomInput}
                />
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <Field
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    component={CustomInput}
                    appendFieldIcon={
                      showPassword ? (
                        <BsEyeFill onClick={toggleShowPassword} color="blue" />
                      ) : (
                        <BsEyeSlashFill onClick={toggleShowPassword} />
                      )
                    }
                  />
                </InputGroup>
              </FormGroup>
              {loginStatus.loading && (
                <div className="w-100 d-flex align-items-center justify-content-center mt-2">
                  <Spinner color="primary" size="sm" className="mr-2" />
                  Loggin in user ...
                </div>
              )}
              {loginStatus && (
                <Alert
                  color={loginStatus.type}
                  isOpen={loginStatus.isOpen}
                  toggle={() =>
                    setLoginStatus((loginStatus) => ({
                      ...loginStatus,
                      isOpen: false,
                    }))
                  }>
                  {loginStatus.message}
                </Alert>
              )}
              <FormGroup className="d-flex align-items-center justify-content-center mt-4">
                <Button
                  color="primary"
                  className="px-4 py-2"
                  type="submit"
                  disabled={loginStatus.loading}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </Formik>
          <p className="text-center mt-2">©copyright Travel Planner, 2021</p>
        </Card>
      </div>
      <div className="login__icons p-3">
        <a href="" aria-hidden="true">
          <FaInstagram />
        </a>
        <a
          href="https://github.com/Pranav5956/Smart-Travel-Planner"
          aria-hidden="true">
          <FaGithub />
        </a>
        <a href="" aria-hidden="true">
          <FaFacebook />
        </a>
        <a href="" aria-hidden="true">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Login;
