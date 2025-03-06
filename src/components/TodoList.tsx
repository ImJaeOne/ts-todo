import { TodoListProps } from "../types/todoTypes";
import TodoItem from "./TodoItem";

const TodoList = ({ todoList }: TodoListProps) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
