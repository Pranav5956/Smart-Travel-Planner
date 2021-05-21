import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: "",
    messageType: "",
    token: localStorage.getItem("token"),
    loaded: false,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loaded = true;
    },
    unsetUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.loaded = true;
    },
    setAuthMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
    },
    clearAuthMessage: (state) => {
      state.message = "";
      state.messageType = "";
    },
  },
});

export const { setUser, unsetUser, setAuthMessage, clearAuthMessage } =
  authSlice.actions;

export const tokenHeaderConfig = (getState) => {
  const token = getState().auth.token;

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["x-auth-token"] = token;

  return headers;
};

export const loadUserOnStart = () => (dispatch, getState) => {
  const headers = tokenHeaderConfig(getState);
  axios
    .get("/users", { headers })
    .then((res) => {
      dispatch(setUser({ user: res.data, token: getState().auth.token }));
      dispatch(
        setAuthMessage({
          message: "User load successful!",
          messageType: "success",
        })
      );
    })
    .catch((err) => {
      dispatch(unsetUser());
      dispatch(clearAuthMessage());
    });
};

export const registerUser =
  ({ username, email, password }) =>
  (dispatch) => {
    const config = { headers: { "Content-Type": "Application/json" } };
    const body = { username, email, password };

    axios
      .post("/users/register", body, config)
      .then((res) => {
        dispatch(setUser(res.data));
        dispatch(
          setAuthMessage({
            message: "Registration successful!",
            messageType: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(unsetUser());
        dispatch(
          setAuthMessage({
            message: err.response.data.msg,
            messageType: "danger",
          })
        );
      });
  };

export const loginUser =
  ({ username, password }) =>
  (dispatch) => {
    const config = { headers: { "Content-Type": "Application/json" } };
    const body = { username, password };

    axios
      .post("/users/login", body, config)
      .then((res) => {
        dispatch(setUser(res.data));
        dispatch(
          setAuthMessage({
            message: "Login successful!",
            messageType: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(unsetUser());
        dispatch(
          setAuthMessage({
            message: err.response.data.msg,
            messageType: "danger",
          })
        );
      });
  };

export const selectUser = (state) => state.auth.user;
export const selectUserLoadedState = (state) => state.auth.loaded;
export const selectAuthMessage = (state) => ({
  message: state.auth.message,
  messageType: state.auth.messageType,
});

export default authSlice.reducer;
