import { useDeleteTodo, useToggleTodo } from "../hooks/useTodo";
import { Todo } from "../types/todoTypes";

type TodoItemProps = Todo;

const TodoItem = ({ id, text, completed }: TodoItemProps) => {
  const { mutate: deleteMutate } = useDeleteTodo();
  const { mutate: toggleMutate } = useToggleTodo();

  const handleDelete = (id: Todo["id"]) => {
    deleteMutate(id);
  };

  const handleToggle = ({ id, completed }: Omit<Todo, "text">) => {
    toggleMutate({ id, completed });
  };

  return (
    <li>
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </span>
      <button onClick={() => handleToggle({ id, completed })}>
        {completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
