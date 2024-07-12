import TodoForm from "../components/forms/TodoForm";
import Todo from "../components/Todo";
import useTodos from "../hooks/useTodos";

const HomePage = () => {
  const { todos, loading, addTodo, deleteTodo, updateTodo } = useTodos();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-sky-500 to-blue-600">
      <div className="bg-white p-5 md:rounded-md w-full h-full md:h-auto md:w-[60%] lg:w-[30%] flex flex-col gap-3">
        <h1 className="text-xl font-semibold text-center">Get Things Done!</h1>

        <TodoForm addTodo={addTodo} />

        <div className="max-h-[400px] overflow-y-auto pr-1 custom-scroll">
          {loading ? (
            <div className="text-center">Loading ... </div>
          ) : (
            <div className="space-y-2">
              {todos?.map((item) => (
                <Todo
                  key={item?.id}
                  todo={item}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
