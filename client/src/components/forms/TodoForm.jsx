import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [taskInput, setTaskInput] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: taskInput,
    };

    await addTodo(formData);
    setTaskInput("");
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What is the task today?"
        name="task"
        value={taskInput}
        onChange={handleInputChange}
        className="w-full outline-none p-2 border-2 rounded-md focus:border-black text-sm"
      />
      <button
        type="submit"
        className="w-max bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium text-sm rounded-md p-2 px-3"
      >
        Submit
      </button>
    </form>
  );
};

export default TodoForm;
