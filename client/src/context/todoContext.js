import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchingTodoStart: (state) => {
      state.loading = true;
      state.error = false;
      state.todos = [];
    },
    fetchingTodoSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.todos = action.payload;
    },
    fetchingTodoFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.todos = [];
    },
  },
});

export const { fetchingTodoStart, fetchingTodoSuccess, fetchingTodoFailed } =
  todoSlice.actions;
export default todoSlice.reducer;
