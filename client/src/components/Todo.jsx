import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import TodoUpdateForm from "./forms/TodoUpdateForm";

const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [activeTodoInput, setActiveTodoInput] = useState(false);

  const toggleTodo = () => {
    setActiveTodoInput((prev) => !prev);
  };

  return (
    <div
      className={`border-2 p-2 rounded-md text-sm font-medium flex items-center justify-between gap-2 ${
        activeTodoInput ? "border-blue-500" : ""
      }`}
    >
      {activeTodoInput ? (
        <TodoUpdateForm
          todo={todo}
          updateTodo={updateTodo}
          toggleTodo={toggleTodo}
        />
      ) : (
        <p>{todo.name}</p>
      )}

      <div className="flex items-center justify-between gap-2">
        {!activeTodoInput && (
          <button
            onClick={toggleTodo}
            className="w-full bg-emerald-500 text-white font-medium rounded-md p-2 flex items-center justify-center"
            aria-label="Edit Todo"
          >
            <FiEdit />
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo?.id)}
          className="w-full bg-rose-500 text-white font-medium rounded-md p-2 flex items-center justify-center"
          aria-label="Delete Todo"
        >
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default Todo;
