import { useGetTodoList } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { data: todoList } = useGetTodoList();

  return (
    <ul>
      {todoList?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
