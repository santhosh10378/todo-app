import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../context/authContext";
import todoReducer from "../context/todoContext";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export default store;
