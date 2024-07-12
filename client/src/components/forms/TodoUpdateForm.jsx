import { useState, useEffect, useRef } from "react";
import { SiTicktick } from "react-icons/si";

const TodoUpdateForm = ({ todo, updateTodo, toggleTodo }) => {
  const [taskUpdateInput, setTaskUpdateInput] = useState(todo.name);

  const inputRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: taskUpdateInput,
    };

    await updateTodo(todo.id, formData);
    toggleTodo();

    setTaskUpdateInput("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setTaskUpdateInput(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-between w-full gap-2"
    >
      <input
        type="text"
        placeholder={todo.name}
        name="taskUpdate"
        value={taskUpdateInput}
        onChange={handleInputChange}
        className="w-full outline-none rounded-md text-sm"
        ref={inputRef}
        aria-label="Update Todo Name"
      />

      <button
        type="submit"
        className="w-max bg-emerald-500 text-white font-medium rounded-md p-2 flex items-center justify-center"
      >
        <SiTicktick />
      </button>
    </form>
  );
};

export default TodoUpdateForm;
