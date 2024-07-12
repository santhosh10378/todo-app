import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import {
  authenticationStart,
  authenticationSuccess,
  authenticationFailed,
  getUserProfile,
  resetUser,
} from "../context/authContext";
import axiosClient from "../lib/axiosClient";

const useAuth = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const registerUser = async (userData) => {
    dispatch(authenticationStart());
    try {
      await axiosClient.post("/auth/sign-up", userData);
      dispatch(authenticationSuccess());
      toast.success("Registered");
      await updateUser();
    } catch (error) {
      dispatch(authenticationFailed());
      toast.error("Registration Failed");
    }
  };

  const loginUser = async (userData) => {
    dispatch(authenticationStart());
    try {
      await axiosClient.post("/auth/sign-in", userData);
      dispatch(authenticationSuccess());
      toast.success("Logged In");
      await updateUser();
    } catch (error) {
      dispatch(authenticationFailed());
      toast.error("Login Failed");
    }
  };

  const logoutUser = async () => {
    dispatch(authenticationStart());
    try {
      await axiosClient.post("/auth/sign-out");
      dispatch(resetUser());
      toast.success("Logged Out");
    } catch (error) {
      dispatch(authenticationFailed());
      toast.error("Logout Failed");
    }
  };

  const updateUser = async () => {
    dispatch(authenticationStart());
    try {
      const response = await axiosClient.get("/auth/profile");
      dispatch(getUserProfile(response.data));
    } catch (error) {
      dispatch(resetUser());
    }
  };

  return { ...user, registerUser, loginUser, logoutUser, updateUser };
};

export default useAuth;
