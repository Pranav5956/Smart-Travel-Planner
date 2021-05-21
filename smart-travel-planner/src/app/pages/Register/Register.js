import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardTitle,
  FormGroup,
  InputGroup,
  Spinner,
} from "reactstrap";
import CustomInput from "../../components/CustomInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  clearAuthMessage,
  registerUser,
  selectAuthMessage,
} from "../../redux/features/Auth";

import "./Register.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short!")
    .max(20, "Username is too long!")
    .required("Username is required!"),
  password: Yup.string()
    .min(6, "Password should have a minimum of 6 characters!")
    .max(14, "Password is too long!")
    .required("Password is required!"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match!",
    function (value) {
      return this.parent.password === value;
    }
  ),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);

  const history = useHistory();
  const dispatch = useDispatch();
  const message = useSelector(selectAuthMessage);

  const [registerStatus, setRegisterStatus] = useState({
    type: message.messageType,
    message: message.message,
    isOpen: !!message.message.length,
    loading: false,
  });

  useEffect(() => {
    setRegisterStatus({
      type: message.messageType,
      message: message.message,
      isOpen: !!message.message.length,
      loading: false,
    });

    if (message.messageType === "success") {
      setTimeout(() => {
        dispatch(clearAuthMessage());
        history.push("/home", { from: "Register" });
      }, 1000);
    }
  }, [message, dispatch, history]);

  const onSubmit = async ({ username, email, password }, { resetForm }) => {
    setRegisterStatus((registerStatus) => ({
      ...registerStatus,
      loading: true,
    }));
    dispatch(registerUser({ username, email, password }));
    resetForm();
  };

  return (
    <div className="register">
      <div className="register__card-container">
        <Card className="register__card">
          <CardTitle
            tag="h2"
            className="text-center"
            style={{
              fontSize: "2.3rem",
              fontWeight: 700,
              letterSpacing: "0.1ch",
            }}>
            REGISTER
          </CardTitle>

          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={onSubmit}>
            <Form className="register__form">
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
              <FormGroup>
                <InputGroup>
                  <Field
                    placeholder="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    appendFieldIcon={
                      showConfirmPassword ? (
                        <BsEyeFill
                          onClick={toggleShowConfirmPassword}
                          color="blue"
                        />
                      ) : (
                        <BsEyeSlashFill onClick={toggleShowConfirmPassword} />
                      )
                    }
                    component={CustomInput}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Field
                  placeholder="Enter email address"
                  id="email"
                  name="email"
                  type="email"
                  component={CustomInput}
                />
              </FormGroup>
              {registerStatus.loading && (
                <div className="w-100 d-flex align-items-center justify-content-center mt-2">
                  <Spinner color="primary" size="sm" className="mr-2" />
                  Loggin in user ...
                </div>
              )}
              {registerStatus && (
                <Alert
                  color={registerStatus.type}
                  isOpen={registerStatus.isOpen}
                  toggle={() =>
                    setRegisterStatus((registerStatus) => ({
                      ...registerStatus,
                      isOpen: false,
                    }))
                  }>
                  {registerStatus.message}
                </Alert>
              )}
              <FormGroup className="d-flex align-items-center justify-content-center mt-4">
                <Button color="primary" className="px-5 py-2" type="submit">
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Formik>
          <p className="text-center mt-2">©copyright Travel Planner, 2021</p>
        </Card>
      </div>
      <div className="register__icons p-3">
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

export default Register;
