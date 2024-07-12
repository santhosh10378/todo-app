import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../lib/axiosClient";

import {
  fetchingTodoStart,
  fetchingTodoSuccess,
  fetchingTodoFailed,
} from "../context/todoContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useTodos = () => {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const getTodos = async () => {
    dispatch(fetchingTodoStart());
    try {
      const response = await axiosClient.get("/todos");
      dispatch(fetchingTodoSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchingTodoFailed());
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (data) => {
    dispatch(fetchingTodoStart());
    try {
      await axiosClient.post("/todos", data);
      await getTodos();
      toast.success("Todo Added");
    } catch (error) {
      dispatch(fetchingTodoFailed());
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  const deleteTodo = async (todoId) => {
    dispatch(fetchingTodoStart());
    try {
      await axiosClient.delete(`/todos/${todoId}`);
      await getTodos();
      toast.success("Todo Deleted");
    } catch (error) {
      dispatch(fetchingTodoFailed());
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  const updateTodo = async (todoId, data) => {
    dispatch(fetchingTodoStart());
    try {
      await axiosClient.put(`/todos/${todoId}`, data);
      await getTodos();
      toast.success("Todo Updated");
    } catch (error) {
      dispatch(fetchingTodoFailed());
      console.error("Error updating todo:", error);
      toast.error("Failed to update todo");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};

export default useTodos;
