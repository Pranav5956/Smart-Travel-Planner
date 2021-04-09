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
  });

  useEffect(() => {
    setLoginStatus({
      type: message.messageType,
      message: message.message,
      isOpen: !!message.message.length,
    });

    if (message.messageType === "success") {
      setTimeout(() => {
        dispatch(clearAuthMessage());
        history.push("/home", { from: "Login" });
      }, 1000);
    }
  }, [message, dispatch, history]);

  const onSubmit = async ({ username, password }, { resetForm }) => {
    dispatch(loginUser({ username, password }));
    resetForm();
  };

  return (
    <div className="login">
      <Card className="login__card">
        <CardTitle tag="h2" className="text-center">
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
              <Button color="primary" className="px-5 py-2" type="submit">
                Login
              </Button>
            </FormGroup>
          </Form>
        </Formik>
        <p className="text-muted text-center mt-2">©Copyright WhatsappBleh</p>
      </Card>
    </div>
  );
};

export default Login;
