import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useGetTodoList } from "./hooks/useTodo";

const App = () => {
  const { data } = useGetTodoList();
  return (
    <>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todoList={data ?? []} />
    </>
  );
};

export default App;
