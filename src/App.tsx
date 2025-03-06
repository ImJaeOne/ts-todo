import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList />
    </>
  );
};

export default App;
